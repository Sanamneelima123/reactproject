import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"
import { Link } from "react-router-dom";

const Usestate22 = () =>{

 const URL='https://jsonplaceholder.typicode.com/users';

 const [students, setStudents] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [isError, setIsError] = useState({status:false, msg:''});
 const [editId, setEditId] = useState(null);
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [website, setWebsite] = useState('');
 const [showForm,setShowForm] = useState(false);
 const [erroForm, setErrorForm] = useState(false)

 const fetchApi = async (apiUrl) =>{
    setIsLoading(true);
    setIsError({status:false, msg:''});
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setStudents(data);
        setIsLoading(false);
        setIsError({status:false, msg:''});
        if(response.status === 404){
            throw new Error('404 API Error Please check');
        }
    } catch (error) {
        console.log('Error Message', error);
        setIsLoading(false);
        setIsError({status:true, msg: error.message || 'something went wrong'});
    }
 }

 const handleDelete = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type' : 'Application/json'
            },
        });
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.message, "Faild Delete Student")
        }
        setStudents(students.filter(eachStudents=> eachStudents.id !== id));
    } catch (error) {
        console.log('Error Delete Student', error);
    }
 }

 const handleEdit = async (id, name, email, website) =>{
    setEditId(id);
    setName(name);
    setEmail(email);
    setWebsite(website);
    setShowForm(true);

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify({id, name, email, website})
    })
    .then(response=>{
        if(!response.ok){
            throw new Error('Faild Edit Student');
        }
    })
    .catch(error=>{
        console.log('Error Message', error)
    })
 }

 const updateData = async () =>{

    if (!name || !email || !website) { // Fixed condition
        setErrorForm('ALL Form Fields Required'); // Set error message using setErrorForm
        return;
    }

    const allStudents={
        name:name,
        email:email,
        website:website
    }

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
        method:'PUT',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify({allStudents}),
    })
     if(!response.ok){
        const data = await response.json();
        throw new Error(data.message || 'Faild Update Student')
     }

     const newStudent = students.map((eachStudents)=>{
        if(eachStudents.id === editId){
            return{...eachStudents, ...allStudents}
        }else{
            return eachStudents
        }
     })
     setStudents(newStudent);
     setEditId(null);
     setName('');
     setEmail('');
     setWebsite('');
     setShowForm(false);
 }

useEffect(()=>{
   fetchApi(URL);
},[])

if(isLoading){
    return <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>
}

if(isError?.status){
    return <h3 className="text-center mt-5" style={{color:'red'}}>{isError?.msg}</h3>
}

    return(
        <div>
            <Header/>
              <div className="container">

                 {showForm && (
                 <div className="shadow p-3 mb-3 mt-3">
                     <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                     <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                     <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                     {erroForm && <p style={{ color: 'red' }}>{erroForm}</p>}
                     <input type="submit" className="btn btn-primary mb-2" onClick={()=> updateData(editId)} />
                 </div>
                 )}

                 <div className="row">
                    {students.map((eachStudents)=>{
                        const {id, name, email, website} = eachStudents;
                        return(
                            <div key={id} className="col-4 col-xs-12">
                                <div className="shadow p-3 mb-3">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                        <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                        <button className="btn btn-info rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                        <Link className="btn btn-primary rounded-0" to={`/Usestate22/${eachStudents.id}`}>Details</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                 </div>

              </div>
            <Footer/>
        </div>
    )
}

export default Usestate22;
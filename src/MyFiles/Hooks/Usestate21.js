import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"
import { Link } from "react-router-dom";

const Usestate21 = () =>{

 const URL='https://jsonplaceholder.typicode.com/users';

 const [employee, setEmployee] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [isError, setIsError] = useState({status:false, msg:''});
 const [editId, setEditId] = useState(null);
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [website, setWebsite] = useState('');
 const [showForm, setShowForm] = useState(false);
 const [erroForm, setErrorForm] = useState(false)

 const fetchApi = async (apiUrl) =>{
    setIsLoading(true);
    setIsError({status:false, meg:''});
    try {
        const responsive = await fetch(apiUrl);
        const empData = await responsive.json();
        setEmployee(empData);
        setIsLoading(false);
        setIsError({status:false, meg:''});
        if(responsive.status === 404){
            throw new Error('API 404 Error Please check API');
        }
    } catch (error) {
        console.log('Error Message', error);
        setIsLoading(false);
        setIsError({status:true, msg: error.message || 'something went wrong'});
    }
 }

 const handleDelete = async (id) =>{
    try { 
        const responsive = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type' : 'Application/json'
            },
        });
        if(!responsive.ok){
            const data = await responsive.json();
            throw new Error(data.message || 'Failed Employee Delete')
        }
        setEmployee(employee.filter(eachEmployee=> eachEmployee.id !== id));
    } catch (error) {
        console.log('Error Message', error);
    }
 }

 const handleEdit = (id, name, email, website) =>{
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
        body: JSON.stringify({id, name, email, website}),
     })
     .then(responsive=>{
        if(!responsive.ok){
            throw new Error('Failed Employee Edit');
        }
     })
     .catch(error=>{
        console.log('Error Message', error)
     })
 }

 const updateData = async () =>{

    if(!name || !email || !website){
        setErrorForm('ALL Form Fields Required');
        return;
    }

    const empDetails={
        name:name,
        email:email,
        website:website
    }

    const responsive = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
        method:'PUT',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify({empDetails}),
    })
    if(!responsive.ok){
        const data = await responsive.json();
        throw new Error(data.message || 'Failed Employee Updating')
    }
    const newEmp = employee.map((eachEmployee)=>{
        if(eachEmployee.id === editId){
            return{...eachEmployee, ...empDetails}
        }else{
            return eachEmployee;
        }
    })
    setEmployee(newEmp);
    setEditId(null);
    setName('');
    setEmail('');
    setWebsite('');
    setShowForm(false);
 }

 useEffect(()=>{
    fetchApi(URL)
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
                      {erroForm && <p className="" style={{color:'red'}}>{erroForm}</p>}
                      <input type="submit" className="btn btn-primary mb-2" onClick={()=> updateData(editId)} />
                   </div>
                   )}

                   <div className="row mt-4 mb-4">
                       {employee.map((eachEmployee)=>{
                        const {id, name, email, website} = eachEmployee;
                         return(
                            <div key={id} className="col-4 col-xs-12">
                                <div className="shadow p-3 mb-3">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                        <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                        <button className="btn btn-info rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                        <Link className="btn btn-primary rounded-0" to={`/Usestate21/${eachEmployee.id}`}>Details</Link>
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

export default Usestate21;
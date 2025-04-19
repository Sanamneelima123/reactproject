import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from '../../images/Loading-img.gif'
import { Link } from "react-router-dom";

const Usestate55 = () =>{

 const URL='https://jsonplaceholder.typicode.com/users';

 const [myData,setMyData] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [editId, setEditId] = useState(null);
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [website, setWebsite] = useState('');
 const [showForm, setShowForm] = useState(false);
 const [isError, setIsError] = useState({status:false, msg:''})

 const fetchApi = async (apiUrl)=>{
    setIsLoading(true);
    setIsError({status:false, msg:''});
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMyData(data);
        setIsLoading(false);
        setIsError({status:false, msg:''});
        if(response.status === 404){
            throw new Error('This API 404 Error please check API')
        }
    } catch (error) {
        console.error('Error:', error); // Log any error that occurs
        setIsLoading(false);
        setIsError({ status: true, msg: error.message || 'Something went wrong' });
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
            throw new Error(data.message || 'Faild User Delete')
        }
        setMyData(myData.filter(eachData=> eachData.id !== id));
    } catch (error) {
        console.log('error message', error.message);
    }
 }

 const handleEdit = async (id, name , email, website) =>{
    setEditId(id);
    setName(name);
    setEmail(email);
    setWebsite(website);
    setShowForm(true)

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify({id, name, email, website}),
    })
    .then(response=>{
        if(!response.ok){
            throw new Error('Faild Edit User');
        }
    })
    .catch(error=>{
        console.log('error message', error)
    })
 }

 const updateData = async () =>{
    try {
        const allUserDetails ={
            name:name,
            email:email,
            website:website
        };
    
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
             method:'PUT',
             headers:{
                'Content-Type' : 'Application/json'
             },
             body: JSON.stringify({allUserDetails})
        });
    
        if(!response.ok){
            const resData = await response.json();
            throw new Error(resData.message || 'Faild User Update');
        }
        const Emaployess = myData.map((eachData)=>{
            if(eachData.id === editId){
                return {...eachData, ...allUserDetails}
            }else{
                return eachData;
            }
        })
        setMyData(Emaployess);
        setEditId('');
        setName('');
        setEmail('');
        setWebsite('');
        setShowForm(false);
    } catch (error) {
        console.log('error message', error)
    }
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
                    <div className="shadow p-3 mt-4 mb-4">
                        <h4 className="pb-2 pt-2" style={{color:'blue'}}>User Update values</h4>
                        <input type="text" className="form-control mb-3" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="email" className="form-control mb-3" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-3" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                        <input type="submit" className="btn btn-primary mb-3" onClick={()=> updateData(editId)} />
                    </div>
                    )}

                    <div className="row mt-5 mb-5">
                        {myData.map((eachData)=>{
                            const {id, name, email, website} = eachData;
                            return(
                                <div key={id} className="col-4 col-xs-12">
                                    <div className="shadow p-3 mb-3">
                                        <p>{name}</p>
                                        <p>{email}</p>
                                        <p>{website}</p>
                                        <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                            <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                            <button className="btn btn-info rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                            <Link className="btn btn-primary rounded-0" to={`/Usestate44/${eachData.id}`}>Details</Link>
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

export default Usestate55;
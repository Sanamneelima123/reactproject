import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"
import { Link, useNavigate } from "react-router-dom";

const Usestate112 = () =>{

 const [accountManager, setAccountManager] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [isError, setIsError] = useState({status:false, msg:'' });
 const [editId, setEditId] = useState(null);
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [website, setWebsite] = useState('');
 const [formShow, setFormShow] = useState(false);
 const [errorMessage, setErrorMessage] = useState(false);

 const navigate = useNavigate();

 const fetchApi = async (apiUrl) =>{
    setIsLoading(true);
    setIsError({status:false, msg:''});
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setAccountManager(data);
        setIsLoading(false);
        setIsError({status:false, msg:''});
        if(response.status === 404){
            throw new Error('Please check the API 404')
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
            throw new Error(data.message || 'Failed Account Manager Delete')
        }
        setAccountManager(accountManager.filter(eachAccount=> eachAccount.id !== id))
    } catch (error) {
        console.log('Error Message Account Manager Delete', error)
    }
 }

 const handleEdit = async (id, name, email, website) =>{
    setEditId(id);
    setName(name);
    setEmail(email);
    setWebsite(website);
    setFormShow(true)

    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify({id, name, email, website})
    })
    .then(response=>{
        if(!response.ok){
            throw new Error('Failed Account Manager Edit')
        }
    })
    .catch(error=>{
        console.log('Error Message', error)
    })
 }

 const updateData = async () =>{

   if(!name || !email || !website){
    setErrorMessage('All Input Fields or Required');
    return;
   }

   setErrorMessage(false);

    const allAccount ={
        name:name,
        email:email,
        website:website
    }
   
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
        method:'PUT',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify(allAccount)
    })
    if(!response.ok){
        const data = await response.json();
        throw new Error(data.message || 'Failed Account Manager Update')
    }
    const Todos = accountManager.map((eachAccount)=>{
        if(eachAccount.id === editId){
            return{...eachAccount, ...allAccount}
        }else{
            return eachAccount
        }
    })
    setAccountManager(Todos);
    setEditId(null);
    setName('');
    setEmail('');
    setWebsite('');
    setFormShow(false)

 }

 useEffect(()=>{
   fetchApi('https://jsonplaceholder.typicode.com/users')
 },[])

 if(isLoading){
    return <h3 className="mt-5 text-center"><img src={Loader} alt={Loader} /></h3>
 }

 if(isError?.status){
    return <h3 className="text-center mt-5" style={{color:'red'}}><h3>{isError?.msg}</h3></h3>
 }

    return(
        <div>
            <Header/>
              <div className="container">
                 
                 {formShow && (
                 <div className="shadow p-3 mt-4 mb-3">
                    <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                     {errorMessage && <p style={{color:'red'}}>{errorMessage}</p>}
                    <input type="submit" className="btn btn-primary mb-2" name="name" onClick={()=> updateData(editId)} />
                 </div>
                 )}

                 <div className="row mt-4">
                    {accountManager.map((eachAccount)=>{
                        const {id, name, email, website} = eachAccount;
                        return(
                            <div key={id} className="col-4 col-xs-12">
                                <div className="shadow p-3 mb-2">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                        <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                        <button className="btn btn-info rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                        <Link className="btn btn-success rounded-0" to={`/Usestate112/${eachAccount.id}`}>Details</Link>
                                        <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usepost112`)}>Post</button>
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

export default Usestate112;
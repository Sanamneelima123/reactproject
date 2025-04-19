import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"
import { Link } from "react-router-dom";

const Usestate101 = () =>{

 const [vendor, setVendor] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [isError, setIsError] = useState({status:false, msg:''});
 const [editId, setEditId] = useState(null);
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [website, setWebsite] = useState('');
 const [showError, setShowError] = useState(false);
 const [errorForm, setErrorForm] = useState(false)

 const fetchApis = async (apiUrl) =>{
    setIsError({status:false, msg:''});
    setIsLoading(true);
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setVendor(data);
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
            throw new Error(data.message || 'Failed Vendor Delete')
        }
        setVendor(vendor.filter(eachVendor=> eachVendor.id !== id))
    } catch (error) {
        console.log('Error Message', error);
    }
 }

 const handleEdit = async (id, name, email, website) =>{
    setEditId(id);
    setName(name);
    setEmail(email);
    setWebsite(website);
    setShowError(true);
    
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify({id, name, email, website})
    })
    .then(response=>{
        if(!response.ok){
            throw new Error('Failed edit Vendor')
        }
    })
    .catch(error=>{
        console.log('Error Message', error)
    })

 }

 const updataData = async () =>{

    const allVendor = {
        name:name,
        email:email,
        website:website
    }

    if(!name || !email || !website){
        setErrorForm('ALL Input Fields or Required');
        return;
    }
    setErrorForm(false);

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
            method:'PUT',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify(allVendor)
        })
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.message || 'Failed Update Vendor')
        }
        const myVendor = vendor.map((eachVendor)=>{
            if(eachVendor.id === editId){
                return{...eachVendor, ...allVendor}
            }else{
                return eachVendor
            }
        })
        setVendor(myVendor);
        setEditId(null);
        setName('');
        setEmail('');
        setWebsite('');
        setShowError(false)
    } catch (error) {
        console.log('Error Message', error)
    }
 }

 useEffect(()=>{
   fetchApis('https://jsonplaceholder.typicode.com/users')
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
                 
                 {showError && (
                 <div className="shadow p-3 col-12 col-xs-12">
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                        {errorForm && <p style={{color:'red'}}>{errorForm}</p>}
                        <input type="submit" className="btn btn-primary mb-2" onClick={()=> updataData(editId)} />
                 </div>
                 )}

                  <div className="row mt-4">
                    {vendor.map((eachVendor)=>{
                        const {id, name, email, website} = eachVendor;
                        return(
                            <div key={id} className="col-4 col-xs-12">
                                <div className="shadow p-3 mb-3">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                        <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                        <button className="btn btn-info rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                        <Link className="btn btn-success rounded-0" to={`/Usestate101/${eachVendor.id}`}>Details</Link>
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

export default Usestate101;
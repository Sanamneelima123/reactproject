import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import "../Hooks/Usestate.css"
import { Link } from 'react-router-dom';

const Usestate10 = () =>{

 const URL="https://jsonplaceholder.typicode.com/users";

 const [mydata,setMyData] = useState([]);
 const [editid, setEditId] = useState(null);
 const [name, setName] = useState(null);
 const [email, setEmail] = useState(null);
 const [website, setWebsite] = useState(null);
 const [loading, setLoading] = useState(false);
 const [showEditForm,setShowEditForm] = useState(false)

 const fetchapi = async (apiurl)=>{
    setLoading(true);
    try {
         const responsive = await fetch(apiurl);
         const data = await responsive.json();
        //  console.log(data)
        setMyData(data);
        setLoading(false);
    } catch (error) {
        console.log(error);
    }
 }

 const handleDelete = (id) =>{
    const deleteData = mydata.filter((eachItem)=>{
        return eachItem.id !== id
    })
    setMyData(deleteData)
 }

 const handleEdit = (id, name, email, website) =>{
    setEditId(id);
    setName(name);
    setEmail(email);
    setWebsite(website);
    setShowEditForm(true)
 }

 const handleUpdate = (id) =>{
    const updateData = mydata.map((eachItem)=>{
        if(eachItem.id === id){
           return{...mydata, name:name, email:email, website:website}
        }else{
            return eachItem
        }
    })
    setMyData(updateData);
    setEditId(null);
    setName();
    setEmail();
    setWebsite();
    setShowEditForm(false)
 }

 useEffect(()=>{
    fetchapi(URL)
 },[])

 
 if(loading){
    return <h3 className='text-center'>Loading...</h3>
 }

    return(
        <div>
            <Header/>
               <div className='container'>
               {showEditForm && (
                 <div className='shadow p-3 mb-3 mt-3'>
                    <h4 className='mb-3'>Update Date Form</h4>
                    <input type='text' className='form-control mb-2' id='name' name='name' value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type='email' className='form-control mb-2' id='email' name='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type='text' className='form-control mb-2' id='website' name='website' value={website} onChange={(e)=> setWebsite(e.target.value)} />
                    <input type='submit' className='btn btn-primary mb-2' onClick={()=> handleUpdate(editid)} />
                 </div>
               )}
                 
                  {(!loading && 
                  <div className='row mt-5'>
                   {
                    mydata.map((eachItem)=>{
                        const {id, name, email, website} = eachItem;
                        return(
                            <div key={id} className='col-4'>
                             <div className='shadow p-3 mb-3 border-r'>
                                <p>{name}</p>
                                <p>{email}</p>
                                <p>{website}</p>
                              <div className='d-grid gap-0 d-md-flex justify-content-md-end'>
                                 <button className='btn btn-danger rounded-0' onClick={()=> handleDelete(id)}>Delete</button>
                                 <button className='btn btn-info rounded-0' onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                 <Link className='btn btn-primary rounded-0' to={`/Usestate10/${eachItem.id}`}>Details</Link>
                              </div>
                             </div>
                            </div>
                        )
                    })
                   }
                  </div>
                  )}
               </div>
            <Footer/>
        </div>
    )
}

export default Usestate10;
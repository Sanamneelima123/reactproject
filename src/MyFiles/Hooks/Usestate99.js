import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import "../Hooks/Usestate.css"

const useState99 = () =>{

const URL="https://jsonplaceholder.typicode.com/users";

const [list, setList] = useState([]);
const [editid, setEditId] = useState(null);
const [name, setName] = useState();
const [email, setEmail] = useState();
const [website, setWebsite] = useState();
const [loading,setLoading] = useState(false);
const [showEditForm, setShowEditForm] = useState(false);

const fetachapi = async (apiurl)=>{
    setLoading(true);
    try {
        const responsive = await fetch(apiurl);
        const data = await responsive.json();
        setList(data);
        setLoading(false);
    } catch (error) {
        console.log(error);
    }
}

const handleDelete = (id) =>{
    // console.log(id);
    const deleteItem = list.filter((eachData)=>{
        return eachData.id !== id
    })
    // console.log(deleteItem);
    setList(deleteItem);
}

const handleEdit = (id, name, email, website) =>{
   setEditId(id);
   setName(name);
   setEmail(email);
   setWebsite(website);
   setShowEditForm(true);
}

const handleUpdate = (id) =>{
    const dataUpdate = list.map((eachData)=>{
        if(eachData.id === id){
            return{...list, name:name, email:email, website:website}
        }else{
            return eachData
        }
    })
    setList(dataUpdate);

    setEditId(null);
    setName();
    setEmail();
    setWebsite();
    setShowEditForm(false);
}


useEffect(()=>{
    fetachapi(URL)
  },[])
  

if(loading){
  return <h3 className='text-center'>Loading...</h3>
}

    return(
        <div>
            <Header/>
               <div className='container mt-3'>
               {showEditForm && (
                <div className='shadow p-3 mb-3'>
                    <h4>Update the Form</h4>
                    <input type='text' className='form-control mb-2' id='name' name='name' value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type='text' className='form-control mb-2' id='name' name='name' value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type='text' className='form-control mb-2' id='name' name='name' value={website} onChange={(e)=> setWebsite(e.target.value)} />
                    <input type="submit" className="btn btn-primary mb-2" onClick={()=> handleUpdate(editid)} />
                </div>
               )}
                   
                   {
                        list.length === 0 && <h4>there is no data in the list</h4>
                    }
                   { !loading &&
                <div className='row'>
                   {
                    list.map((eachData)=>{
                        const {id, name, email, website} = eachData;
                        return(
                            <div key={id} className='col-4'>
                                <div className='shadow p-3 mb-3 border-r'>
                                   <p>{name}</p>
                                   <p>{email}</p>
                                   <p>{website}</p>
                                   <button className='btn btn-danger' onClick={()=> handleDelete(id)}>Delete</button>
                                   <button className='btn btn-info' onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                </div>
                            </div>
                        )
                    })
                   }
                   </div>
                   }
               </div>
            <Footer/>
        </div>
    )
}

export default useState99;
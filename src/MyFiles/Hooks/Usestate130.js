import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";

const Usestate130 = () =>{

 const [UserData, setUserData] = useState([]);
 const [isError, setIsError] = useState({status:false, msg:''});
 const [loading, setLoading] = useState(false);
 const [editId, setEditId] = useState(null);
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [website, setWebsite] = useState('');
 const [showForm, setShowForm] = useState(false);
 const [validation, setValidation] = useState(false);

 const fetchApi = async (apiUrl) =>{
    setIsError({status:false, msg:''});
    setLoading(true);
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setUserData(data);
        setIsError({status:false, msg:''});
        setLoading(false);
        if(response.status === 404){
            throw new Error('API Response 404: Please check API');
        }
    } catch (error) {
        console.log(error);
        setLoading(false);
        setIsError({status:true, msg: error.message || 'something went wrong'});
    }
 }

 const handleDelete = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type' : 'Application/json'
            }
        })
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.message || 'Failed to Delete User');
        }
        setUserData(UserData.filter(eachUser=> eachUser.id !== id));
    } catch (error) {
        console.log(error)
    }
 }

 const handleEdit = async (id, name, email, website) =>{
    setEditId(id);
    setName(name);
    setEmail(email);
    setWebsite(website);
    setShowForm(true);
    
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify({id, name, email, website})
        })
        .then(response=>{
            if(!response.ok){
                throw new Error('Failed to Edit User');
            }
        })
        .catch(error=>{
            console.log(error)
        })
    
 }

 const handleUpdate = async () =>{
    const allData = {name, email, website};

    if(!name || !email || !website){
        setValidation('All input fields are required');
        return;
    }

    setValidation(false);

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
            method:'PUT',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify(allData)
        })
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.message || 'Failed to Update User');
        }
        const UPDATE =  UserData.map((eachUser)=>{
            if(eachUser.id === editId){
                return{...eachUser, ...allData};
            }else{
                return eachUser;
            }
        })
        setUserData(UPDATE);
        setEditId(null);
        setName('');
        setEmail('');
        setWebsite('');
        setShowForm(false);
        toast.success('🦄 Successfully Update Data', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: "flip", // Corrected: 'flip' as a string
          });
          
    } catch (error) {
        console.log(error);
    }
 }

 useEffect(()=>{
    fetchApi('https://jsonplaceholder.typicode.com/users')
 },[]);

 if(loading){
    return <h4 className="text-center mt-5"><img src={Loader} alt={Loader} /></h4>
}

 if(isError?.status){
    return <h3 className="text-center" style={{color:'red'}}>{isError?.msg}</h3>
 }

    return(
        <div>
            <Header/>
                 <div className="container">
                     
                     {showForm && (
                     <div className="shadow p-3 mb-3 mt-3">
                        <input type="text" name="name" className="form-control mb-2" value={name} onChange={(e)=> setName(e.target.value)} /> 
                        <input type="email" name="email" className="form-control mb-2" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" name="website" className="form-control mb-2" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                        {validation && <p style={{color:'red'}}>{validation}</p>}
                        <button className="btn btn-primary rounded-0 mb-2" onClick={()=> handleUpdate(editId)}>Edit User</button>   
                     </div>
                     )}

                     <div className="row">
                        {UserData.map((eachUser)=>{
                            const {id, name, email, website} = eachUser;
                            return(
                               <div key={id} className="col-4 col-xs-12">
                                  <div className="shadow p-3 mb-3">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                        <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                        <button className="btn btn-primary rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                        <NavLink className="btn btn-success rounded-0" to={`/Usestate130/${id}`}>Details</NavLink>
                                    </div>
                                  </div>
                               </div>
                            )
                        })}
                     </div>

                 </div>
                 <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
  transition="flip" // Correct syntax for transition
/>

            <Footer/>
        </div>
    )
}

export default Usestate130;
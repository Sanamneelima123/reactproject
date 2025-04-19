import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import loader from "../../images/Loading-img.gif"
import { NavLink } from "react-router-dom";

const Usestate136 = () =>{

 const URL="https://jsonplaceholder.typicode.com/users";

 const [userData, setUserData] = useState([]);
 const [error, setError] = useState({status:false, msg:''});
 const [loading, setLoading] = useState(false);
 const [editId, setEditId] = useState(null);
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [website, setWebsite] = useState('');
 const [city, setCity] = useState('');
 const [showForm, setShowForm] = useState(false);
 const [validation, setValidation] = useState(false);

 const fetchApi = async (apiUrl)=>{
    setLoading(true);
    setError({status:false, msg:''});
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setUserData(data);
        setLoading(false);
        setError({status:false, msg:''});
        if(response.status === 404){
            throw new Error('Data not Found');
        }
    } catch (error) {
        console.log(error);
        setLoading(false);
        setError({status:true, msg: error.message || 'something went wrong'});
    }
 }

 const handleDelete = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type' : 'Application/json'
            }
        });
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.message || 'Failed to Delete User');
        }
        setUserData(userData.filter(eachData=> eachData.id !== id))
        console.log('User Deleted');
    } catch (error) {
        console.log(error)
    }
 }

 const handleEdit = async (id, name, email, website, city) =>{
    setEditId(id);
    setName(name);
    setEmail(email);
    setWebsite(website);
    setCity(city);
    setShowForm(true);

     await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
       method:'PUT',
       headers:{
         'Content-Type' : 'Application/json'
       },
       body: JSON.stringify({id, name, email, website, city})
     })

     .then(response=>{
        if(!response.ok){
            throw new Error('Failed to Edit User');
        }
     })

     .catch(error=>{
        console.log('Error Message', error);
     })
    
 }

 const handleSubmit = async () =>{

    const Alldetails ={name, email, website, city};

    if(!name || !email || !website || !city){
        setValidation('All input fields are required')
        return
    }

    setValidation(false);

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
            method:'PUT',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify(Alldetails)
        })
        if(!response.ok){
            const data = await response.json();
             throw new Error(data.message || 'Failed to Update Data');
        }
        const UPDATEUSER = userData.map((eachData)=>{
            if(eachData.id === editId){
                return{...eachData, ...Alldetails}
            }else{
                return eachData
            }
           
        })
        setUserData(UPDATEUSER);
        setEditId(null);
        setName('');
        setEmail('');
        setWebsite('');
        setCity('');
        setShowForm(false);
    } catch (error) {
        console.log(error);
    }
 }

 useEffect(()=>{
    fetchApi(URL)
 },[])

 if(loading){
    return <h3 className="text-center mt-5"><img src={loader} alt={loader} /></h3>
 }

 if(error?.status){
    return <h3 className="text-center mt-5" style={{color:'red'}}>{error?.msg}</h3>
 }

    return(
        <div>
            <Header/>
               <div className="container">
                   
                   {showForm && (
                   <div className="mt-5 shadow p-3 mb-3">
                      <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                      <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                      <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                      <input type="text" className="form-control mb-2" name="city" value={city} onChange={(e)=> setCity(e.target.value)} />
                      {validation && <p className="text-danger">{validation}</p>}
                      <input type="submit" className="btn btn-primary rounded-0" onClick={()=> handleSubmit(editId)} />
                   </div>
                   )}

                   <div className="row">
                      {userData.map((eachData)=>{
                        const {id, name, email, website, address:{city}} = eachData;
                        return(
                            <div key={id} className="col-4 col-xs-12">
                                <div className="shadow p-3 mb-3">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <p>{city}</p>
                                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                        <button type="button" className="btn btn-primary rounded-0" onClick={()=> handleEdit(id, name, email, website, city)}>Edit</button>
                                        <button type="button" className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                        <NavLink className="btn btn-success rounded-0" to={`/Usestate136/${id}`}>Details</NavLink>
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

export default Usestate136;
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import loader from "../../images/Loading-img.gif"
import { NavLink } from "react-router-dom";

const Usestate135 = () =>{

  const URL="https://jsonplaceholder.typicode.com/users";

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({status:'', msg:''});
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [validation, setValidation] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchApiData = async (apiUrl)=>{
    setIsLoading(true);
    setError({status:'', msg:''});
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setUserData(data);
        setIsLoading(false);
        setError({status:'', msg:''});
        if(response.status === 404){
            throw new Error('Please check the API 404');
        }
    } catch (error) {
        console.log(error);
        setIsLoading(false);
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
        })
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.message || 'Failed to Delete User');
        }
        setUserData(userData.filter(eachData=> eachData.id !== id));
    } catch (error) {
        console.log(error)
    }
  }

  const handleEdit = async (id, name, email, website) =>{

    setEditId(id);
    setName(name);
    setEmail(email);
    setWebsite(website);
    setShowForm(true)

      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify({id, name, email, website})
      })
      .then(response=>{
          if(!response.ok){
              throw new Error('Failed to Edit User')
          }
      })
      .catch(error=>{
          console.log('Error Message', error);
      })
  }

  const updateData = async () =>{

    const Alldetails ={name, email, website}

    if(!name || !email || !website){
        setValidation('All input fields are required');
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
        setShowForm(false);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=>{
     fetchApiData(URL);
  },[])

  if(isLoading){
    return <h3 className="text-center mt-5"><img src={loader} alt={loader} /></h3>
  }

  if(error?.status){
    return <h3 className="text-center mt-5" style={{color:'red'}}>{error?.msg}</h3>
  }

    return(
        <div>
            <Header/>
               <div className="container">
                  
                  {showForm && 
                  <div className="mt-5 mb-3 shadow p-3">
                    <h4 className="mb-3" style={{color:'#0070ad'}}>User Edit or Update</h4>
                      <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                      <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                      <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                       {validation && <p style={{color:'red'}} >{validation}</p>}
                      <input type="submit" className="btn btn-primary mb-2 rounded-0" onClick={()=> updateData(editId)} />
                  </div>
                  }

                  <div className="row mt-4">
                    {userData.map((eachData)=>{
                        const {id, name, email, website} = eachData;
                        return(
                            <div key={id} className="col-4 col-xs-2">
                                <div className="shadow p-3 mb-3">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <div class="d-grid gap-0 d-md-flex justify-content-md-end">
                                       <button class="btn btn-danger mb-2 rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                       <button class="btn btn-primary mb-2 rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                       <NavLink className="btn btn-success mb-2 rounded-0" to={`/useState135/${id}`}>Details</NavLink>
                                       <button className="btn btn-warning mb-2 rounded-0" onClick={()=> navigator(`/usepost135`)}>Post</button>
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

export default Usestate135;
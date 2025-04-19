import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif";
import { NavLink, useNavigate } from "react-router-dom";

const Usestate131 = () => {

  const [adminUser, setAdminUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState({status:'', msg:''});
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [validation, setValidation] = useState(false);

  const Navigation = useNavigate();

  const fetchApi = async (apiUrl)=>{
    setLoading(true);
    setIsError({status:false, msg:''});
     try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setAdminUser(data);
        setLoading(false);
        setIsError({status:false, msg:''});
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
        setAdminUser(adminUser.filter(eachUser=> eachUser.id !== id));
    } catch (error) {
        console.log('error message ', error.message);
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
            const data = response.json();
            throw new Error(data.message || 'Failed to Edit Data');
        }
    })
    .catch(error=>{
        console.log('error message ', error.message);
    })

  }

  const handleUpdate = async ()=>{
    
     const adminData = {name, email, website};

     if(!name || !email || !website){
        setValidation('All input fields are required');
        return
     }

     setValidation(false);

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
        method:'PUT',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify(adminData)
    });
    if(!response.ok){
        const data = await response.json();
        throw new Error(data.message || 'Failed to Update Data');
    }
    const UPDATEDATA = adminUser.map((eachUser)=>{
        if(eachUser.id === editId){
            return{...eachUser, ...adminData};
        }else{
            return eachUser;
        }
    })

    setAdminUser(UPDATEDATA);
    setEditId(null);
    setName('');
    setEmail('');
    setWebsite('');
    setShowForm(false);
  }

  useEffect(()=>{
     fetchApi(`https://jsonplaceholder.typicode.com/users`);
  },[])

  if(loading){
    return <h3 className="text-center mt-v"><img src={Loader} alt={Loader} /></h3>
  }

  if(isError?.status){
      return <h3 className="text-center mt-5" style={{color:'red'}}>{isError?.msg}</h3>
  }

    return(
        <div>
            <Header/>
                <div className="container">
                    
                    {showForm &&(
                    <div className="shadow p-3 mt-3 mb-3">
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                         {validation && <p className="text-danger">{validation}</p>}
                        <button className="btn btn-primary" onClick={()=> handleUpdate(editId)}>Submit</button>
                    </div>
                    )}

                    <div className="row">
                        {adminUser.map((eachUser)=>{
                            const {id, name, email, website} = eachUser;
                            return(
                                <div key={id} className="col-4 col-xs-12">
                                    <div className="shadow p-3 mb-2">
                                        <p>{name}</p>
                                        <p>{email}</p>   
                                        <p>{website}</p>
                                        <div class="d-grid gap-0 d-md-flex justify-content-md-end">
                                          <button class="btn btn-danger rounded-0" onClick={()=> handleDelete(id)} type="button">Delete</button>
                                          <button class="btn btn-primary rounded-0" onClick={()=> handleEdit(id, name, email, website)} type="button">Edit</button>
                                          <NavLink className="btn btn-success rounded-0" to={`/usestate131/${id}`}>Details</NavLink>
                                          <button className="btn btn-warning rounded-0" onClick={()=> Navigation(`/Usepost131`)}>Post</button>
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

export default Usestate131;
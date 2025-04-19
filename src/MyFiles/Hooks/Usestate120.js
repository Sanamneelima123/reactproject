import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"

const Usestate120 = () => {

    const [newData, setNewData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({status:false, msg:''});
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [validation, setValidation] = useState(false);
    const [showForm, setShowForm] = useState(false)

    const fetchApi = async (apiUrl) => {
        setIsLoading(true);
        setIsError({status:false, msg:''});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setNewData(data);
            setIsLoading(false);
            setIsError({status:false, msg:''});
            if(response.status === 404){
                throw new Error('Please check the API 404')
            }
        } catch (error) {
            console.log(error);
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
                throw new Error(data.message || 'Failed the NewData Delete')
            }
            setNewData(newData.filter(eachData=> eachData.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (id, name, email, website) => {
        setEditId(id);
        setName(name);
        setEmail(email);
        setWebsite(website);
        setShowForm(true);
    
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({ id, name, email, website })
            });
            if (!response.ok) {
                throw new Error('Failed to edit data');
            }
        } catch (error) {
            console.error('Edit Error:', error);
        }
    }
    

    const updateData = async () => {
        if (!name || !email || !website) {
            setValidation('All input fields are required');
            return;
        }
    
        setValidation(false);
    
        const allData = { name, email, website };
    
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(allData)
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update data');
            }
            const updatedData = newData.map((eachData) => {
                if (eachData.id === editId) {
                    return { ...allData, id: eachData.id };
                } else {
                    return eachData;
                }
            });
            setNewData(updatedData);
            setEditId(null);
            setName('');
            setEmail('');
            setWebsite('');
            setShowForm(false);
        } catch (error) {
            console.error('Update Error:', error);
        }
    }
    
    

    useEffect(() => {
        fetchApi('https://jsonplaceholder.typicode.com/users');
    },[])

    if(isLoading){
        return <h3 className="text-center mt-5"><img src={Loader} alt="loader" /></h3>
    }

    if(isError?.status){
        return <h3 className="text-center mt-5">{isError?.msg}</h3> 
    }

    return(
        <div>
            <Header/>
               <div className="container">
                   
                   {showForm && (
                   <div className="shadow p-3 mt-5">
                      <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)} />
                      <input type="email" className="form-control mt-3" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                      <input type="text" className="form-control mt-3" placeholder="Website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                      {validation && <p style={{color:'red'}}>{validation}</p>}
                         <button className="btn btn-success mt-3" onClick={()=> updateData(editId)}>Submit</button>
                   </div>
                    )}

                   <div className="row">
                      {newData.map((eachData)=>{
                          const {id, name, email, website} = eachData;
                          return(
                            
                              <div className="col-4 col-xs-12" key={id}>
                                  <div className="card mt-4">
                                      <div className="card-body">
                                          <h5 className="card-title">{name}</h5>
                                          <p className="card-text">{email}</p>
                                          <p className="card-text">{website}</p>
                                          <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                             <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                             <button className="btn btn-success rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                          </div>
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

export default Usestate120;
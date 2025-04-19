import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"

const Usestate132 = () => {

    const [vendorUser, setVendorUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newError, setNewError] = useState({status:false, msg:''});
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [validation, setValidation] = useState(false);

    const fetchApi = async (apiURL) =>{
        setLoading(true);
        setNewError({status:'' , msg:''});
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            setVendorUser(data);
            setLoading(false);
            setNewError({status:false, msg:''});
            if(response.status === 404){
                throw new Error('API Response 404: Please check API');
            }
        } catch (error) {
            console.log(error);
            setNewError({status:'true', msg: error.message || 'something went wrong'});
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
            setVendorUser(vendorUser.filter(eachVendor=> eachVendor.id !== id));
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
            const data = response.json();
            throw new Error(data.message || 'Failed to Edit Data');
         }
       })
       .catch(error=>{
         console.log('error message ', error.message);
       })

    }

    const handleUpdate = async () =>{
 
        const vendorData = { name, email, website };

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
                body: JSON.stringify(vendorData)
            });
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || 'Failed to Update Data');
            }
            const UPDATEDATA = vendorUser.map((eachVendor)=>{
                if(eachVendor.id === editId){
                    return {...eachVendor, ...vendorData}
                }else{
                    return eachVendor
                }
            })
            setVendorUser(UPDATEDATA);
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
       fetchApi('https://jsonplaceholder.typicode.com/users');
    },[])

    if(loading){
        return <h3 className="text-center"><img src={Loader} alt={Loader} /></h3>
    }

    if(newError?.status){
        return <h3 className="text-center mt-5" style={{color:'red'}}>{newError?.msg}</h3>
    }

    return(
        <div>
            <Header/>
              <div className="container">
                  
                  {showForm && (
                  <div className="mt-5 shadow p-3">
                    <h5 style={{color:"#12abdb"}}>Usestate132 Component</h5>
                    <input type="text" name="name" className="form-control rounded-0 mb-2" value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type="email" name="email" className="form-control rounded-0 mb-2" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type="text" name="website" className="form-control rounded-0 mb-2" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                    {validation && <p className="text-danger">{validation}</p>}
                    <input type="submit" name="submit" className="btn btn-primary rounded-0 mb-2 w-100" onClick={()=> handleUpdate(editId)} />
                  </div>
                  )}

                  <div className="row">
                      {vendorUser.map((eachVendor)=>{
                        const {id, name, email, website} = eachVendor;
                        return(
                            <div key={id} className="col-4 col-xs-12">
                                <div className="shadow p-3 mb-2">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                        <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                        <button className="btn btn-primary rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
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

export default Usestate132;
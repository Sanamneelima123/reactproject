import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import loader from '../../images/Loading-img.gif'
import { NavLink } from "react-router-dom";

const Usestate133 = () => {

    const [myUser, setMyUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [iserror, setIsError] = useState({status:false, msg:''});
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [validation, setValidation] = useState(false)

    const fetchApi = async (apiUrl)=>{
        setLoading(true);
        setIsError({status:false, msg:''});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setMyUser(data);
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
          setMyUser(myUser.filter(eachUser=> eachUser.id !== id));
       } catch (error) {
             console.log('error message ', error.message);
       }
    }

    const handleEdit = async (id,name, email, website) =>{
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
          console.log('error message ', error.message);
       })
    }

    const updateData = async () =>{

        const allData = { name, email, website};

        if(!name || !email || !website){
            setValidation('All input fields or Required');
            return
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
                throw new Error(data.message || 'Failed to Update Data');
            }
            const UPDATEUSER = myUser.map((eachUser)=>{
                if(eachUser.id === editId){
                    return{...eachUser, ...allData};
                }else{
                    return eachUser;
                }
            })
            setMyUser(UPDATEUSER);
            setEditId(null);
            setName('');
            setEmail('');
            setWebsite('');
            setShowForm(false);
        } catch (error) {
            console.log('error message ', error.message);
        }
    }

    useEffect(()=>{
        fetchApi('https://jsonplaceholder.typicode.com/users');
    },[]);

    if(loading){
        return <h4 className="text-center mt-5"><img src={loader} alt={loader} /></h4>
    }

    if(iserror?.status){
        return <h4 className="text-center mt-5" style={{color:'red'}}>{iserror?.msg}</h4>
    }

    return(
        <div>
            <Header/>
               <div className="container">
                  
                  {showForm && (
                  <div className="mt-3 shadow p-3">
                    <input type="text" className="form-control mb-2" value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type="text" className="form-control mb-2" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type="text" className="form-control mb-2" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                    {validation && <p className="text-danger">{validation}</p>}
                    <button className="btn btn-primary mb-2" onClick={()=> updateData(editId)}>Submit</button>
                  </div>
                  )}

                   <div className="row">
                     {myUser.map((eachUser)=>{
                        const {id, name, email, website} = eachUser;
                        return(
                            <div key={id} className="col-4 col-xs-12">
                              <div className="shadow p-3 mb-2">  
                                <p>{name}</p>
                                <p>{email}</p>
                                <p>{website}</p>
                                <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                    <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                    <button className="btn btn-primary rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                    <NavLink className="btn btn-info rounded-0" to={`/usestate133/${id}`}> Details</NavLink>
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

export default Usestate133;
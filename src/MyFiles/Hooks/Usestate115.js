import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"
import { Link, useNavigate } from "react-router-dom";

const Usestate115 = () =>{

    const [myAdmin, setMyAdmin] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({status:false, msg:''});
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setwebsite] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [validation, setValidation] = useState(false);
    const navigate = useNavigate();

    const fetchApi = async (apiUrl) =>{
        setIsLoading(true);
        setIsError({status:false, msg:''});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setMyAdmin(data);
            setIsLoading(false);
            setIsError({status:false, msg:''});
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setIsError({status:true, msg:'something went worng'});
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
                throw new Error(data.message || 'Failed the Admin Delete')
            }
            setMyAdmin(myAdmin.filter(eachAdmin=> eachAdmin.id !== id))
        } catch (error) {
            console.log('Error Message Delete', error)
        }

    }
    
    const handleEdit = async (id, name, email, website) =>{

        setEditId(id);
        setName(name);
        setEmail(email);
        setwebsite(website);
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
                    throw new Error('Failed the Admin Editing')
                }
            })
            .catch(error=>{
                console.log('Error Message Edit', error)
            })
    }

    const updateData = async () =>{

        if(!name || !email || !website){
            setValidation('All input fields or Required');

            return
        }

        setValidation(false);

        const allAdmin = {
            name:name,
            email:email,
            website:website
        }
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
                method:'PUT',
                headers:{
                    'Content-Type' : 'Application/json'
                },
                body: JSON.stringify(allAdmin)
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || 'Failed the Update Data')
            }
            const Todos = myAdmin.map((eachAdmin)=>{
                if(eachAdmin.id === editId){
                    return {...eachAdmin, ...allAdmin}
                }else{
                    return eachAdmin
                }
            })
            setMyAdmin(Todos)
            setEditId(null);
            setName('');
            setEmail('');
            setwebsite('');
            setShowForm(false)
        } catch (error) {
            console.log('Error Message Update Failed', error)
        }
    }

    useEffect(()=>{
       fetchApi('https://jsonplaceholder.typicode.com/users')
    },[])

    if(isLoading){
        return <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>
    }

    if(isError?.status){
        return <h3 className="text-center mt-5">{isError?.msg}</h3>
    }

    return(
        <div>
            <Header/>
               <div className="container">
                 
                 {showForm && (
                 <div className="shadow p-3 mt-4 mb-3">
                    <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setwebsite(e.target.value)} />
                    {validation && <p style={{color:'red'}}>{validation}</p>}
                    <input type="submit" className="btn btn-primary mb-2" onClick={()=> updateData(editId)} />
                 </div>
                 )}

                   <div className="row mt-4">
                     {
                        myAdmin.map((eachAdmin)=>{
                            const {id, name, email, website} = eachAdmin;
                            return(
                                <div key={id} className="col-4 col-xs-12">
                                    <div className="shadow p-3 mb-2">
                                        <p>{name}</p>
                                        <p>{email}</p>
                                        <p>{website}</p>
                                        <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                            <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                            <button className="btn btn-info rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                            <Link className="btn btn-success rounded-0" to={`/Usestate115/${eachAdmin.id}`}>Details</Link>
                                            <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usepost115`)}>Post</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                     }
                   </div>

               </div>
            <Footer/> 
        </div>
    )
}

export default Usestate115;
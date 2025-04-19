import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"
import { Link, useNavigate } from "react-router-dom";

const Usestate114 = () =>{

    const URL= 'https://jsonplaceholder.typicode.com/users';

    const [admin, setAdmin] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState({status:false, msg:''});
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [errorForm, setErrorForm] = useState(false);
    const [validation, setValidation] = useState(false);

    const navigate = useNavigate();

    const fetchApi = async (apiUrl) =>{
        setLoading(true);
        setIsError({status:false, msg:''});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setAdmin(data);
            setLoading(false);
            setIsError({status:false, msg:''});
            if(response.status === 404){
                throw new Error('Please check API 404 Error')
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
                },
            });
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || 'Failed Admin Delte')
            }
            setAdmin(admin.filter(eachAdmin=> eachAdmin.id !== id))
        } catch (error) {
            console.log('Error Message Admin Delete', error)
        }
    }

    const handleEdit = async (id, name, email, website) =>{
        setEditId(id);
        setName(name);
        setEmail(email);
        setWebsite(website);
        setErrorForm(true);

        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify({id, name, email, website})
        })
        .then(response=>{
            if(!response.ok){
                throw new Error('Failed Admin Edit')
            }
        })
        .catch(error=>{
            console.log('Error Message Edit', error)
        })
    }

    const updateData = async () =>{

        if(!name || !email || !website){
            setValidation('All Input Fields or Required');

            return;
        }

        setValidation(false);

        const allAdmin={
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
                throw new Error(data.message || 'Failed Admin Update Data')
             }
             const Todos = admin.map((eachAdmin)=>{
                if(eachAdmin.id === editId){
                    return {...eachAdmin, ...allAdmin}
                }else{
                    return eachAdmin
                }
             })
             setAdmin(Todos);
             setEditId(null);
             setName('');
             setEmail('');
             setWebsite('');
             setErrorForm(false)
             
        } catch (error) {
            console.log('Error Admin Data Updating', error)
        }

    }

    useEffect(()=>{
        fetchApi(URL)
    },[])

    if(loading){
        return <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>
    }

    if(isError?.status){
        return <h3 className="text-center mt-5" style={{color:'red'}}>{isError?.msg}</h3>
    }

    return(
        <div>
            <Header/>
                <div className="container">
                    
                    {errorForm && (
                    <div className="shadow p-3 mt-4 mb-3">
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                        {validation && <p style={{color:'red'}}>{validation}</p>}
                        <input type="submit" className="btn btn-primary mb-2" onClick={()=> updateData(editId)} />
                    </div>
                    )}

                    <div className="row mt-4 mb-5">
                        {admin.map((eachAdmin)=>{
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
                                            <Link className="btn btn-success rounded-0" to={`/Usestate114/${eachAdmin.id}`}>Details</Link>
                                            <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usepost114`)}>Post</button>
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

export default Usestate114;
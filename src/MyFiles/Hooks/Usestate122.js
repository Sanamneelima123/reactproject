import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif";
import { toast, ToastContainer } from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

const Usestate122 = () =>{

 const [newData, setNewData] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [isError, setIsError] = useState({status:false, msg:''});
 const [editId, setEditId] = useState(null);
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [website, setWebsite] = useState('');
 const [formShow, setFormShow] = useState(false);
 const [validation, setValidation] = useState(false);

 const navigate = useNavigate();

 const fetchApi = async (apiUrl) =>{
    setIsLoading(true);
    setIsError({status:false, msg:''});
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setNewData(data);
        setIsLoading(false);
        setIsError({status:false, msg:''});
        if(response.status === 404){
            throw new Error('something went wrong');
        }
    } catch (error) {
        console.log(error);
        setIsError({status:true, msg: error.message || 'something went wrong'});
        setIsLoading(false);
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
            throw new Error(data.message || 'NewData Delete Failed');
        }
        setNewData(newData.filter(eachData=> eachData.id !== id))
    } catch (error) {
        console.log(error)
    }
 }

 const handleEdit = async (id, name, email, website) =>{
      setEditId(id);
      setName(name);
      setEmail(email);
      setWebsite(website);
      setFormShow(true);

      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify({id, name, email, website})
      })
      .then(response=>{
        if(!response.ok){
            throw new Error('Failed the NewData Edit')
        }
      })
      .catch(error=>{
         console.log(error)
      })

 }

 const updateData = async () =>{
    const allData = {name:name, email:email, website:website};

    if(!name || !email || !website){
        setValidation('ALL Iput Fields or Required');
        return;
    }

    setValidation(false);

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`, {
            method:'PUT',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify(allData)
        })
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.message || 'Failed the NewData Updating')
        }
        const Todos = newData.map((eachData)=>{
            if(eachData.id === editId){
                return {...eachData, ...allData}
            }else{
                return eachData
            }
        })
        setNewData(Todos);
        toast.success('Data Updated Successfully');
        setEditId(null);
        setName('');
        setEmail('');
        setWebsite('');
        setFormShow(false);
    } catch (error) {
        console.log(error)
    }

 }

 useEffect(()=>{
    fetchApi('https://jsonplaceholder.typicode.com/users')
 },[])

 if(isLoading){
    return <h3 className="text-center"><img src={Loader} alt={Loader} /></h3>
 }

 if(isError?.status){
    return <h3 className="text-center" style={{color:'red'}}>{isError?.msg}</h3>
 }

    return(
        <div>
            <Header/>
                <div className="container">
                    
                    {formShow && (
                    <div className="shadow mt-5 p-4">
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                        {validation && <p style={{color:'red'}}>{validation}</p>}
                        <input type="submit" className="btn btn-primary mb-2" onClick={()=> updateData(editId)} />
                    </div>
                    )}

                    <div className="row mt-5">
                        {newData.map((eachData)=>{
                            const {id, name, email, website} = eachData;
                            return(
                                <div key={id} className="col-4 mb-2">
                                    <div className="shadow p-3">
                                        <p>{name}</p>
                                        <p>{email}</p>
                                        <p>{website}</p>
                                        <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                            <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                            <button className="btn btn-primary rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                            <Link className="btn btn-success rounded-0" to={`/Usestate122/${eachData.id}`}>Details</Link>
                                            <button className="btn btn-info rounded-0" onClick={()=> navigate(`/usepost122`)}>Post</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <ToastContainer />
                </div>
            <Footer/>
        </div>
    )
}

export default Usestate122;
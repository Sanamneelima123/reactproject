import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"
import { Link } from "react-router-dom";

const Usestate119 = () =>{

    const [newData, setNewData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({status:false, msg:''});
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [validation, setValidation] = useState(false);
    const [showForm, setShowForm] = useState(false)

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
              throw new Error('Failed the NewData Edit')
           }
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const updateData = async () =>{

        if(!name || !email || !website){
            setValidation('All input fields or Required');

            return
        }

        setValidation(false)

        const allData ={
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
            body: JSON.stringify(allData)
         })
         if(!response.ok){
            const data = await response.json();
            throw new Error(data.message || 'Failed the NewData Updating')
         }
         const Todos = newData.map((eachData)=>{
            if(eachData.id === editId){
                return{...allData, ...eachData}
            }else{
                return eachData
            }
         })
         setNewData(Todos)
         setEditId(null);
         setName('');
         setEmail('');
         setWebsite('');
         setShowForm(false)
       } catch (error) {
         console.log(error)
       }
    }

    useEffect(()=>{
        fetchApi('https://jsonplaceholder.typicode.com/users')
    },[])

    if(isLoading){
        return <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>
    }

    if(isError?.status){
        return <h3 className="text-center mt-5" style={{color:'red'}}>{isError?.msg}</h3>
    }

    return(
        <div>
            <Header/>
               <div>
                  <div className="container">
                     
                     {showForm && (
                     <div className="shadow mt-5 p-3">
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                        {validation && <p style={{color:'red'}}>{validation}</p>}
                        <input type="submit" className="btn btn-primary mb-2" onClick={()=> updateData(editId)} />
                     </div>
                     )}

                     <div className="row mt-3">
                        {newData.map((eachData)=>{
                            const {id, name, email, website} = eachData;
                            return(
                                <div key={id} className="col-4 col-xs-12">
                                    <div className="shadow p-3 mb-2">
                                        <p>{name}</p>
                                        <p>{email}</p>
                                        <p>{website}</p>
                                        <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                            <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                            <button className="btn btn-info rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                            <Link className="btn btn-primary rounded-0" to={`/Usestate119/${eachData.id}`}>Details</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                     </div>

                  </div>
               </div>
            <Footer/>
        </div>
    )
}

export default Usestate119;
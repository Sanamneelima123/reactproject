import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"

const Usestate126 = () =>{

    const [myData, setMyData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({status:false, msg:''});
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [validation, setValidation] = useState(false);

    const fetchApi = async (url) =>{
        setIsLoading(true);
        setIsError({status:false, msg:''});
        try {
            const response = await fetch(url);
            const data = await response.json();
            setMyData(data);
            setIsLoading(false);
            setIsError({status:false, msg:''});
            if(response.status === 404){
                throw new Error('Please check API 404 Error');
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
                }
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || 'Failed to Delete User');
            }
            setMyData(myData.filter(eachData=> eachData.id !== id))
        } catch (error) {
            console.log(error);
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
                throw new Error('Failed Mydata Edit');
            }
         })
         .catch(error=>{
            console.log('Error Message', error);
         })

    }

    const updateData = async () =>{

        const allData = {
            name:name,
            email:email,
            website:website
        }

        if(!name || !email || !website){
            setValidation('ALL input fields or Required');
            return;
        }

        setValidation(false);

        try {
           const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(allData)
           })
           if(!response.ok){
              const data = await response.json();
              throw new Error(data.message || 'Failed Mydata Update');
           }

           const Todos = myData.map((eachData)=>{
            if(eachData.id === editId){
                return{...eachData, ...allData}
            }else{
                return eachData
            }
           })
           setMyData(Todos);
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
    },[]);

    if(isLoading){
        return <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>
    }

    if(isError?.status){
        return <h3 className="text-center mt-5" style={{color:'red'}}>{isError?.status}</h3>
    }

    return(
        <div>
            <Header/>
               <div className="container">
                   
                   {showForm && (
                   <div className="shadow p-3 mt-4 mb-2">
                      <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                      <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                      <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                      {validation && <p style={{color:'red'}}>{validation}</p>}
                      <input type="submit" className="btn btn-primary mb-2" onClick={()=> updateData(editId)} />
                   </div>
                   )}

                   <div className="row mt-3">
                      {myData.map((eachData)=>{
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

export default Usestate126;
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"
import { Link, useNavigate } from "react-router-dom";

const Usestate102 = () =>{

    const navigate = useNavigate();

   const [myData, setMyData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [isError, setIsError] = useState({status:false, meg:''});
   const [editId, setEditId] = useState(null);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [website, setWebsite] = useState('');
   const [showForm, setShowForm] = useState(false)

   const fetchApi = async (apiUrl) =>{
    setLoading(true);
    setIsError({status:false, msg:''});
     try {
        const responsive = await fetch(apiUrl);
        const data = await responsive.json();
        setMyData(data);
        setLoading(false);
        setIsError({status:false, msg:''});
        if(responsive.status === 404){
         throw new Error('Please check the API 404')
        }
     } catch (error) {
        console.log('Error Message', error);
        setLoading(false);
        setIsError({status:true, msg: error.message || 'something went wrong'});
     }
   }

   const handleDelete = async (id) =>{
      try {
          const responsive = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type' : 'Application/json'
            },
          });
          if(!responsive.ok){
            const data = await responsive.json();
            throw new Error(data.message || 'Failed Delete Data')
          }
          setMyData(myData.filter(eachData=> eachData.id !== id));
      } catch (error) {
          console.log('Error Message', error)
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
     .then(responsive=>{
        if(!responsive.ok){
            throw new Error('Failed Edit Data')
          }
     })
     .catch(error=>{
        console.log('Error Message', error)
     })
      
   }

   const updataData = async () =>{
     const allMyData={
        name:name,
        email:email,
        website:website
     }
      try {
         const responsive = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
            method:'PUT',
            headers:{
                'Content-Type' : 'Application'
            },
            body: JSON.stringify(allMyData)
         })
         if(!responsive.ok){
            const data = await responsive.json();
            throw new Error(data.message || 'Failed Update Data')
         }
         const Todos = myData.map((eachData)=>{
            if(eachData.id === editId){
                return{...eachData, ...allMyData}
            }else{
                return eachData
            }
         })
         setMyData(Todos);
         setEditId(null);
         setName('');
         setEmail('');
         setWebsite('');
         setShowForm(false)
      } catch (error) {
        console.log('Error Message', error)
      }
      
   }

   useEffect(()=>{
      fetchApi('https://jsonplaceholder.typicode.com/users')
   },[])

   if(loading){
    return <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>
   }

   if(isError?.status){
    return <h3 className="text-center mt-5" style={{color:'red'}}>{isError?.meg}</h3>
   }

    return(
        <div>
            <Header/>
                <div className="container">
                
                {showForm && (
                  <div className="shadow p-3 mt-4 mb-4">
                     <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                     <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                     <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                     <input type="submit" className="btn btn-primary mb-2" onClick={()=> updataData(editId)} />
                  </div>
                  )}

                   <div className="row">
                      {myData.map((eachData)=>{
                         const {id, name, email, website} = eachData;
                         return(
                            <div key={id} className="col-4 col-xs-12">
                                <div className="shadow p-3 mb-3 mt-3">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                        <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                        <button className="btn btn-info rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                        <button className="btn btn-success rounded-0" onClick={()=> navigate(`/Usepost102`)}>Post</button>
                                        <Link className="btn btn-primary rounded-0" to={`/Usestate102/${eachData.id}`}>Details</Link>
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

export default Usestate102;
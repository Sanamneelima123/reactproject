import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"
import { NavLink, useNavigate } from "react-router-dom";

const Usestate127 = () =>{

    const URL = "https://jsonplaceholder.typicode.com/users";

    const [mydata, setMyData] = useState([]);
    const [isError, setIsError] = useState({status:false, msg:''});
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [validation, setValidation] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const navigate = useNavigate();

    const fetchApi = async (apiUrl) =>{
        setIsLoading(true);
        setIsError({status:false, msg:''});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setMyData(data);
            setIsLoading(false);
            setIsError({status:false, msg:''});
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setIsError({status:true, msg:'someting went wrong'});
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
                throw new Error(data.message || 'MyData is not Deleted')
            }
            setMyData(mydata.filter(eachData=> eachData.id !== id))
        } catch (error) {
            
        }
    }

    const handleEdit = async (id, name, email, website)=>{
        setUserId(id);
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
                    throw new Error('Failed MyData Edit');
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
            setValidation('Please fill all the fields');
            return
        }

        setValidation(false);

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`,{
                method:'PUT',
                headers:{
                    'Content-Type' : 'Application/json'
                },
                body: JSON.stringify(allData)
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || 'Failed MyData Update');
            }
            const Todos = mydata.map((eachData)=>{
                if(eachData.id !== eachData.userId){
                    return {...eachData, ...allData}
                }else{
                    return eachData
                }
            })
            setUserId(null);
            setName('');
            setEmail('');
            setWebsite('');
            setMyData(Todos);
            setShowForm(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
       fetchApi(URL)
    },[])

    if(isLoading){
        return <h3 className="mt-5 text-center"><img src={Loader} alt={Loader} /></h3>
    }

    if(isError?.status){
        return <h3 className="text-center mt-5" style={{color:'red'}}>{isError?.status}</h3>
    }


    return(
        <div>
            <Header/>
              <div className="container">
                  
                  {showForm && (
                  <div className="p-3 shadow mt-4">
                    <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                    {validation && <p style={{color:'red'}}>{validation}</p>}
                    <input type="submit" className="btn btn-primary mb-2" onClick={()=> updateData(userId)} />
                  </div>
                  )}

                   <div className="row">
                    {mydata.map((eachData)=>{
                        const {id, name, email, website} = eachData;
                         return(
                            <div key={id} className="col-4 col-xs-12">
                                <div className="shadow p-3">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                        <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                        <button className="btn btn-primary rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                        <NavLink className="btn btn-info rounded-0" to={`/Usestate127/${id}`}>Details</NavLink>
                                        <button className="btn btn-success rounded-0" onClick={()=> navigate(`/usepost127`)}>Post</button>
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

export default Usestate127;
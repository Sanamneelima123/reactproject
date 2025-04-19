import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";

const Usestate129 = () =>{

    const URL ="https://jsonplaceholder.typicode.com/users";

    const [userData, setUserData] = useState([]);
    const [isError, setIsError] = useState({status:false, msg:""});
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [validation, setValidation] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const navigate = useNavigate();

    const fetchApi = async (url) =>{
        setLoading(true);
        setIsError({status:false, msg:''});
        try {
            const response = await fetch(url);
            const data = await response.json();
            setUserData(data);
            setLoading(false);
            setIsError({status:false, msg:''});
            if(response.status === 404){
                throw new Error('API Response 404: Please check API');
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setIsError({status:true, msg:error.message || 'something went wrong' });
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
                throw new Error(data.message || 'userData not deleted');
            }
            setUserData(userData.filter(eachUser=> eachUser.id !== id));
            toast.error('User Deleted Successfully');
        } catch (error) {
            console.log('error message ', error.message);
        }
    }

    const handleEdit = async (id, name, email, website) =>{
        setIsEdit(id);
        setName(name);
        setEmail(email);
        setWebsite(website);
        setShowForm(true);

        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type' : 'Application/json'
                },
                body: JSON.stringify({id, name, email, website})
            })
            .then(response=>{
                if(!response.ok){
                    throw new Error('userData Faild Edit');
                }
            })
            // toast.success('User Edit Successfully');
        } catch (error) {
            toast.error('error message ', error.message);
        }
    }

    const handleUpdate = async () =>{
        const allData = { name, email, website};
        
        if(!name || !email || !website){
            setValidation('All input fields are required');
            return;
        }

        setValidation(false);

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${isEdit}`,{
                method:'PUT',
                headers:{
                    'Content-Type' : 'Application/json'
                },
                body: JSON.stringify(allData)
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.Error || 'userData Faild Update');
            }
            const UPDATE = userData.map((eachUser)=>{
                if(eachUser.id === isEdit){
                    return {...eachUser, ...allData};
                }
                else{
                    return eachUser;
                }
            })
            setUserData(UPDATE);
            setIsEdit(null);
            setName('');
            setEmail('');
            setWebsite('');
            toast.success('User Update Successfully');
            setShowForm(false);
        } catch (error) {
            console.log('error message ', error.message);
        }
    }

    useEffect(()=>{
       fetchApi(URL);
    },[URL]);

    if(isError?.status){
        return <h4 className="text-center mt-5" style={{color:'red'}}>{isError?.msg}</h4>
    }

    if(loading){
        return <h4 className="text-center mt-5"><img src={Loader} alt={Loader} /></h4>
    }

    return(
        <div>
            <Header/>
              <div className="container">
                 
                 {showForm && (
                 <div className="shadow p-3 mb-2">
                    <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                    {validation && <p style={{color:'red'}}>{validation}</p>}
                    <input type="submit" className="btn btn-primary mb-2" onClick={()=> handleUpdate(isEdit)} /> 
                 </div>
                 )}

                 <div className="row">
                    {userData.map((eachUser)=>{
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
                                       <NavLink className="btn btn-success rounded-0" to={`/Usestate129/${id}`}>Details</NavLink>
                                       <button className="btn btn-warning rounded-0" onClick={()=> navigate(`/Usepost129`)}>Post</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                 </div>

              </div>
              <ToastContainer/>
            <Footer/>
        </div>
    )
}

export default Usestate129;
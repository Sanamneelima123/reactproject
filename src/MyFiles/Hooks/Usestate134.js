import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"
import { NavLink } from "react-router-dom";

const Usestate134 = () => {

    const URL="https://jsonplaceholder.typicode.com/users";

    const [userData, setUserData] = useState([]);
    const [isError, setIsError] = useState({status:false, msg:""});
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');

    const fetchApi = async (apiUrl) =>{
        setLoading(true);
        setIsError({status:false, msg:""});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setUserData(data);
            setIsError({status:false, msg:""});
            setLoading(false);
            if(response.status === 404){
                throw new Error('API Response 404: Please check API');
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setIsError({status:true, msg: error.message || 'something went wrong'});
        }
    }

    useEffect(()=>{
        fetchApi(URL);
    },[])

    const handleDelete = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type' : 'Application/json'
                }
            });
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message);
            }
            setUserData(userData.filter(eachUser=> eachUser.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async (id, name, email, website) =>{

            setEditId(id);
            setName(name);
            setEmail(email);
            setWebsite(website);

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
                console.log('Error Message', error);
            })
    }

    const updateData = async () =>{
        const allData = { name, email, website};

        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
            method:'PUT',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify(allData)
        });
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.message || 'Failed to Update Data');
        }

        const UPDATEUSER = userData.map((eachUser)=>{
            if(eachUser.id === editId){
                return{...eachUser, ...allData}
            }else{
                return eachUser;
            }
        })

        setUserData(UPDATEUSER);
        setEditId(null);
        setName('');
        setEmail('');
        setWebsite('');

    }

    if(isError?.status){
        return <h4 className="text-center mt-5" style={{color:'red'}}>{isError?.msg}</h4>
    }

    if(loading){
        return <h4 className="text-center mt-5"><img src={Loader} alt={Loader} /></h4>
    }

    return(
        <div className="">
            <Header/>
                <div className="container">
                   
                   <div className="shadow p-3 mt-5 mb-3">
                       <input type="text" className="form-control rounded-0 mb-2" value={name} onChange={(e)=> setName(e.target.value)}/>
                       <input type="email" className="form-control rounded-0 mb-2" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                       <input type="text" className="form-control rounded-0 mb-2" value={website} onChange={(e)=> setWebsite(e.target.value)}/>
                       <button className="btn btn-primary rounded-0" onClick={()=> updateData(editId)}>Update Data</button>
                   </div>

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
                                            <button className="btn btn-info rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                            <NavLink className="btn btn-primary rounded-0" to={`/Usestate134/${id}`}>Details</NavLink>
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

export default Usestate134;
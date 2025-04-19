import React, { useEffect, useState } from 'react';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';
import Loader from '../../../images/Loading-img.gif'
import Usestate1 from '../Usestate1';

const Useeffect8 = () =>{

  const URL="https://jsonplaceholder.typicode.com/users";

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({status:false, msg:''});
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [showForm, setShowForm] = useState(false)

  const fetchApi = async (apiUrl)=>{
    setLoading(true);
    setIsError({status:false, msg:''});
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setUserData(data);
        setLoading(false);
        setIsError({status:false, msg:''});
        if(response.status === 404){
            throw new Error("data not found")
        }
    } catch (error) {
        console.log(error);
        setLoading(false);
        setIsError({status:true, msg: error.message || "something went wrong"});
    }
  }

  const handleDelete = (id) =>{
    const deleteUser = userData.filter((eachUser)=>{
        return eachUser.id !== id
    })
    setUserData(deleteUser)
  }

  const handleEdit = (id, name, email, website) =>{
        setEditId(id);
        setName(name);
        setEmail(email);
        setWebsite(website);
        setShowForm(true);
  }

  const upDateData = () =>{
    const Todos = userData.map((eachUser)=>{
        if(eachUser.id === editId){
            return{...userData, name:name, email:email, website:website}
        }else{
            return eachUser;
        }
    }) 
    setUserData(Todos);
    setEditId(null);
    setName('');
    setEmail('');
    setWebsite('');
    setShowForm(false);
  }

  useEffect(()=>{
     fetchApi(URL);
  },[])

  if(loading){
    return <h3 className='text-center mt-5'><img src={Loader} alt={Loader} /></h3>
  }

  if(isError?.status){
    return <h3 className='text-center mt-5' style={{color:'red'}}>{isError?.msg}</h3>
  }

    return(
        <div>
            <Header/>
              <div className='container'>
                 
                 {showForm && (
                 <div className='shadow p-3'>
                    <input type='text' className='form-control mb-2' id='name' value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type='email' className='form-control mb-2' id='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type='text' className='form-control mb-2' id='website' value={website} onChange={(e)=> setWebsite(e.target.value)} />
                    <input type='submit' className='btn btn-primary mb-2' onClick={()=> upDateData(editId)} />
                 </div>
                 )}

                 <div className='row mt-5'>
                    {
                        userData.map((eachUser)=>{
                            const {id, name, email, website} = eachUser;
                           return(
                            <div key={id} className='col-4 col-xs-12'>
                                <div className='shadow p-3 mb-3'>
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <div className='d-grid gap-0 d-md-flex justify-content-md-end'>
                                        <button className='btn btn-danger rounded-0' onClick={()=> handleDelete(id)}>Delete</button>
                                        <button className='btn btn-info rounded-0' onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
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

export default Useeffect8;
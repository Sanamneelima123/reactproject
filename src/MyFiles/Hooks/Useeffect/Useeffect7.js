import React, { useEffect } from 'react';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';
import { useState } from 'react';
import Loader from '../../../images/Loading-img.gif'

const Useeffect7 = () =>{

 const URL ='https://jsonplaceholder.typicode.com/users';

 const [userData, setUserData] = useState([]);
 const [loading, setLoading] = useState(false);
 const [isError, setIsError] = useState({ status: false, msg: "" });
 const [editId, setEditId] = useState(null);
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [website, setWebsite] = useState('');
 const [showForm, setShowForm] = useState(false);
 const [searching, setSearching] = useState('')

  const fetchApi = async (apiURL) => {
    setLoading(true);
    setIsError({ status: false, msg: "" });
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      setUserData(data);
      setLoading(false);
      setIsError({ status: false, msg: "" });
      if (response.status === 404) {
        throw new Error("API Response 404: Please check API");
    }
    } catch (error) {
        console.error('Error:', error); // Log any error that occurs
        setLoading(false);
        setIsError({ status: true, msg: error.message || 'Something went wrong' });
    }
  };

  const handleSearchChange = (e) => {
    setSearching(e.target.value);
}

const filteredList = userData.filter((item) =>
item.name.toLowerCase().includes(searching.toLowerCase())
);

  const handleDelete = (id) =>{
    const deleteUser = userData.filter((eachData)=>{
        return eachData.id !== id
    })
    setUserData(deleteUser);
  }

  const handleEdit = (id, name, email, website) =>{
    setEditId(id);
    setName(name);
    setEmail(email);
    setWebsite(website);
    setShowForm(true)
  }

  const handleUpdate = () =>{
    const Todos = userData.map((eachData)=>{
        if(eachData.id === editId){
            return{...eachData, name:name, email:email, website:website}
        }else{
            return eachData;
        }
    })
     setUserData(Todos);
     setEditId(null);
     setName('');
     setEmail('');
     setWebsite('');
     setShowForm(false)
  }


 useEffect(()=>{
   fetchApi(URL);
 },[])

 if(loading){
    return <h3 className='text-center mt-5'><img src={Loader} alt={Loader} /></h3>
 }

//  if (isError?.status) {
//     return (
//       <div>
//         <h3 className='text-center mt-5' style={{ color: "red" }}>{isError?.msg}</h3>
//       </div>
//     );
//   }

if(isError?.status){
    return <h3 className='text-center mt-5' style={{color:'red'}}>{isError?.msg}</h3>
}
    return(
        <div>
            <Header/>
                 <div className='container'>
                 <h3>All Issues Resolved</h3>
                    
                    {showForm && (
                    <div className='shadow p-3 mt-5 mb-3'>
                           <input type='text' className='form-control mb-2' id='name' value={name} onChange={(e)=> setName(e.target.value)} />
                           <input type='email' className='form-control mb-2' id='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                           <input type='text' className='form-control mb-2' id='website' value={website} onChange={(e)=> setWebsite(e.target.value)} />
                           <input type='submit' className='btn btn-primary mb-2' onClick={()=> handleUpdate(editId)} />
                    </div>
                    )}

                    <div className='row mt-5 mb-4'>
                        <div className='shadow p-3'>
                            <input type='text' className='form-control' id='searching' placeholder='Searching Cards' value={searching} onChange={handleSearchChange} />
                        </div>
                    </div>

                    <div className='row mt-5'>
                        {
                            filteredList.map((eachUser)=>{
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

export default Useeffect7;
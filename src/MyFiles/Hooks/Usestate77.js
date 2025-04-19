import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Loader from '../../images/Loading-img.gif'
import { Link } from 'react-router-dom';

const Usestate77 = () =>{

 const URL="https://jsonplaceholder.typicode.com/users";

 const [myUser, setMyUser] = useState([]);
 const [loading, setLoading] = useState(false);
 const [iserror, setIsError] = useState({status:false, msg:''});
 const [editId, setEditId] = useState(null);
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [website, setWebsite] = useState('');
 const [showForm, setShowForm] = useState(false)

 const fetchApi = async (apiUrl) => {
    setLoading(true);
    setIsError({status:false, msg:''});
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMyUser(data);
        setLoading(false);
        setIsError({status:false, msg:''});
        if(response.status === 404){
            throw new Error('Data Not Found')
        }
    } catch (error) {
        console.log(error);
        setLoading(false);
        setIsError({status:true, msg: error.message || 'something went wrong'});
    }
}
// https://www.youtube.com/watch?v=8hduGRNblmQ
// const handleDelete = (id) =>{
//     const deleteUser = myUser.filter((eachUser)=>{
//         return eachUser.id !== id
//     })
//     setMyUser(deleteUser);
// }

const handleDelete = async (id) => {
    try {
        // Make a DELETE request to your API to delete the user
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed, such as authorization token
            },
        });

        if (!response.ok) {
            // Handle error response from the API
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete user');
        }
        setMyUser(myUser.filter(eachUser => eachUser.id !== id));
    } catch (error) {
        console.error('Error deleting user:', error.message);
    }
}


// const handleEdit = (id, name, email, website) =>{
//     setEditId(id);
//     setName(name);
//     setEmail(email);
//     setWebsite(website);
//     setShowForm(true)
// }

const handleEdit = (id, name, email, website) => {
    // Update UI state
    setEditId(id);
    setName(name);
    setEmail(email);
    setWebsite(website);
    setShowForm(true);

    // Make API call to update data
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if required
        },
        body: JSON.stringify({ name, email, website }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update data');
        }
        // Handle successful response if needed
    })
    .catch(error => {
        // Handle error
        console.error('Error updating data:', error);
    });
};


// const UpdateData = () =>{
//     const Todos = myUser.map((eachUser)=>{
//         if(eachUser.id === editId){
//             return{...eachUser, name:name, email:email, website:website}
//         }else{
//             return eachUser;
//         }
//     })
//     setMyUser(Todos);
//     setEditId(null);
//     setName('');
//     setEmail('');
//     setWebsite('');
//     setShowForm(false)
// }

const UpdateData = async () => {
    try {
        // Create an object representing the updated user data
        const updatedUserData = {
            name: name,
            email: email,
            website: website
        };

        // Make a PUT or PATCH request to your API to update the user
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`, {
            method: 'PUT', // or 'PATCH' depending on your API's requirements
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed, such as authorization token
            },
            body: JSON.stringify(updatedUserData),
        });

        if (!response.ok) {
            // Handle error response from the API
            const Data = await response.json();
            throw new Error(Data.message || 'Failed to update user');
        }

        // If the request was successful, update your local state or UI as needed
        // For example, update state if you are using React
        const updatedUsers = myUser.map(eachUser => {
            if (eachUser.id === editId) {
                return {...eachUser, ...updatedUserData};
            } else {
                return eachUser;
            }
        });
        setMyUser(updatedUsers);
        setEditId(null);
        setName('');
        setEmail('');
        setWebsite('');
        setShowForm(false);
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error updating user:', error.message);
    }
}

 
 useEffect(()=>{
    fetchApi(URL);
 },[])

 if(loading){
    return <h3 className='text-center mt-5'><img src={Loader} alt={Loader} /></h3>
 }

 if(iserror?.status){
    return <h3 className='text-center mt-5' style={{color:'red'}}>{iserror?.msg}</h3>
  }

    return(
        <div>
            <Header/>
               <div className='container'>
                   <h3 className='mt-3 mb-3'>Usestate77 Component</h3>
                   
                   {showForm && (
                   <div className='shadow p-3 mb-3 mt-3'>
                      <input type='text' className='form-control mb-2' id='name' value={name} onChange={(e)=> setName(e.target.value)} />
                      <input type='email' className='form-control mb-2' id='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                      <input type='text' className='form-control mb-2' id='website' value={website} onChange={(e)=> setWebsite(e.target.value)} />
                      <input type='submit' className='btn btn-primary' onClick={()=> UpdateData(editId)} />
                   </div>
                   )}

                   <div className='row'>
                      {myUser.map((eachUser)=>{
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
                                        <Link to={`/Usestate77/${eachUser.id}`} className='btn btn-primary rounded-0'>Details</Link>
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

export default Usestate77;
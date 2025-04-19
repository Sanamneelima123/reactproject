import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { useNavigate, useParams } from 'react-router-dom';

const User15 = () =>{

 const {userId} = useParams();
 const [myuser, setMyUser] = useState([]);

 const navigate = useNavigate();

 const fetchApi = async (id)=>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setMyUser(data)
    } catch (error) {
         console.log(error);
    }
 }

 useEffect(()=>{
   fetchApi(userId);
 },[userId])

    return(
        <div>
            <Header/>
               <div className='container'>
                    <h3 className='mt-3'>User15 Component</h3>

                     <div className='row'>
                        {myuser ? (
                            <div className='col-12'>
                                <div className='shadow p-3 mb-3 mt-3'>
                                    <p><b>Name:</b> {myuser.name}</p>
                                    <p><b>Email:</b> {myuser.email}</p>
                                    <p><b>Website:</b> {myuser.website}</p>
                                    <p><b>Phone:</b> {myuser.phone}</p>
                                    <p><b>City:</b> {myuser.address?.city}</p>
                                    <button className='btn btn-primary rounded-0' onClick={()=> navigate(`/Usereducer15`)}>Go Back</button>
                                </div>
                            </div>
                        ):(
                            <p>My User Details Loading...</p>
                        )}
                     </div>

               </div>
            <Footer/>
        </div>
    )
}

export default User15;
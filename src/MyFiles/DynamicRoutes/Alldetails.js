import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { useNavigate, useParams } from 'react-router-dom';

const Alldetails = () =>{
  
    const {userId} = useParams();
    const [detals, setDetails] = useState([]);

    const navigate = useNavigate();

    const fetchall = async (id)=>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setDetails(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
       fetchall(userId);
    },[userId])

    return(
        <div>
            <Header/>
                <div className='container'>
                 {detals ? (
                    <div className='shadow p-3 mt-4 mb-4'>
                        <p><b>Name:</b> {detals.name}</p>
                        <p><b>Email:</b> {detals.email}</p>
                        <p><b>Website:</b> {detals.website}</p>
                        <p><b>Phone:</b> {detals.phone}</p>
                        <p><b>Address:</b> {detals.address?.city}</p>
                        <button onClick={()=> navigate('/Usestate77')} className='btn btn-primary justify-contact-end'>Go Back</button>
                    </div>
                 ):(
                    <p>My Details is Loading</p>
                 )}
                </div>
            <Footer/>
        </div>
    )
}

export default Alldetails;
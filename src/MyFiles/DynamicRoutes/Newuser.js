import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

const NewUser = () => {
    const { userId } = useParams();
    const [eachUser, seteachUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDetails(userId);
    }, [userId]);

    const fetchUserDetails = async (id) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            seteachUser(data);
        } catch (error) {
            console.error('Error fetching user details:');
        }
    };

    return (
        <div>
            <Header />
            <div className='container'>
                <h4 className='mt-4 mb-4'>User Details</h4>
                <div className='shadow p-3'>
                {eachUser ? (
                    <div>
                        <p>ID: {eachUser.id}</p>
                        <p>Name: {eachUser.name}</p>
                        <p>Email: {eachUser.email}</p>
                        <p>Website: {eachUser.website}</p>
                        <p>Phone: {eachUser.phone}</p>
                        <p>Address: {eachUser.address.city}</p>
                        <button onClick={()=> navigate('/Usereducer12')} className='btn btn-primary'>Back</button>
                    </div>
                ) : (
                    <p>Loading user details...</p>
                )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default NewUser;

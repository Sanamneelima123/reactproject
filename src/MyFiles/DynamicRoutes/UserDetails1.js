import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { useParams } from 'react-router-dom';

const UserDetails1 = () => {
    const { UserId } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${UserId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const userData = await response.json();
                setUserData(userData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [UserId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Header />
            <div className='container'>
                <h3 className='mt-3 mb-3'>UserDetails1 Component</h3>
                <div className='row'>
                    {userData && (
                        <div className='col-4'>
                            <div className='shadow p-3'>
                                <p>{userData.name}</p>
                                <p>{userData.email}</p>
                                <p>{userData.website}</p>
                                <p>{userData.phone}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserDetails1;

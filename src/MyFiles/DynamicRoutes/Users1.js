import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Link } from 'react-router-dom';

const Users1 = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const userData = await response.json();
                setUsers(userData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

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
                <h3 className='mt-3 mb-3'>Users1 Component</h3>
                <div className='row'>
               
                    {users.map((user) => {
                       const {id, name, email, website} = user;
                       return(
                        <Link to={`/Users1/${user.id}`} key={id} className='col-4 col-xs-12'>
                            <div className='shadow p-3 mb-3'>
                                <p>{name}</p>
                                <p>{email}</p>
                                <p>{website}</p>
                            </div>
                        </Link>
                        )
                    })}


                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Users1;

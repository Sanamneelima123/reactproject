import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { useNavigate, useParams } from 'react-router-dom';

const Use11 = () => {
    const { userId } = useParams();
    const [userDetails, setUserDetails] = useState([]); // Change from [] to null

    const navigate = useNavigate();

    const fetchdata = async (id) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json(); // Await the JSON parsing process
            setUserDetails(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchdata(userId);
    }, [userId]);

    return (
        <div>
            <Header />
            <div className='container'>
                <h4 className='mt-3'>Use11 Details Components</h4>

                <div className='row'>
                    {userDetails ? (
                        <div className='shadow p-3 mt-3 mb-3'>
                            <p>ID: {userDetails.id}</p>
                            <p>Name: {userDetails.name}</p>
                            <p>Email: {userDetails.email}</p>
                            <p>Website: {userDetails.website}</p>
                            <p>Phone: {userDetails.phone}</p>
                            {/* Check if address exists before accessing its properties */}
                            <p>Address: {userDetails?.address?.city}</p>
                            <button className='btn btn-primary rounded-0' onClick={()=> navigate(`/Usestate11`)}>Go Back</button>
                        </div>
                    ) : (
                        <p>Loading user details...</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Use11;

import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../../data';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

const Userdetails = () => {
    const { userId } = useParams(); // Extracting 'id' parameter from the URL

    const userDetails = data.find(eachUser => eachUser.id == userId);


    // Destructure properties from userDetails object
    // const { name, email, phone } = userDetails || {};

    return (
        <div>
            <Header/>
               <div className='container'>
                    <h3 className='mt-3 mb-3'>Userdetails</h3>
                        {userDetails && (
                            <div className=''>
                                <p>{userDetails.name}</p>
                                <p>{userDetails.email}</p>
                                <p>{userDetails.phone}</p>
                            </div>
                        )}
                    </div>
            <Footer/>
        </div>
    );
}

export default Userdetails;

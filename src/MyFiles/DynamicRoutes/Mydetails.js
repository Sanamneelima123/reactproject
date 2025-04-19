import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { useNavigate, useParams } from 'react-router-dom';

const Mydetails = () =>{

    const {userId} = useParams();
    const [myData, setMyData] = useState([]); 

    const navigate = useNavigate();

    const fetchApiData = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`); 
            const data = await response.json();
            setMyData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
       fetchApiData(userId);
    },[userId])

    return(
        <div>
            <Header/>
                <div className='container'>
                    <h3 className='mt-5'>Mydetails Components</h3>

                    <div className='row'>
                        {myData ? (
                            <div className='col-12'>
                                <div className='shadow p-3'>
                                    <p>Name: {myData.name}</p>
                                    <p>Email: {myData.email}</p>
                                    <p>Website: {myData.website}</p>
                                    <p>Phone: {myData.phone}</p>
                                    <p>Address: {myData.address?.city}</p>
                                    <button className='btn btn-primary rounded-0' onClick={()=> navigate(`/Usereducer14`)}>Go Back</button>
                                </div>
                            </div>
                        ):(
                            <p></p>
                        )}
                    </div>

                </div>
            <Footer/>
        </div>
    )
}

export default Mydetails;
import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { useParams } from 'react-router-dom';


const Userdata = () =>{

 const {userId} = useParams();
 const [myData, setMyData] = useState('');

 const fetchData = async (id)=>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setMyData(data);
    } catch (error) {
        console.log(error);
    }
 }

 useEffect(()=>{
    fetchData(userId)
 },[userId])

    return(
        <div>
            <Header/>
                <div className='container'>
                   <h3>Userdata Component</h3>

                    {myData ? (
                       <div>
                          <p>{myData.name}</p>
                          <p>{myData.email}</p>
                          <p>{myData.website}</p>
                          <p>{myData.phone}</p>
                          <p>{myData.address.city}</p>
                       </div>
                    ):(
                        <p>loading my details</p>
                    )}

                </div>
            <Footer/>
        </div>
    )
}

export default Userdata;
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useParams } from "react-router-dom";

const Use128 = () => {

const {userId} = useParams();
const [myData, setMyData] = useState([]);

const fetchApi = async (id) =>{
    try {
         const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
         const data = await response.json();
         setMyData(data);
    } catch (error) {
         console.log(error);
    }
 }

useEffect(()=>{
   fetchApi(userId)
},[userId])

    return(
        <div>
            <Header/>
               <div className="container">
                   <h3>Use128 User All Details</h3>

                   <div className="row">
                     {myData ? (

                        <div className="col-6 col-xs-12">
                            <h5>Name {myData.name}</h5>
                            <h5>Email {myData.email}</h5>
                            <h5>Website {myData.website}</h5>
                            <h5>phone {myData.phone}</h5>
                            <h5>City {myData?.address?.city}</h5>
                        </div>
                     ):(
                        <p>Use128 All Data is Loading...</p>
                     )}
                   </div>

               </div>
            <Footer/>
        </div>
    )
}

export default Use128;
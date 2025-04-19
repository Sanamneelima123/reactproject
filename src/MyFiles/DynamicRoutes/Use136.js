import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useParams } from "react-router-dom";

const Use136 = () => {

 const {userId} = useParams();
 const [details, setDetails] = useState([]);

 const fetchApi = async (details)=>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${details}`);
        const data = await response.json();
        setDetails(data);
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
                   <h3 className="mt-3 mb-3">Use136 all Details Component</h3>

                   <div className="row">
                      {details ? (
                        <div className="col-12 col-xs-12">
                           <div className="shadow p-3 mb-2 ">
                               <h4 className="mt-3 mb-3" style={{color:'#0070ad'}}>User All Details</h4><hr/>
                               <p><b>Name</b> {details.name}</p>
                               <p><b>Email</b> {details.email}</p>
                               <p><b>Website</b> {details.website}</p>
                               <p><b>Phone</b> {details.phone}</p>
                               <p><b>Address</b> {details?.address?.city}</p>
                           </div>
                        </div>
                      ):(
                        <p>Use136 All Details Loading...</p>
                      )}
                   </div>

               </div>
            <Footer/>
        </div>
    )
}

export default Use136;
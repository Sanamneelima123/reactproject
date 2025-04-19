import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
// import Details from "../../images/details.png"
import Barchart1 from "../Hooks/Chats/Barchart1";

const User16 = () =>{

 const {userId} = useParams();

 const [fullDetails, setFullDetails] = useState([]);

 const navigate = useNavigate();

 const fetchApi = async (id)=>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setFullDetails(data);
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
                    <div className="row shadow p-3 mt-5 mb-4">
                      
                        <div className="col-6">
                        {fullDetails ? (
                                <div className="col-12">
                                   <div className="p-5">
                                      <h1>All User Details</h1>
                                      <hr></hr>
                                      <p><b>Name:</b> {fullDetails.name}</p>
                                      <p><b>Email:</b> {fullDetails.email}</p>
                                      <p><b>Website:</b> {fullDetails.website}</p>
                                      <p><b>Phone:</b> {fullDetails.phone}</p>
                                      <p><b>Address:</b> {fullDetails.address? fullDetails.address.city : "N/A"}</p>
                                      <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usereducer16`)}>Go Back</button>
                                   </div>
                                </div>
                        ):(
                            <p>User Full Detail Loading...</p>
                        )}
                        </div>
                        <div className="col-5 text-center">
                          {/* <img src={Details} alt={Details} width={350} /> */}
                          <Barchart1/>
                        </div>
                    </div>
                 </div>
            <Footer/>
        </div>
    )
}

export default User16;
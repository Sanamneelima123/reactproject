import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const Use129 = () =>{

 const {userId} = useParams();
 const [userDetails, setUserDetails] = useState([]);

 const navigate = useNavigate();

 const fetchData = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setUserDetails(data)
    } catch (error) {
        console.log(error)
    }
 }

useEffect(()=>{
   fetchData(userId);
},[userId])

    return(
        <div>
            <Header />
               <div className="container">
                  <h4 className="mt-4 mb-3" style={{color:"#0070ad"}}>Use129 User All Details</h4>

                  <div className="row shadow p-3">
                    <div className="col-12">
                        <div className="row"> {/* Add a new row here */}
                            <div className="col-6">
                                {userDetails ? (
                                    <div className="p-5">
                                        <p><b>Name: </b>{userDetails.name}</p>
                                        <p><b>Username: </b>{userDetails.username}</p>
                                        <p><b>Email: </b>{userDetails.email}</p>
                                        <p><b>Phone: </b>{userDetails.phone}</p>
                                        <p><b>Website: </b>{userDetails.website}</p>
                                    </div>
                                ) : (
                                    <p>User Details are loading...</p>
                                )}
                            </div>

                            <div className="col-6">
                                <Linechart />
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-0 d-md-flex justify-content-md-end mt-4">
                       <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate129`)}>Go Back</button>
                    </div>
                </div>

               


               </div>
            <Footer/>
        </div>
    )
}

export default Use129;
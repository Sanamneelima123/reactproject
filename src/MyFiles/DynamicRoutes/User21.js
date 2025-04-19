import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const User21 = () =>{

 const {userId} = useParams();
 const [vendorUser, setVendorUser] = useState([]);

 const navigate = useNavigate();

 const fetchApiData = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setVendorUser(data);
    } catch (error) {
        console.log('Error All Details Vendor', error);
    }
 }

 useEffect(()=>{
     fetchApiData(userId)
 },[userId])

    return(
        <div>
            <Header/>
               <div className="container">
                  

                  <div className="row shadow p-3 mt-4 mb-3">
                    <div className="col-6 col-xs-12">
                    {vendorUser ? (
                        <div className="">
                            <h3>User21 Component</h3><hr/>
                            <p><b>Name :</b>{vendorUser.name}</p>
                            <p><b>Email :</b>{vendorUser.email}</p>
                            <p><b>Website :</b>{vendorUser.website}</p>
                            <p><b>Phone :</b>{vendorUser.phone}</p>
                            <p><b>City :</b>{vendorUser?.address?.city}</p>
                            <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usereducer21`)}>Go Back</button>
                        </div>
                    ):(
                        <p>User All Details Loading...</p>
                    )}
                    </div>
                    <div className="col-6 col-xs-12">
                        <Linechart/>
                    </div>
                  </div>

               </div>
            <Footer/>
        </div>
    )
}

export default User21;
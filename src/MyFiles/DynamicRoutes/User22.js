import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const User22 = () =>{

    const {userId} = useParams();
    const [vendorData, setVendorData] = useState([]);

    const navigate = useNavigate();

    const fetchApiData = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setVendorData(data);
        } catch (error) {
            console.log('Vendor All Details', error)
        }
    }

    useEffect(()=>{
       fetchApiData(userId)
    },[userId])

    return(
        <div>
            <Header/>
                <div className="container">
                   

                   <div className="row shadow p-3 mt-5">
                     <div className="col-6 col-xs-12">
                      {vendorData ? (
                        <div className="col-12 col-xs-12">
                            <h3>User22 Component</h3><hr/>
                            <p><b>Name :</b> {vendorData.name}</p>
                            <p><b>Email :</b> {vendorData.email}</p>
                            <p><b>Website :</b> {vendorData.website}</p>
                            <p><b>Phone :</b> {vendorData.phone}</p>
                            <p><b>City :</b> {vendorData?.address?.city}</p>
                            <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usereducer22`)}>Go Back</button>
                        </div>
                      ):(
                        <p>User22 All Details Loading...</p>
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

export default User22;
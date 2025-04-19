import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const Use101 = () =>{

 const {userId} = useParams();
 const [myVendor, setMyVendor] = useState([]);

 const navigate = useNavigate();

 const fetchApiData = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setMyVendor(data);
    } catch (error) {
        console.log('Error Message', error)
    }
 }

 useEffect(()=>{
    fetchApiData(userId)
 },[userId])

    return(
        <div>
            <Header/>
              <div className="container">
                 

                <div className="row mt-4 mb-4 shadow p-3">
                    <div className="col-6 col-xs-12">
                    {myVendor ? (
                        <div className="">
                             <h3 className="mt-4 mb-3">Use101 Component</h3><hr />
                            <p><b>Name :</b> {myVendor.name}</p>
                            <p><b>Email :</b> {myVendor.email}</p>
                            <p><b>Website :</b> {myVendor.website}</p>
                            <p><b>Phone :</b> {myVendor.phone}</p>
                            <p><b>Website :</b> {myVendor.website}</p>
                            <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate101`)}>Go Back</button>
                        </div>
                    ):(
                        <p>Use101 All Vendor Details Loading</p>
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

export default Use101;
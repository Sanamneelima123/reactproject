import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const Use100 = () =>{

 const {userId} = useParams();
 const [userData, setUserData] = useState([]);

 const navigate = useNavigate();

 const fetchApiData = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setUserData(data);
    } catch (error) {
        console.log('Error Message All Data', error)
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
                    {userData ? (
                        <div className="col-12 col-xs-12">
                            <h3>Use100 Component</h3><hr/>
                            <p><b>Name :</b> {userData.name}</p>
                            <p><b>Email :</b> {userData.email}</p>
                            <p><b>Website :</b> {userData.website}</p>
                            <p><b>Phone :</b> {userData.phone}</p>
                            <p><b>City :</b> {userData?.address?.city}</p>
                            <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate100`)}>Go Back</button>
                        </div>
                    ):(
                        <p>All User Details Loading...</p>
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

export default Use100;
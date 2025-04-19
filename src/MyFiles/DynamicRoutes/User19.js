import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const User19 = () =>{

 const {userId} = useParams();
 const [myAdmin, setMyAdmin] = useState([]);

 const navigate = useNavigate();

 const fetchApiData = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setMyAdmin(data)
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
                 

                <div className="row shadow p-3 mt-4 mb-4">
                    <div className="col-6 col-xs-12">
                    {myAdmin ? (
                        <div className="col-12 col-xs-12">
                             <h3 className="mt-3 mb-3">User19 Component</h3><hr/>
                            <p><b>Name :</b> {myAdmin.name}</p>
                            <p><b>Email :</b> {myAdmin.email}</p>
                            <p><b>Website :</b> {myAdmin.website}</p>
                            <p><b>Phone :</b> {myAdmin.phone}</p>
                            <p><b>Website :</b> {myAdmin.website}</p>
                            <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usereducer19`)}>Go Back</button>
                        </div>
                    ):(
                        <p>User19 All Details Loading...</p>
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

export default User19;
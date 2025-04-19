import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const User23 = () =>{

 const {userId} = useParams();
 const [adminData, setAdminData] = useState([]);

 const navigate = useNavigate();

 const fetchApiData = async (id) =>{
    try {
        const responsive = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await responsive.json();
        setAdminData(data)
    } catch (error) {
        console.log('Error Message All Details', error)
    }
 }

 useEffect(()=>{
     fetchApiData(userId)
 },[userId])

    return(
        <div>
            <Header/>
               <div className="container">
                  
                 <div className="row shadow p-3 mt-5 mb-4">
                    <div className="col-6 col-xs-12">
                        {adminData ? (
                            <div className="col-12 col-xs-12">
                                <h3>User23 Component</h3><hr/>
                                <p><b>Name :</b> {adminData.name}</p>
                                <p><b>Email :</b> {adminData.email}</p>
                                <p><b>Website :</b> {adminData.website}</p>
                                <p><b>Phone :</b> {adminData.phone}</p>
                                <p><b>Website :</b> {adminData.website}</p>
                                <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usereducer23`)}>Go Back</button>
                            </div>
                        ):(
                            <p>User23 All Deatils Loading...</p>
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

export default User23;
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Horizontalbar from "../Hooks/Chats/Horizontalbar";

const User18 = () =>{

 const {userId} = useParams();
 const [myEmp, setMyEmp] = useState([]);

 const navigate = useNavigate();

 const fetchApData = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setMyEmp(data);
    } catch (error) {
        console.log('Error Message', error)
    }
 }

 useEffect(()=>{
    fetchApData(userId)
 },[userId])

    return(
        <div>
            <Header/>
               <div className="container">
                 

                 <div className="row shadow p-3 mt-5 mb-4">
                    <div className="col-6 col-xs-12">
                    {myEmp ? (
                        <div>
                             <h3>User18 Component</h3><hr/>
                            <p><b>Name :</b> {myEmp.name}</p>
                            <p><b>Email :</b> {myEmp.email}</p>
                            <p><b>Website :</b> {myEmp.website}</p>
                            <p><b>Phone :</b> {myEmp.phone}</p>
                            <p><b>City :</b> {myEmp?.address?.city}</p>
                            <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usereducer18`)}>Go Back</button>
                        </div>
                    ):(
                        <p>User18 All Data Details Loading...</p>
                    )}
                    </div>
                    <div className="col-6 col-xs-12">
                        <Horizontalbar/>
                    </div>
                 </div>

               </div>
            <Footer/>
        </div>
    )
}

export default User18;
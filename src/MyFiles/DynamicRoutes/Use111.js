import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const Use111 = () =>{

 const {userId} = useParams();
 const [manager, setManager] = useState([]);

 const navigate = useNavigate();

 const fetchApiData = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setManager(data)
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
                 

                <div className="row shadow p-3 mt-4 mb-3">
                    <div className="col-6 col-xs-12">
                        {manager ? (
                            <div className="col-12 col-xs-12">
                                <h3>Use111 Components</h3><hr/>
                                <p><b>Name :</b> {manager.name}</p>
                                <p><b>Email :</b> {manager.email}</p>
                                <p><b>Website :</b> {manager.website}</p>
                                <p><b>Phone :</b> {manager.phone}</p>
                                <p><b>City :</b> {manager?.address?.city}</p>
                                <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate111`)}>Go Back</button>
                            </div>
                        ):(
                            <p>All Use111 Details Loading...</p>
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

export default Use111;
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const Use116 = () =>{

   const {userId} = useParams();
   const [newData, setNewData] = useState([]);
   const navigate = useNavigate();

   const fetchApi = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setNewData(data)
    } catch (error) {
        console.log(error)
    }
   }

   useEffect(()=>{
     fetchApi(userId)
   },[userId])

    return(
        <div>
            <Header/>
               <div className="container">
                  

                  <div className="row shadow p-3 mt-4">
                    <div className="col-6 col-xs-12">
                    {newData ? (
                        <div className="col-12 col-xs-12">
                            <h3 className="mt-4 mb-3">Use116 Component</h3><hr/>
                             <p><b>Name :</b> {newData.name}</p>
                             <p><b>Email :</b> {newData.email}</p>
                             <p><b>Website :</b> {newData.website}</p>
                             <p><b>Phone :</b> {newData.phone}</p>
                             <p><b>City :</b> {newData?.address?.city}</p>
                             <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate116`)}>Go Back</button>
                        </div>
                    ):(
                        <p>Use116 All Data Loading...</p>
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

export default Use116;
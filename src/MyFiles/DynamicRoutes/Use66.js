import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";

const Use66 = () =>{

   const {userId} = useParams();
   const [userData, setUserData] = useState([]);

   const navigate = useNavigate()
    
   const fetchApi = async (id)=>{
      try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
          const data = await response.json();
          setUserData(data)
      } catch (error) {
           console.log(error);
      }
   }
  
   useEffect(()=>{
     fetchApi(userId);
   },[userId])


    return(
        <div>
            <Header/>
               <div className="container">
                     <div className="row">
                        {userData ? (
                            <div className="col-12">
                                <div className="shadow p-3 mt-4 mb-4">
                                    <p><b>ID:</b> {userData.id}</p>
                                    <p><b>Title:</b> {userData.title}</p>
                                    <p><b>Url:</b> {userData.url}</p>
                                    <p><b>thumbnailUrl:</b> {userData.thumbnailUrl}</p>
                                    <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate66`)}>Go Back</button>
                                </div>
                            </div>
                        ): (
                            <p>UserPhotos Data is Loading...</p>
                        )}
                     </div>
               </div>
            <Footer/>
        </div>
    )
}

export default Use66;
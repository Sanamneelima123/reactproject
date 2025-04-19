import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Horizontalbar from "../Hooks/Chats/Horizontalbar";

const Use104 = () =>{

  const {userId} = useParams();
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const fetchApiData = async (id) =>{
    try {
      const responsive = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const data = await responsive.json();
      setData(data);
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

                   <div className="row shadow p-5 mb-4 mt-4">
                    <div className="col-6 col-xs-12">
                      <h3>Use104 ALL Details </h3><hr/>
                     {data ? (
                      <div className="col-12 col-xs-12">
                         <p><b>Name: </b>{data.name}</p>
                         <p><b>Email: </b>{data.email}</p>
                         <p><b>Website: </b>{data.website}</p>
                         <p><b>Phone: </b>{data.phone}</p>
                         <p><b>City: </b>{data?.address?.city}</p>
                         <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate104`)}>Go Back</button>
                         <button className="btn btn-info rounded-0" onClick={()=> navigate(`/Usepost104`)}>Usepost104</button>
                      </div>
                     ):(
                      <p>Use104 Show All Details Loading...</p>
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

export default Use104;
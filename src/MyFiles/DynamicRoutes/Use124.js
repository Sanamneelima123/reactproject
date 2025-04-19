import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const Use124 = () =>{

    const [allData, setAllData] = useState([]);
    const {userId} = useParams();

    const navigate = useNavigate();

    const fetchApi = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setAllData(data);
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
                    {allData ? (
                        <div className="">
                            <h3 className="mt-3 mb-3">Use124 Component</h3><hr/>
                            <p><b>Name :</b> {allData.name}</p>
                            <p><b>Email :</b> {allData.email}</p>
                            <p><b>Website :</b> {allData.website}</p>
                            <p><b>Phone :</b> {allData.phone}</p>
                            <p><b>City :</b> {allData?.address?.city}</p>
                            <button className="btn btn-primary" onClick={()=> navigate(`/Usestate124`)}>Go Back</button>
                        </div>
                    ):(
                        <p>All Details is Loading...</p>
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

export default Use124;
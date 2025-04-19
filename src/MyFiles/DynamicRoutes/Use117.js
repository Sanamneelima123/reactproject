import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Barchart1 from "../Hooks/Chats/Barchart1";

const Use117 = () =>{

    const {userId} = useParams();
    const [myData, setMyData] = useState([]);

    const navigate = useNavigate();

    const fetchApi = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setMyData(data)
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
                    

                    <div className="row shadow p-3 mt-4 mb-3">
                        <div className="col-6 col-xs-12">
                        {myData ? (
                            <div className="col-12 col-xs-12 p-5">
                                <div>
                                    <h3>Use117 Component</h3><hr/>
                                    <p><b>Name :</b> {myData.name}</p>
                                    <p><b>Email :</b> {myData.email}</p>
                                    <p><b>Website :</b> {myData.website}</p>
                                    <p><b>Phone :</b> {myData.phone}</p>
                                    <p><b>City :</b> {myData?.address?.city}</p>
                                    <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate117`)}>Go Back</button>
                                </div>
                            </div>
                        ):(
                            <p>Use117 All Data is Loading...</p>
                        )}
                        </div>
                        <div className="col-6 col-xs-12">
                            <Barchart1/>
                        </div>
                    </div>

                 </div>
            <Footer/>
        </div>
    )
}

export default Use117;
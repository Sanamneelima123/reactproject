import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const User17 = () =>{

    const {userId} = useParams();
    const [userData, setUserData] = useState([]);

    const navigate = useNavigate();

    const fecthApiData = async (id)=>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fecthApiData(userId);
    },[userId])

    return(
        <div>
            <Header/>
                <div className="container">
                    <div className="row shadow p-3 mb-3 mt-5">
                        <div className="col-6 col-xs-12">
                    {
                        userData ? (
                            <div className="col-12 col-xs-12">
                                <div className="">
                                    <h2>USER Full Details</h2><hr/>
                                    <p><b>Name:</b> {userData.name}</p>
                                    <p><b>Email:</b> {userData.email}</p>
                                    <p><b>Website:</b> {userData.website}</p>
                                    <p><b>Phone: </b> {userData.phone}</p>
                                    <p><b>Address:</b> {userData?.address?.city}</p>
                                    <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usereducer17`)}>Go Back</button>
                                </div>
                            </div>
                        ):(
                            <p>User Details Loading...</p>
                        )
                    }
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

export default User17;
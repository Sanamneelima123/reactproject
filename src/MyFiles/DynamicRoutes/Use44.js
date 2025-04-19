import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Barchart1 from "../Hooks/Chats/Barchart1";

const Use44 = () =>{

  const {userId} = useParams();
  const [mydata, setMyData] = useState([]);

  const navigate = useNavigate();

  const fetchApi = async (id)=>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setMyData(data);
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

                    <div className="row shadow p-3 mt-5 mb-5">
                        <div className="col-7 col-xs-12">
                        {mydata ? (
                            <div className="col-12 col-xs-12">
                                <h3 className="mt-3 mb-3" style={{color:'green'}}>User All Details</h3><hr/>
                                <div className="">
                                    <p><b>Name:</b> {mydata.name}</p>
                                    <p><b>Email:</b> {mydata.email}</p>
                                    <p><b>Website:</b> {mydata.website}</p>
                                    <p><b>Phone:</b> {mydata.phone}</p>
                                    <p><b>City:</b> {mydata?.address?.city}</p>
                                    <div>
                                        <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate44`)}>Go Back</button>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <p>Use44 All User Details Loading...</p>
                        )}
                        </div>
                        <div className="col-5 col-xs-12">
                           <Barchart1 style={{width:'250px'}}/>
                        </div>
                    </div>

                 </div>
            <Footer/>
        </div>
    )
}

export default Use44;
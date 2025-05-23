import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const User123 = () => {

    const {userId} = useParams();
    const [myData, setMyData] = useState([]);

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
        fetchApi(userId)
    },[userId])

    return (
        <div>
            <Header/>
                 <div className="container">
                    

                   <div className="row mt-3 mb-3 shadow p-3">
                   <div className="col-6 col-xs-12">
                      {myData ? (
                        <div className="col-xs-12">
                            <h3 className="mt-3 mb-3" style={{color:'blue'}}>User123 Component</h3><hr/>
                            <p><b>Name :</b> {myData.name}</p>
                            <p><b>Email :</b> {myData.email}</p>
                            <p><b>Website :</b> {myData.website}</p>
                            <p><b>Phone :</b> {myData.phone}</p>
                            <p><b>City :</b> {myData?.address?.city}</p>
                            <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate123`)}>Go Back</button>
                        </div>
                      ):(
                        <p>User123 All Data is Loading...</p>
                      )}
                      </div>
                      <div className="col-6 col-xs-12">
                        <Linechart/>
                      </div>
                   </div>

                 </div>
            <Footer/>
        </div>
    );
};

export default User123;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Linechart from "./Chats/Linechart";

const User133 = () => {

    const {userId} = useParams();
    const [myData, setMyData] = useState([]);

    const navigate = useNavigate();

    const fetchApi = async (id) =>{
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

    return(
        <div>
            <Header/>
            <div className="container">
            <h3 className="mt-4">User133 Component</h3>
            
            <div className="row">
                <div className="shadow p-3 w-100">
                    <div className="row">
                    <div className="col-md-6 p-5">
                        {myData ? (
                        <div>
                            <h4><b>Name:</b> {myData.name}</h4>
                            <p><b>Email:</b> {myData.email}</p>
                            <p><b>Website:</b> {myData.website}</p>
                            <p><b>Phone:</b> {myData.phone}</p>
                            <p><b>Address:</b> {myData?.address?.street}</p>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                               <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/usestate133`)}>Go To Back</button>
                            </div>
                        </div>
                        ) : (
                        <p>myData is loading...</p>
                        )}
                    </div>
                    <div className="col-md-6">
                        <Linechart />
                    </div>
                    </div>
                </div>
                </div>

            </div>
          <Footer/>
        </div>
    )
}

export default User133;
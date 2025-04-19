import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const User131 = () => {

    const {userId} = useParams();
    const [myData, setMyData] = useState([]);

    const Navigation = useNavigate();

    const fetchApi = async (getDetails) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${getDetails}`);
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
                   <h3 className="mt-3 mb-3">User131 Component</h3>

                   <div className="row shadow p-3">
                    <div className="col-6 col-xs-12">
                      {myData ? (
                        <div className="col-12 col-xs-12">
                            <p><b>Name :</b> {myData.name}</p>
                            <p><b>Email :</b> {myData.email}</p>
                            <p><b>Website :</b> {myData.website}</p>
                            <p><b>Phone :</b> {myData.phone}</p>
                            <p><b>Address :</b> {myData?.address?.city}</p>
                            <button className="btn btn-primary rounded-0" onClick={()=> Navigation(`/usestate131`)}>Go Back</button>
                        </div>
                      ):(
                        <p>Loading User131 Data....</p>
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

export default User131;
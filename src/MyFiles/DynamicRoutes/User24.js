import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const User24 = () =>{

    const {userId} = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchApi = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setData(data);
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

                  <div className="row shadow mt-5 p-3 mb-2">
                    <div className="col-6 col-xs-12">
                    {data ? (
                        <div className="col-12 col-xs-12">
                            <div className="">
                            <h3 className="mt-4 mb-3">User24 Component</h3><hr/>
                                <p><b>Name :</b> {data.name}</p>
                                <p><b>Email :</b> {data.email}</p>
                                <p><b>Website :</b> {data.website}</p>
                                <p><b>Phone :</b> {data.phone}</p>
                                <p><b>City :</b> {data?.address?.city}</p>
                                <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usereducer24`)}>Go Back</button>
                            </div>
                        </div>
                    ):(
                        <p>User24 All Data is Loading...</p>
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

export default User24;
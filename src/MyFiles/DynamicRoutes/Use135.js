import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const Use135 = () => {

    const {userId} = useParams();
    const Navigate = useNavigate();

    const [myData, setMyData] = useState([]);

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
        fetchApi(userId);
    },[userId])

    return(
        <div>
            <Header/>
                <div className="container">
                    <h3 className="mt-3 mb-3">Use135 Component</h3>

                    <div className="row shadow p-3 mb-2">
                        <div className="col-6">
                        {myData ? (
                            <div className="col-12 col-xs-12">
                                <div className="">
                                    <p><b>Name:</b> {myData.name}</p>
                                    <p><b>Email:</b> {myData.email}</p>
                                    <p><b>Website:</b> {myData.website}</p>
                                    <p><b>Phone:</b> {myData.phone}</p>
                                    <p><b>Address:</b> {myData?.address?.city}</p>
                                </div>
                            </div>
                        ):(
                            <p>My User Data is Loading...</p>
                        )}
                    </div>
                    <div className="col-6">
                        <Linechart/>
                        <div class="d-grid gap-0 d-md-flex justify-content-md-end">
                             <button class="btn btn-primary mb-2 rounded-0" onClick={()=> Navigate(`/useState135`)}>Go Back</button>
                        </div>
                    </div>
                    </div>
                   
                </div>

            <Footer/>
        </div>
    )
}

export default Use135;
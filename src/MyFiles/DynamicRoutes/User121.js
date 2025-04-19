import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const User121 = () => {

    const {userId} = useParams();
    const [vendor1, setVendor1] = useState([]);

    const navigate = useNavigate();

    const fetchApis = async (id) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setVendor1(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchApis(userId)
    },[userId])

    return (
        <div>
            <Header/>
                <div className="container">
                    

                    <div className="row shadow p-3 mt-4">
                        <div className="col-6">
                        {vendor1 ? (
                            <div className="col-12">
                                <h3 style={{color:'#12abdb'}}>User121 Component</h3><hr/>
                                <p><b>Name: </b>{vendor1.name}</p>
                                <p><b>Email: </b>{vendor1.email}</p>
                                <p><b>Website: </b>{vendor1.website}</p>
                                <p><b>Phone: </b>{vendor1.phone}</p>
                                <p><b>City: </b>{vendor1?.address?.city}</p>
                                <button className="btn btn-success rounded-0" onClick={()=> navigate(`/Usestate121`)}>Go Back</button>
                            </div>
                        ):(
                            <p>User121 All Data Loading...</p>
                        )}
                        </div>
                        <div className="col-6">
                            <Linechart/>
                        </div>
                    </div>

                </div>
            <Footer/>
        </div>
    )
};

export default User121;
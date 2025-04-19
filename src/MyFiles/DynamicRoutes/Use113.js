import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const Use113 = () =>{

    const {userId} = useParams();
    const [vendor, setVendor] = useState('');
    const navigate = useNavigate();

    const fetchApiData = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setVendor(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
       fetchApiData(userId)
    },[userId])

    return(
        <div>
            <Header/>
              <div className="container">
                

                 <div className="row shadow p-3 mt-3 mb-3">
                    <div className="col-6 col-xs-12">
                        {vendor ? (
                            <div className="col-12 col-xs-12">
                                <div className="">
                                <h3 className="mt-4 mb-3">Use113 Component</h3><hr/>
                                    <p><b>Name :</b> {vendor.name}</p>
                                    <p><b>Email :</b> {vendor.email}</p>
                                    <p><b>Website :</b> {vendor.website}</p>
                                    <p><b>Phone :</b> {vendor.phone}</p>
                                    <p><b>City :</b> {vendor?.address?.city}</p>
                                    <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate113`)}>Go Back</button>
                                </div>
                            </div>
                        ):(
                            <p>All Use113 Data is Loading...</p>
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

export default Use113;
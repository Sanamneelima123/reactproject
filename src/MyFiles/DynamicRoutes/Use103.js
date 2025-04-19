import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Horizontalbar from "../Hooks/Chats/Horizontalbar";

const Use103 = () =>{
    const {userId} = useParams();
    const [employee, setEmployee] = useState([]); // Change from [] to {}

    const navigate = useNavigate();

    const fetchApiData = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setEmployee(data);
        } catch (error) {
            console.log('Error Message', error)
        }
    }

    useEffect(()=>{
        fetchApiData(userId)
    },[userId])

    return(
        <div>
            <Header/>
            <div className="container">
                

                <div className="row shadow p-3 mt-4 mb-4">
                    <div className="col-6 col-xs-12">
                    {employee ? (
                        <div className="col-12 col-xs-12">
                            <h3 className="mt-3 mb-3" style={{color:'#0070ad'}}>Use103 Component</h3><hr/>
                            <p><b>Name :</b> {employee.name}</p>
                            <p><b>Email :</b> {employee.email}</p>
                            <p><b>Website :</b> {employee.website}</p>
                            <p><b>Phone :</b> {employee.phone}</p>
                            <p><b>City :</b> {employee?.address?.city}</p>
                            <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                               <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate103`)}>Go Back</button>
                            </div>
                        </div>
                    ):(
                        <p>Use103 All Details Loading...</p>
                    )}
                    </div>
                    <div className="col-6 col-xs-12">
                        <Horizontalbar/>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default Use103;

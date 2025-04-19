import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Horizontalbar from "../Hooks/Chats/Horizontalbar";

const Use102 = () =>{

 const {userId} = useParams();
 const [student1, setStudent1] = useState([]);

 const navigate = useNavigate();

 const fetchApiData = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setStudent1(data);
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
                    {student1 ? (
                        <div className="col-12 col-xs-12">
                            <div className="">
                                <h3>Use102 Component</h3><hr/>
                                <p><b>Name :</b> {student1.name}</p>
                                <p><b>Email :</b> {student1.email}</p>
                                <p><b>Website :</b> {student1.website}</p>
                                <p><b>Phone :</b> {student1.phone}</p>
                                <p><b>City :</b> {student1?.address?.city}</p>
                                <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate102`)}>Go Back</button>
                            </div>
                        </div>
                    ):(
                        <p>Use102 User All Data Loading...</p>
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

export default Use102;
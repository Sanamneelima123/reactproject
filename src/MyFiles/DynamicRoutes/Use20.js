import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import {useParams, useNavigate} from "react-router-dom"

const Use20 = () =>{

 const {userId} = useParams();
 const [mydata, setMyData] = useState([]);

 const navigate = useNavigate();

 const fetchApiData = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setMyData(data);
    } catch (error) {
        console.log(error);
    }
 }

 useEffect(()=>{
    fetchApiData(userId)
 },[userId])

    return(
        <div>
            <Header/>
              <div className="container">
                 <h3 className="mt-3">Use20 Component</h3>

                <div className="row shadow p-3 mt-5 mb-3">
                    {mydata ? (
                            <div className="col-12 col-xs-12">
                                <div className="">
                                   <p><b>Name: </b>{mydata.name}</p>
                                    <p><b>Email: </b>{mydata.email}</p>
                                    <p><b>website: </b>{mydata.website}</p>
                                    <p><b>Phone: </b>{mydata.phone}</p>
                                    <p><b>City: </b>{mydata?.address?.city}</p>
                                    <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate20`)}>Go Back</button>
                                </div>
                            </div>
                    ):(
                        <p>Use20 All Details Loading...</p>
                    )}
                </div>

              </div>
            <Footer/>
        </div>
    )
}

export default Use20;
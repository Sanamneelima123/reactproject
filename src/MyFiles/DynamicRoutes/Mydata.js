import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";

const Mydata = () =>{

 const {userId} = useParams();
 const [mydata, setMyData] = useState([]);
 const navigate = useNavigate();

 const fetchApiData = async (id)=>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setMyData(data);
    } catch (error) {
        console.log(error);
    }
 }

 useEffect(()=>{
   fetchApiData(userId);
 },[userId])

    return(
        <div>
            <Header/>
                <div className="container">
                       <div className="row">
                          {mydata ? (
                            <div className="col-12 col-xs-12 mt-5">
                                <div className="shadow p-3 mb-3">
                                    <p>{mydata.name}</p>
                                    <p>{mydata.email}</p>
                                    <p>{mydata.website}</p>
                                    <p>{mydata.phone}</p>
                                    <p>{mydata.address?.city}</p>
                                    <button className="btn btn-primary" onClick={()=> navigate('/Usereducer10')}>Go Back</button>
                                </div>
                            </div>
                          ):(
                            <p>Loading My Data</p>
                          )}
                       </div>
                </div>
            <Footer/>
        </div>
    )
}

export default Mydata;
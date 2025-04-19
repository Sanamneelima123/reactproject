import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Charts from '../../MyFiles/Hooks/Chats/Charts'

const Use55 = () =>{

  const {userId} = useParams();
  const [allDetails, setAllDetails] = useState([]);

  const navigate = useNavigate();

  const fetchApi = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setAllDetails(data);
    } catch (error) {
        console.log('errro message', error);
    }
  }

  useEffect(()=>{
     fetchApi(userId);
  },[userId])

    return(
        <div>
            <Header/>
                <div className="container">
                    

                    <div className="row shadow p-3 mb-3 mt-5">
                        <div className="col-6 col-xs-12">
                        {allDetails ? (
                            <div className="col-12 col-xs-12">
                                <h3 className="mt-3 mb-4" style={{color:'#0070ad;'}}>Use55 Component</h3><hr/>
                                <div className="">
                                    <p><b>Name:</b> {allDetails.name}</p>
                                    <p><b>Email:</b> {allDetails.email}</p>
                                    <p><b>Website:</b> {allDetails.website}</p>
                                    <p><b>Phone:</b> {allDetails.phone}</p>
                                    <p><b>Address:</b> {allDetails?.address?.city}</p>
                                    <div>
                                        <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate55`)}>Go Back</button>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <p>Show All My User Details</p>
                        )}
                        </div>
                        <div className="col-6 col-xs-12">
                          <Charts/>
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
    )
}

export default Use55;
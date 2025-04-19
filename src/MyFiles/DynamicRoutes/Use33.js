import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { useParams, useNavigate } from "react-router-dom";

const Use33 = () =>{

  const {userId} = useParams();
  const [myUser, setMyUser] = useState([]);

  const navigate = useNavigate();

  const fetchApi = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setMyUser(data);
    } catch (error) {
        console.log('Error Message', error);
    }
  }

  useEffect(()=>{
     fetchApi(userId);
  },[userId])

    return(
        <div>
            <Header/>
                <div className="container">

                   <div className="row">
                      {myUser ? (
                        <div className="col-12 col-xs-12">
                            
                            <div className="shadow p-3 mb-3 mt-5">
                            <h4 className="mt-3 mb-2" style={{color:'#0070ad'}}>Use33 User All Details</h4><hr/>
                                <p><b>Name: </b>{myUser.name}</p>
                                <p><b>Email: </b>{myUser.email}</p>
                                <p><b>website: </b>{myUser.website}</p>
                                <p><b>Phone: </b>{myUser.phone}</p>
                                <p><b>City: </b>{myUser?.address?.city}</p>
                                <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate33`)}>Go Back</button>
                            </div>
                        </div>
                      ):(
                        <p>All User Details Loading...</p>
                      )}
                   </div>

                </div>
            <Footer/>
        </div>
    )
}

export default Use33;
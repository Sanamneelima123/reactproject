import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import {useParams} from "react-router-dom"
import Horizontalbar from "../Hooks/Chats/Horizontalbar";

const Use21 = () =>{

 const {userId} = useParams();
 const [user, setUser] = useState([]);

 const fetchApiData = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setUser(data);
    } catch (error) {
        console.log('Error Message', error);
    }
 }

 useEffect(()=>{
    fetchApiData(userId)
 },[userId])

    return(
        <div>
            <Header/>
              <div className="container">
                 <div className="row shadow p-3 mb-4 mt-4">
                    <div className="col-6 col-xs-12">
                    {user ? (
                        <div className="col-12 col-xs-12">
                            <div className="">
                                <h4 className="mt-3 mb-3" style={{color:'#0070ad'}}>User All Details</h4><hr/>
                                <p><b>Name: </b>{user.name}</p>
                                <p><b>Email: </b>{user.email}</p>
                                <p><b>website: </b>{user.website}</p>
                                <p><b>Phone: </b>{user.phone}</p>
                                <p><b>City: </b>{user?.address?.city}</p>
                            </div>
                        </div>
                    ):(
                        <p>User ALL Details Loading...</p>
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

export default Use21;
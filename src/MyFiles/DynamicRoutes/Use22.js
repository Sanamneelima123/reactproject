import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import {useParams} from 'react-router-dom';
import Linechart from "../Hooks/Chats/Linechart";

const Use22 = () =>{

 const {userId} = useParams();
 const [student, setStudent] = useState([]);

 const fetchApis = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setStudent(data);
    } catch (error) {
        console.log(error);
    }
 }

 useEffect(()=>{
    fetchApis(userId)
 },[userId])

    return(
        <div>
            <Header/>
              <div className="container">
                  

                <div className="row shadow p-3 mt-4 mb-4">
                    <div className="col-6 col-xs-12">
                    {student ? (
                        <div className="col-12 col-xs-12">
                            <h3 className="mt-3 mb-3" style={{color:'#0070ad'}}>Use22 Components</h3><hr/>
                            <div className="">
                                <p><b>Name:</b> {student.name}</p>
                                <p><b>Email:</b> {student.email}</p>
                                <p><b>Website:</b> {student.website}</p>
                                <p><b>Phone:</b> {student.phone}</p>
                                <p><b>City:</b> {student?.address?.city}</p>
                            </div>
                        </div>
                    ):(
                        <p>ALL Students Details Loading...</p>
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

export default Use22;
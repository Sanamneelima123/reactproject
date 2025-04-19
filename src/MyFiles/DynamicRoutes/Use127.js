import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const Use127 = () =>{

    const [mydata, setMyData] = useState([]);
    const {userId} = useParams();

    const navigate = useNavigate();

    const fetchApi = async (id) =>{
       try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setMyData(data);
       } catch (error) {
            console.log(error);
       }
    }

    useEffect(()=>{
        fetchApi(userId)
    },[userId])

    return(
        <div>
           <Header/>
              <div className="container">
                  

                  <div className="row shadow p-3">
                    <div className="col-6 col-xs-12">
                    {mydata ? (
                        <div className="col-xs-12">
                            <div className="">
                            <h3 className="mt-3 mb-3">Use127 component</h3><hr/>
                                <p><b>Name : </b> {mydata.name}</p>
                                <p><b>Username : </b> {mydata.username}</p>
                                <p><b>Email : </b> {mydata.email}</p>
                                <p><b>Phone : </b> {mydata.phone}</p>
                                <p><b>Website : </b> {mydata.website}</p>
                                <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate127`)}>Go Back</button>
                            </div>
                        </div>
                    ):(
                        <p>MyData is Loading...</p>
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

export default Use127;
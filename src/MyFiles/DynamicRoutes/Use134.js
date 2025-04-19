import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const Use134 = () =>{

    const {userId} = useParams();

    const [getData, setGetData] = useState([]);

    const navigate = useNavigate();

    const fetchApi = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setGetData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
       if (userId) {
          fetchApi(userId);
       }
    }, [userId]);

    return(
        <div>
            <Header/>
               <div className="container">

                    <div className="row">
                        <div className="col-md-6">
                        {getData ? (
                            <div className="col-xs-12">
                            <div className="">
                            <h3 className="mt-3 mb-3">Use134 component</h3><hr/>
                                <p><b>Name : </b> {getData.name}</p>
                                <p><b>Username : </b> {getData.username}</p>
                                <p><b>Email : </b> {getData.email}</p>
                                <p><b>Phone : </b> {getData.phone}</p>
                                <p><b>Website : </b> {getData.website}</p>
                                <p><b>Address : </b> {getData?.address?.street}</p>
                                <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate134`)}>Go Back</button>
                            </div>
                        </div>
                        ):(
                            <p>Use134 Data is not available</p>
                        )}
                    </div>
                   
                    <div className="col-md-6">
                        <Linechart/>
                    </div>
                    </div>

               </div>
            <Footer/>
        </div>
    )
}

export default Use134;
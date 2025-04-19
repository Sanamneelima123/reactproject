import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Linechart from "../Hooks/Chats/Linechart";

const Use130 = () => {
   const { userId } = useParams();
   const [vendorDetails, setVendorDetails] = useState([]);

   const navigate = useNavigate();

   const fetchApi = async (api) => {
      try {
         const response = await fetch(`https://jsonplaceholder.typicode.com/users/${api}`);
         const data = await response.json();
         setVendorDetails(data);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      if (userId) {
         fetchApi(userId);
      }
   }, [userId]);

   return (
      <div>
         <Header />
         <div className="container">
            <h3 className="mt-3 mb-3">Use130</h3>
            <div className="row shadow p-3">
                  <div className="col-md-6">
                  {vendorDetails ? (
                        <div className="col-xs-12">
                            <div className="">
                            <h3 className="mt-3 mb-3">Use130 component</h3><hr/>
                                <p><b>Name : </b> {vendorDetails.name}</p>
                                <p><b>Username : </b> {vendorDetails.username}</p>
                                <p><b>Email : </b> {vendorDetails.email}</p>
                                <p><b>Phone : </b> {vendorDetails.phone}</p>
                                <p><b>Website : </b> {vendorDetails.website}</p>
                                <p><b>Address : </b> {vendorDetails?.address?.street}</p>
                                <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usestate130`)}>Go Back</button>
                            </div>
                        </div>
                    ):(
                        <p>MyData is Loading...</p>
                    )}
                  </div>
                  <div className="col-md-6">
                  <Linechart style={{ width: 250, height: 250 }} />
                  </div>
            </div>
         </div>
         <Footer />
      </div>
   )
}

export default Use130;

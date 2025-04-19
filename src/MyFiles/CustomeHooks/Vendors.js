import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"
import Vendor11 from "./Vendor11";
import { useNavigate } from "react-router-dom";

const Vendors = () => {
  const URL = "https://jsonplaceholder.typicode.com/posts";

  const [vendorData2, isError, isLoading] = Vendor11(URL);
  const navigate = useNavigate();

  if(isLoading){
    return <h3 className="mt-5"><img src={Loader} alt={Loader} /></h3>
  }

  if(isError?.status){
    return <h3 className="text-center mt-5" style={{color:'red'}}>{isError?.map}</h3>
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h3 className="mt-3 mb-3">Vendor Component</h3>
        <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Vendor`)}>Go To Vendor</button>

        <div className="row">
          {vendorData2.map((eachVendor) => {
            const { id, title, body } = eachVendor;
            return (
              <div key={id} className="col-4 col-xs-12">
                 <div className="shadow p-3 mb-2">
                    <p>{title}</p>
                    <p>{body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Vendors;

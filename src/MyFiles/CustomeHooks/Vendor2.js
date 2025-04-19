import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"
import { useNavigate } from "react-router-dom";
import useVendor from "./useVendor";

const Vendor1 = () =>{

    const URL = "https://jsonplaceholder.typicode.com/posts";

    const [vendor2, isLoading, isError] = useVendor(URL);

    const navigate = useNavigate();
    
    if(isLoading){
        return <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>
    }

    if(isError?.status){
        return <h3 className="text-center mt-5">{isError?.msg}</h3>
    }

    return(
        <div>
            <Header/>
            <div className="container">
            <h3 className="mt-4 mb-3">Vendor Component</h3>

            <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Vendor1`)}>Go Back</button>

                <div className="row">
                    {
                        vendor2.map((eachVendor)=>{
                            const {id, title, body} = eachVendor;
                            return(
                                <div key={id} className="col-4 col-xs-12">
                                    <div className="shadow p-3 mb-2" style={{ borderRight: "5px solid blue" }}>
                                        <p>{title}</p>
                                        <p>{body}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default Vendor1;

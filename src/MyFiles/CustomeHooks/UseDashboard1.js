import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"
import UseDashboard from "./UseDashboard";

const UseDashboard1 = () =>{

 const URL='https://jsonplaceholder.typicode.com/users';

 const [dashboard1, isLoading, isError] = UseDashboard(URL);

 if(isLoading){
    return <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>
 }

 if(isError?.status){
    return <h3 className="text-center mt-5" style={{color:'red'}}>{isError?.msg}</h3>
 }

    return(
        <div>
            <Header/>
              <div className="container">
                 <h3 className="mt-4 mb-3" style={{color:'#12abdb'}}>UseDashboard1 User Details</h3>

                <div className="row">
                    {dashboard1.map((eachUser1)=>{
                        const {id, name, email, website} = eachUser1;
                        return(
                            <div key={id} className="col-4 col-xs-12">
                                <div className="shadow p-3 mb-2">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

              </div>
            <Footer/>
        </div>
    )
}

export default UseDashboard1;
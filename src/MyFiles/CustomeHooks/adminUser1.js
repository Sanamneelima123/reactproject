import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"
import AdminUser from "./AdminUser";

const AdminUser1 = () =>{

 const URL='https://jsonplaceholder.typicode.com/users';

 const [admin1, isLoading, isError] = AdminUser(URL);

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
                 <h3 className="mt-4 mb-3">AdminUser1 Component</h3>

                <div className="row">
                    {admin1.map((eachAdmin)=>{
                        const {id, name, email, website} = eachAdmin;
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

export default AdminUser1;
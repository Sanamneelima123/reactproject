import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"
import AdminUser from "./AdminUser";

const AdminUser2 = () =>{

 const URL='https://jsonplaceholder.typicode.com/posts';

 const [admin2, isLoading, isError] = AdminUser(URL);

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
                 <h3 className="mt-4 mb-3">AdminUser2 Component</h3>

                 <div className="row">
                    {admin2.map((eachAdmin)=>{
                        const {id, title, body} = eachAdmin;
                        return(
                            <div key={id} className="col-4 col-xs-12">
                                <div className="shadow p-3 mb-2">
                                    <p>{title}</p>
                                    <p>{body}</p>
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

export default AdminUser2;
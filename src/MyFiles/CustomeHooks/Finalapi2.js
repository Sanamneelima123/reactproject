import React, { } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import UseFinal from "./UseFinal";

const Finalapi2 = () =>{

 const URL ="https://jsonplaceholder.typicode.com/posts";

  const [userData, loading, isError] = UseFinal(URL);

 if(isError){
    return <h3 className="text-center">Something went Wrong</h3>
 }

 if(loading){
    return <h3 className="text-center">Loading...</h3>
 }

    return(
        <div>
            <Header/>
               <div className="container">
                    <h3 className="mt-3 mb-3">Finalapi2 Component</h3>

                   <div className="row">
                      {
                        userData.map((eachUser)=>{
                            const {id, title} = eachUser;
                            return(
                                <ul className=" col-4 col-xs-12" key={id}>
                                    <li className="shadow p-3 mb-3">{title}</li>
                                </ul>
                            )
                        })
                      }
                   </div>

               </div>
            <Footer/>
        </div>
    )
}

export default Finalapi2;
import React, {} from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import UseEmp from "./UseEmp";

const Employee2 = () =>{

 const URL ='https://jsonplaceholder.typicode.com/users';

 const [employeeData2, loading, isError] = UseEmp(URL);

 if(loading){
    return <h3 className="text-center mt-5" style={{color:'green'}}>Loading...</h3>
 }

 if(isError?.status){
    return <h3 className="text-center mt-5" style={{color:'red'}}>{isError?.msg}</h3>
 }

    return(
        <div>
            <Header/>
               <div className="container">
                   <h3 className="mt-3 mb-3">Employee2 Data</h3>

                  <div className="row">
                    {employeeData2.map((eachEmp)=>{
                        const {id, name} = eachEmp;
                        return(
                            <div className="col-6 col-xs-12">
                                <div key={id} className="shadow p-3 mb-3">
                                    <p>{name}</p>
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

export default Employee2;
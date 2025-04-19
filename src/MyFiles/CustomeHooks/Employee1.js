import React,{} from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import UseEmp from "./UseEmp";

const Employee1 = () =>{

    
 const URL ='https://jsonplaceholder.typicode.com/posts';

 const [employeeData1, loading, isError] = UseEmp(URL);

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
                   <h3 className="mt-3 mb-3">Employee1 Data </h3>

                   <div className="row">
                    {employeeData1.map((eachEmp)=>{
                        const {id, title} = eachEmp;
                        return(
                            <div className="col-6 col-xs-12">
                                <div key={id} className="shadow p-3 mb-3">
                                    <p>{title}</p>
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

export default Employee1;
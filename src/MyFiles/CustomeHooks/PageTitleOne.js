import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import UsePageTitle from "./UsePageTitle";

const PageTitleOne = () =>{

 const [count, setCount] = useState(0);

 UsePageTitle(count);

    return(
        <div>
            <Header/>
               <div className="container">
                   <h3 className="mt-3 mb-3">PageTitleOne Component</h3>
                   <div>
                       <button className="btn btn-primary" onClick={()=> setCount(count + 1)}>count + {count}</button>
                   </div>
               </div>
            <Footer/>
        </div>
    )
}

export default PageTitleOne;
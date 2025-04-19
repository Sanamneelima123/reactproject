import React,{useState} from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usestate1 = () =>{
  
   const [count, setCount] = useState(0);

//    const incrazevalue = () =>{
//      setCount(count + 1);
//    }

   const incrazevalue = () =>{
     setCount((prevCount)=>{
       return prevCount + 1;
     });
    //  setCount((prevCount)=>{
    //     return prevCount+ 1;
    //   });

    setCount((prevCount)=> prevCount +1)

   }

   const descrizevalue = () =>{
     //  setCount((prevCount)=>{
    //     return prevCount - 1;
    //   });

    // const descrizevalue = () =>{
    //      setCount(count - 1);
    // }
    setCount((prevCount) => prevCount -1);
    setCount((prevCount) => prevCount -1);
   }

    return(
        <>
         <Header />
           <div className="container">
              <h3 className="mt-3">this usestate1 component</h3>

              <div className="new">
                 <button className="btn btn-danger" onClick={descrizevalue}>-</button>&nbsp;
                 <span>{count}</span>&nbsp;
                 <button className="btn btn-info" onClick={incrazevalue}>+</button>
              </div>
           </div>
           <Footer />
        </>
    )
}

export default Usestate1;
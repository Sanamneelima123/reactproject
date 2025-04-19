import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Events1 = () =>{

//    const clickevent = ()=>{
//     console.log("Hello React")
//    }
// const clickevent = (e)=>{
//     console.log(e)
//    }

// function clickevent(e){
//     console.log("i am regular function" , e)
// }

function clickevent(e, firstName) {
    console.log("Hello i am regular fun", e, firstName);
  }

    return(
        <>
        <Header/>
          <div className="container">
            <h3 className="mt-3">Events 1 Components</h3>
            {/* <button className="btn btn-info" onClick={clickevent}>Click Here</button> */}
            {/* <button className="btn btn-info" onClick={function(e){
                console.log("hello i am inline function", e)
            }}>Click Here</button> */}
            {/* <button className="btn btn-info" onClick={function(e){ return clickevent(e, "Balu Naidu");}}>click me</button> */}
            {/* events arguments pass cheyadhaniki js anonymous this normal function top example */}
            <button className="btn btn-info" onClick={(e)=> clickevent(e, "Balu Naidu")}>click me</button>
            {/* events arguments pass cheyadhaniki js anonymous this arrow function top example */}
          </div>
          <Footer/>
        </>
    )
}

export default Events1;
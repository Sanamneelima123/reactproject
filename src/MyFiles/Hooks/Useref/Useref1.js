import React,{useEffect, useRef, useState} from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

const Useref1 = () =>{

  const [newUser, setNewUser] = useState('');
//   const [rendercount, setRenderCount] = useState(1);
  const rendercount = useRef(1); 

  useEffect(()=>{
    // console.log(rendercount);
    rendercount.current = rendercount.current +1;
  })

//   useEffect(()=>{
//     setRenderCount((prevCount) => setRenderCount(prevCount+1))
//   })



    return(
        <div>
            <Header/>
            <div className="container">
                <h3 className="mt-5">Useref1 Component</h3>
                <div>
                    <input type="text" className="" id="newUser" name="newUser" onChange={(e)=> setNewUser(e.target.value)} />
                    <p>Typing Someting New : {newUser}</p>
                    {/* <p>prevCount value {rendercount}</p> */}
                    <p>useRef auto Count value {rendercount.current}</p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Useref1;
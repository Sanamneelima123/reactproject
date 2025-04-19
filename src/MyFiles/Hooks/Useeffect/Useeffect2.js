import React, {useState, useEffect} from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

const Useeffect2 = () =>{
  const [pagewidth,setPagewidth] = useState(window.innerWidth);
  const [toggle,setToggle] = useState(true);
  const [count, setCount] = useState(0);
  useEffect(()=>{
    
    const resizeHandler = () =>{
      setPagewidth(window.innerWidth);
   }
   
   window.addEventListener("resize", resizeHandler);

     console.log("I AM COMING FROM Useeffect", count);

     return() =>{
      console.log('i am removing');
      window.removeEventListener("resize", resizeHandler);
   }
   
  }, [count]);
  //  empty dependency array edi only some thing change chesta na edi run avuthundi


  const addCount = () =>{
    setCount(count + 1)
  }

    return(
        <div>
           <Header/>
             <div className="container">
                  <h3>i am coming from useeffect2</h3>

                 <div className="">
                   <h3 onClick={()=>setToggle(!toggle)}>{toggle ? "true" : "false"}</h3>
                   <p>{count}</p>
                   <button onClick={addCount}>+</button>
                 </div>

             </div>
           <Footer/>
        </div>
    )
}

export default Useeffect2;
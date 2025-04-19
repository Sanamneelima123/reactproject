import React, {useEffect, useState} from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

const Useeffect1 = () =>{


  const [count,setCount] = useState(0);
  useEffect(()=>{
    console.log("i am add from use useEffect", count)
  }, [count])
//  empty dependency array edi only some thing change chesta na edi run avuthundi

  const handlecount = () =>{
      setCount(count + 1)
  }

    return(
        <>
        <Header/>
        <div className="container">
            <h3 className="mt-5">i am coming from Useeffect1</h3>
           <div>{count}</div>
           <button onClick={handlecount}>Add Number</button>  

        </div>
        <Footer/>
        </>
    )
}

export default Useeffect1;
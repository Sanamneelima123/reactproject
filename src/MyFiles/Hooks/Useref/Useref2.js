import React,{useEffect, useRef, useState} from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

const useRef2 = () =>{

    const [typevalue, setTypeValue] = useState('');
    const inputDom = useRef('');

    useEffect(()=>{
        console.log(inputDom);
    })

    const focus = () =>{
        inputDom.current.focus();
        // inputDom.current.value="balu naidu";
    }

    return(
        <div>
            <Header/>
            <div className="container">
                <h4 className="mt-5">useRef2 Component</h4>
                <div>
                    <input type="text" ref={inputDom} id="typevalue" name="typevalue" onChange={(e)=> setTypeValue(e.target.value)} />
                    <p>Typing Value :{typevalue}</p>
                    <button className="btn btn-primary" onClick={focus}>Focus</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default useRef2;
import { useEffect } from "react";

function UsePageTitle (count){
    useEffect(()=>{
        document.title = `count + ${count}`
      },[count])
}

export default UsePageTitle;
import {useState, useEffect} from "react";

const UseEmp = (URL) =>{

    const [useData1, setUseData1] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState({status:false, msg:''})
   
    const fetchApi = async (apiUrl) =>{
       setLoading(true);
       setIsError({status:false, msg:''});
       try {
           const response = await fetch(apiUrl);
           const data = await response.json();
           setUseData1(data);
           setLoading(false);
           setIsError({status:false, msg:''});
           if(response.status === 404){
               throw new Error('Please check API 404')
           }
       } catch (error) {
           console.log('Error Message', error);
           setLoading(false);
           setIsError({status:true, msg: error.message || 'something went wrong'});
       }
    }
   
    useEffect(()=>{
       fetchApi(URL);
    },[URL])

    return [useData1, loading, isError] ;
}

export default UseEmp;
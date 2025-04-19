import {useState, useEffect} from 'react'

function UseFinal(URL) {
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false)
   
    const fetchApi = async (URL)=>{
       setLoading(true);
       try {
           const responsive = await fetch(URL);
           const data = await responsive.json();
           setData(data); 
           setLoading(false);
       } catch (error) {
           setIsError(true);
           setLoading(false)
       }
    }
   
    useEffect(()=>{
       fetchApi(URL)
    },[URL]);

    return [Data, loading, isError];
}

export default UseFinal;

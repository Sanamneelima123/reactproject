import { useEffect, useState } from "react";

const UseDashboard = (URL) => {

      const [Dashboard, setDashboard] = useState([]);
      const [loading, setLoading] = useState(false);
      const [isError, setIsError] = useState({status:false, msg:''});
    
      const fetchApi = async (apiUrl) =>{
        setLoading(true);
        setIsError({status:false, msg:''});
         try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setDashboard(data);
            setLoading(false);
            setIsError({status:false, msg:''});
            if(response.status === 404){
                throw new Error('API Response 404: Please check API');
            }
         } catch (error) {
            console.log(error);
            setLoading(false);
            setIsError({status:true, msg: error.message || 'something went wrong'});
         }
         
      }

      useEffect(()=>{
        fetchApi(URL);
     },[URL])

      return [Dashboard, loading, isError];

}

export default UseDashboard;
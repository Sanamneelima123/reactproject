import {useState, useEffect} from "react";

const AdminUser = (URL) =>{

    const [adminUser, setAdminUser1] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({status:false, msg:''})
   
    const fetchApi = async (apiUrl) =>{
       setIsLoading(true);
       setIsError({status:false, msg:''});
       try {
           const response = await fetch(apiUrl);
           const data = await response.json();
           setAdminUser1(data);
           setIsLoading(false);
           setIsError({status:false, msg:''});
           if(response.status === 404){
               throw new Error('Please check API 404')
           }
       } catch (error) {
           console.log('Error Message', error);
           setIsLoading(false);
           setIsError({status:true, msg: error.message || 'something went wrong'});
       }
    }
   
    useEffect(()=>{
       fetchApi(URL);
    },[URL])

    return [adminUser, isLoading, isError] ;
}

export default AdminUser;
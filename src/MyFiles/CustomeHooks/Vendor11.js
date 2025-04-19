import { useState, useEffect } from "react";

const Vendor11 = (URL) =>{

    const [vendorData, setVendorData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState({ status: false, msg: "" });
  
    const fetchApi = async (apiUrl) => {
      setIsLoading(true);
      setIsError({status:false, msg:''});
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setVendorData(data);
        setIsLoading(false);
        setIsError({status:false, msg:''});
        if(response.status === 404){
          throw new Error('Please check the API 404')
        }
      } catch (error) {
        console.error(error);
        setIsError({ status: false, msg: error.message || "Failed to load data" });
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchApi(URL);
    }, [URL]);

  return [vendorData, isError, isLoading]
}

export default Vendor11;
import { useEffect, useState } from "react";

const useVendor = (URL) => {
    const [vendor, setVendor] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({ status: false, msg: '' });

    const fetchApi = async (apiUrl) => {
        setIsLoading(true);
        setIsError({ status: false, msg: '' });
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setVendor(data);
            setIsLoading(false);
            setIsError({ status: false, msg: '' });
            if (response.status === 404) {
                throw new Error('Please check the API 404');
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setIsError({ status: true, msg: error.message || 'something went wrong' });
        }
    };

    useEffect(() => {
        fetchApi(URL);
    }, [URL]);

    return [vendor, isLoading, isError];
};

export default useVendor;

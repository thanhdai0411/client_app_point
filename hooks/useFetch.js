import React, { useEffect, useState } from 'react';
import axios from 'axios';

function useFetch(url) {
    const [isLoading, setIsLoading] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [isError, setIsError] = useState(false);
    const [dataFetch, setDataFetch] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            try {
                let res = await axios.get(url);
                let data = res && res.data ? res.data : [];
                setIsLoading(false);
                setIsError(false);
                setDataFetch(data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    // setIsLoading(false);
                    setIsError(true);
                }
            }
        };
        fetchData();
        return () => {
            setDataFetch([]);
        };
    }, [url]);

    return { dataFetch, isLoading, isError };
}

export default useFetch;

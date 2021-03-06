import React, { useEffect, useState } from 'react';
import request from '../utils/request';

function useFetch(url) {
    const [isLoading, setIsLoading] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [isError, setIsError] = useState(false);
    const [dataFetch, setDataFetch] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        (async () => {
            try {
                let res = await request.get(url);
                let data = res && res.data.data ? res.data.data : [];
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
        })();
        return () => {
            setDataFetch([]);
        };
    }, [url]);

    return { dataFetch, isLoading, isError };
}

export default useFetch;

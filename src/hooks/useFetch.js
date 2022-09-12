import axios from 'axios';
import { useCallback, useState } from 'react';

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (reqConfig, dataHandler = () => {}) => {
        setIsLoading(true);
        try {
            const res = await axios(reqConfig);

            if (res.statusText !== 'OK') throw new Error('Something went wrong');

            dataHandler(res.data);
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }

        setIsLoading(false);
    }, []);

    return {
        sendRequest,
        isLoading,
        error,
    };
};

export default useFetch;

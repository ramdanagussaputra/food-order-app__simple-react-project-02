import axios from 'axios';
import { useCallback } from 'react';

const useFetch = () => {
    const sendRequest = useCallback(async (reqConfig, dataHandler) => {
        try {
            const res = await axios(reqConfig);

            if (res.statusText !== 'OK') throw new Error('Something went wrong');

            dataHandler(res.data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    return {
        sendRequest,
    };
};

export default useFetch;

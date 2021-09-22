import { useEffect, useState } from "react";

import React from 'react';

const UseFetch = (url) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try{
                const res = await fetch(url);
                const json = await  res.json();
                setData(json);
                setLoading(false);
            }catch (e) {
                setError(e);
                setLoading(false);
            }
        }
        //fetchData();
        setTimeout(()=> {
            fetchData();
        }, 3000)
    }, [url]);
    
    
    return { loading, error, data };
};

export default UseFetch;
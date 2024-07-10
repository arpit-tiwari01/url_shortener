import {useState} from 'react'

const useFetch = (cb,options = {}) => {

    const [data , setData] = useState(null);
    const [loading , setLoding] = useState(null);
    const [error,setError] = useState(null);

    const fn = async (...args) => {
        setLoding(true)
        setError(null)  
        try{
            const response = await cb(options,...args)
            setData(response)
        }catch(error){
            setError(error)
        }finally{
            setLoding(false)
        }
    };
    return {data ,loading ,error ,fn}
};

export default useFetch;
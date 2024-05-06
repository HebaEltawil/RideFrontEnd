import axios from "axios";
import './Pending_Card/pandingStyle.css'
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { accountsPending,clearAccount } from "../data";
import { PendingCard } from "./Pending_Card/Pending_Card";

export const PendingPage = () => {
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        clearAccount();
        const fetchData = async () => {
                await axios.get(process.env.REACT_APP_API + "/Admin/getallPending").then((response)=>{
                response.data.forEach(element => {
                    accountsPending.push(element);
                });
                setLoading(false)}).catch((error)=>{console.log(error);if(error.response.status === 404){
                    setLoading(false);
                }})
        };
        fetchData();
        console.log(accountsPending);
    }, []);
    return <div className='bodyP'>
    {loading ? (
                <CircularProgress color="secondary" />
            ) : (
                <PendingCard/>
            )}
    </div> 
}
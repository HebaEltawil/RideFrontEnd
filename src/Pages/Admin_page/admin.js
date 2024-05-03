import axios from "axios";
import './Driver_Dashboard/dashboardStyle.css'
import { useEffect, useState } from 'react';
import { DriverDashboard } from './Driver_Dashboard/Driver_Dashboard';
import {drivers,blockedDrivers,clear} from'./data';
import CircularProgress from '@mui/material/CircularProgress';

export const AdminPage =   () => {
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        
        clear();
        const fetchData = async () => {
            await axios.get(process.env.REACT_APP_API + "/Admin/getAllDriver").then((response)=>{
                    response.data.forEach(element => {
                        element["blocked"] === true ? blockedDrivers.push(element) : drivers.push(element);
                    });
                    setLoading(false);
                }).catch((e)=>{if(e.response.status === 404){
                    setLoading(false);
                }})
                
        };
        fetchData();
        console.log(drivers,blockedDrivers);
    }, []);

    return <body className='bodyD'>
    {loading ? (
                <CircularProgress color="secondary" />
            ) : (
                <DriverDashboard/>
            )}
    </body> 
}
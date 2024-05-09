import axios from "axios";
import './Driver_Dashboard/dashboardStyle.css'
import { useEffect, useState } from 'react';
import { DriverDashboard } from './Driver_Dashboard/Driver_Dashboard';
import {drivers,blockedDrivers,clear,clearAccount,accountsPending, allDrivers, clearAllDrivers, clearBlocked} from'./data';
import CircularProgress from '@mui/material/CircularProgress';

export const AdminPage =   () => {
    const [loading, setLoading] = useState(true);
  
    useEffect(()=>{
        clear();
        clearAccount();
        clearAllDrivers();
        const fetchData = async () => {
            await axios.get(process.env.REACT_APP_API + "/Admin/getallPending").then((response)=>{
                response.data.forEach(element => {
                    accountsPending.push(element);
                });
                }).catch((error)=>{if(error.response.status === 404){
                }})
            await axios.get(process.env.REACT_APP_API + "/Admin/getAllDriver").then((response)=>{
                    response.data.forEach(element => {
                        element["blocked"] === true ? blockedDrivers.push(element) : drivers.push(element);
                        allDrivers.push(element);
                    });
                    setLoading(false);
                }).catch((e)=>{if(e.response.status === 404){
                    setLoading(false);
                }})
                
        };
        fetchData();
    }, []);

    return <div className='bodyD'>
    {loading ? (
                <CircularProgress color="secondary" />
            ) : (
                <DriverDashboard/>
            )}
    </div> 
}
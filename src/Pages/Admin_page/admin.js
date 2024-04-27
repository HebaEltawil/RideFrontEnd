// import axios from "axios";
// import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from './Admin_Navbar/Navbar';
import axios from "axios";
import { useEffect, useState } from 'react';
import { DriverDashboard } from './Driver_Dashboard/Driver_Dashboard';
import {drivers,blockedDrivers,clear} from'./data';
import CircularProgress from '@mui/material/CircularProgress';

export const AdminPage =   () => {
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        
        clear();
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API + "/Admin/getAllDriver");
                response.data.forEach(element => {
                    element["blocked"] === true ? blockedDrivers.push(element) : drivers.push(element);
                });
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        console.log(drivers,blockedDrivers);
    }, []);

    return <>
    {loading ? (
                <CircularProgress color="secondary" />
            ) : (
                <DriverDashboard/>
            )}
    </> 
}
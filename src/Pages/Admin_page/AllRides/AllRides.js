import axios from "axios";
import './AllRidesStyle.css'
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { RidesCard } from "./RideCard/RideCard";
import { allRides,clearAllRides,allDrivers,sortallRides } from "../data";


export const AllRidesPage = () =>{
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        clearAllRides();
        const fetchData = async () => {
                await axios.get(process.env.REACT_APP_API + "/Admin/getAllRides").then((response)=>{
                response.data.forEach(element => {
                    allRides.push(element);
                    
                });
                setLoading(false);
                sortallRides();
                }).catch((error)=>{
                    setLoading(false);
        })
        };
        fetchData();
        console.log(allRides);
        console.log(allDrivers);
      
    }, []);
    

    return <>
    <div className="bodyA_R">
    {loading ? (
                <CircularProgress color="secondary" />
            ) :
    (<RidesCard/>)}
    </div>
    </>
}
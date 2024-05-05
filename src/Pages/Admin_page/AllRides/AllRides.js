import axios from "axios";
import './AllRidesStyle.css'
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { RidesCard } from "./RideCard/RideCard";
import { allRides,clearAllRides,allDrivers,clearAllDrivers } from "../data";

export const AllRidesPage = () =>{
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        clearAllRides();
        clearAllDrivers();
        const fetchData = async () => {
                await axios.get(process.env.REACT_APP_API + "/Admin/getAllRides").then((response)=>{
                response.data.forEach(element => {
                    allRides.push(element);
                });
                }).catch((error)=>{console.log(error);if(error.response.status === 404){
                    
                }})
                axios.get(process.env.REACT_APP_API + "/Admin/getAllDriver").then((response)=>{
                    response.data.forEach(element => {
                        allDrivers.push(element);
                        setLoading(false);
                    })
                })
        };
        fetchData();
        console.log(allRides);
        console.log(allDrivers);
    }, []);
    

    return <>
    <body className="bodyA_R">
    {loading ? (
                <CircularProgress color="secondary" />
            ) :
    (<RidesCard/>)}
    </body>
    </>
}
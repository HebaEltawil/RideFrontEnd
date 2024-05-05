import axios from "axios";
import './Driver_Dashboard/dashboardStyle.css'
import { useEffect, useState } from 'react';
import { DriverDashboard } from './Driver_Dashboard/Driver_Dashboard';
import {drivers,blockedDrivers,clear,clearAccount,accountsPending} from'./data';
import CircularProgress from '@mui/material/CircularProgress';
import {HubConnectionBuilder} from '@microsoft/signalr'

export const AdminPage =   () => {
    const [loading, setLoading] = useState(true);
    const createSignalRConnection = () => {
        const connection = new HubConnectionBuilder()
          .withUrl("https://localhost:7115/realTime")
          .withAutomaticReconnect()
          .build();

        return connection;
      };
    const connection = createSignalRConnection();
    useEffect(()=>{
        
        clear();
        clearAccount();
        const fetchData = async () => {
            await axios.get(process.env.REACT_APP_API + "/Admin/getallPending").then((response)=>{
                response.data.forEach(element => {
                    accountsPending.push(element);
                });
                }).catch((error)=>{console.log(error);if(error.response.status === 404){
                }})
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
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    connection.on('UpdatePending', passenger => {
                        accountsPending.push(passenger);
                      console.log(passenger);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
  
  
    }, []);

    return <body className='bodyD'>
    {loading ? (
                <CircularProgress color="secondary" />
            ) : (
                <DriverDashboard/>
            )}
    </body> 
}
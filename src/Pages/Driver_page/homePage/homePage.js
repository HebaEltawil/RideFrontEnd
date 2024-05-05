import {Profile} from "./profile";
import {useEffect, useState} from "react";
import axios from "axios";
import {Finance} from "./finance";
import {Rides} from "./rides";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {UseAuth} from "../../../Services/AuthProvider/AuthProvider";
import {clearUpdates, setIsUpdated, setUpdateId} from "../updateRideGlobal";
let kMonthMoney = {};

const createSignalRConnection = () => {
    return  new HubConnectionBuilder()
        .withUrl("https://localhost:7115/realTime")
        .withAutomaticReconnect()
        .build();
};

export const DriverHomePage = ({driverData}) =>{
    let [monthMoney, setMonthMoney] = useState({});
    let [isLoading, setIsLoading] = useState(true);
    let [localDriverData, setLocalDriverData] = useState(driverData);
    const {setToken,setRole,setEmail} = UseAuth();
    let connection;
    connection = createSignalRConnection();
    useEffect(() => {
        clearUpdates();
        if(Object.keys(kMonthMoney).length === 0) {
            axios.get(process.env.REACT_APP_API + "/Driver/getAllIncomePerMonth/" + driverData.email).then((response) => {
                if (response.status === 200 && Object.keys(response.data).length > 0) {
                    setMonthMoney(response.data);
                    console.log(response.data)
                }
                setIsLoading(false);
            }).catch((e) => {
                setIsLoading(false);
            })
        }else{
            setMonthMoney(kMonthMoney);
            setIsLoading(false);
        }
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                    connection.on(driverData.email, ride => {
                        console.log(ride);
                        const jsonMap = JSON.parse(ride);
                        if(jsonMap['type'] === 'rideCreated')
                        {
                            clearUpdates();
                            const jsonData = JSON.parse(jsonMap['data']);
                            const newData = {};
                            for (const key in jsonData) {
                                if (Object.hasOwnProperty.call(jsonData, key)) {
                                    const lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
                                    newData[lowerCaseKey] = jsonData[key];
                                }
                            }
                            setLocalDriverData(prevDriverData => ({
                                ...prevDriverData,
                                rides: [...prevDriverData.rides, newData]
                            }));
                        }else if(jsonMap['type'] === 'rideUpdated')
                        {
                            const jsonData = JSON.parse(jsonMap['data']);
                            const newData = {};
                            for (const key in jsonData) {
                                if (Object.hasOwnProperty.call(jsonData, key)) {
                                    const lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
                                    newData[lowerCaseKey] = jsonData[key];
                                }
                            }
                            setIsUpdated(true);
                            setUpdateId(newData.id);
                            setLocalDriverData(prevDriverData => ({
                                ...prevDriverData,
                                rides: prevDriverData.rides.map(ride => {
                                    if (ride.id === newData.id) {
                                        return newData; // Replace the existing ride with updated data
                                    }
                                    return ride; // Leave other rides unchanged
                                })
                            }));
                        }
                        else if(jsonMap['type'] === 'block')
                        {
                            clearUpdates();
                            setToken();setRole();setEmail();
                        }
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [driverData]);
    if (isLoading) {
        return <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>

        </div>; // Display loading screen while fetching data
    }
    return (
        <>
            <div className="container mx-auto mt-3 d-flex justify-content-center ">
                <div style={{width: "35%"}}>
                    <Profile driverData={localDriverData} monthMoney={monthMoney}/>
                    <Finance driverData={localDriverData} monthMoney={monthMoney}/>
                </div>
                <div className="ms-4 p-1" style={{width: '60%', maxHeight: '90vh', overflowY: 'scroll', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', MsOverflowStyle: 'none'}}>
                    {localDriverData.rides === null || localDriverData.rides.length === 0 ? null : (<Rides driverData={localDriverData}/>)}
                </div>
            </div>
        </>
    )

}
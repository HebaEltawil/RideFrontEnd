import { UseAuth } from "../../Services/AuthProvider/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import {DriverHomePage} from "./homePage/homePage";
import {kDriverData, setKDriverData} from "./kDriverData.js"
const DriverPage = () => {
    const { email } = UseAuth();
    let [driverData, setDriverData] = useState(null);
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(Object.keys(kDriverData).length === 0) {
            axios.get(process.env.REACT_APP_API + "/Driver/getDriverByEmail/" + email)
                .then((response) => {
                    setKDriverData(response.data);
                    setDriverData(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching driver data:", error);
                    setIsLoading(false);
                });
        }else{
            //setDriverData(kDriverData);
            //setIsLoading(false);
            axios.get(process.env.REACT_APP_API + "/Driver/getDriverByEmail/" + email)
                .then((response) => {
                    setKDriverData(response.data);
                    setDriverData(response.data);
                    setIsLoading(false);
                })
        }
    }, [email]);

    if (isLoading) {
        return <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>

        </div>; // Display loading screen while fetching data
    }

    // If driverData is empty, display loading screen
    if (Object.keys(driverData).length === 0 && driverData.constructor === Object) {
            return <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
        </div>
    }
    return (
        <>
            <div style={{marginTop:"70px"}}>
                <DriverHomePage driverData={driverData}/>
            </div>
        </>
    );
};
export {DriverPage,kDriverData}

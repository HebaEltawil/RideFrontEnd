import {useEffect, useState} from "react";
import axios from "axios";
import {UseAuth} from "../../../Services/AuthProvider/AuthProvider";
import {kDriverData, setKDriverData} from "../kDriverData";

export const HistoryPageDriver = ()=>{
    const { email } = UseAuth();
    let [driverData, setDriverData] = useState(null);
    let [isLoading, setIsLoading] = useState(true);
    useEffect(()=> {
        if(Object.keys(kDriverData).length === 0) {
            axios.get(process.env.REACT_APP_API + "/Driver/getDriverByEmail/" + email)
                .then((response) => {
                    let data = response.data.rides.sort((a, b) => {
                        if (a.status === 'cancelled' && b.status !== 'cancelled') {
                            return 1; // Move cancelled rides to the end
                        } else if (a.status !== 'cancelled' && b.status === 'cancelled') {
                            return -1; // Keep non-cancelled rides before cancelled rides
                        } else {
                            return 0; // Maintain the current order for other statuses
                        }
                    });
                    setDriverData({ ...response.data,rides:data.filter(ride => (ride.status !== 'ongoing' && ride.status !== 'pending'))});
                    setKDriverData(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching driver data:", error);
                    setIsLoading(false);
                });
        }else{
        let data = kDriverData.rides.sort((a, b) => {
                if (a.status === 'cancelled' && b.status !== 'cancelled') {
                    return 1; // Move cancelled rides to the end
                } else if (a.status !== 'cancelled' && b.status === 'cancelled') {
                    return -1; // Keep non-cancelled rides before cancelled rides
                } else {
                    return 0; // Maintain the current order for other statuses
                }
            });
            setDriverData({ ...driverData,rides:data.filter(ride => (ride.status !== 'ongoing' && ride.status !== 'pending'))
            });
            setIsLoading(false);
        }
    }, [email]);
    if(!isLoading)
    {
        return(
            <div className='grid-container' style={{marginTop:"5%"}}>
                {driverData.rides.map(ride => (
                    <div className="card-1 ridesCard">
                        <div className="card-body">
                            <div className="card-text-1 from-to"><strong>From: </strong>{ride["from"]}
                                <strong style={{marginLeft: "20px"}}>To:</strong> {ride["to"]}</div>
                            <p className="card-text-1"><strong>Passenger Email:</strong> {ride["passangerEmail"]}</p>
                            <p className="card-text-1"><strong>Driver Email:</strong> {ride["driverEmail"]}</p>
                            <p className="card-text-1"><strong>Date:</strong> {ride["date"]}</p>
                            <p className="card-text-1"><strong>Status:</strong> {ride["status"]}</p>
                            <p className="card-text-1"><strong>Price:</strong> {ride["price"].toFixed(2)}</p>
                            {ride["status"] === "paid" && (<><p className="card-text-1"><strong>Rating:</strong> {ride["rating"]}</p>
                                </>)}
                        </div>
                    </div>
                ))}
            </div>)
    }


}
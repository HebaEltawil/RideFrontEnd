import './css/style.css';
import './css/all.min.css';
import './css/bootstrap.min.css';
import {useEffect, useState} from "react";
import {kUpdateId,kIsUpdated,clearUpdates} from "../updateRideGlobal";
import axios from "axios";

function estimateTimeBetweenCoordinates(startLat, startLon, endLat, endLon) {
    // Convert latitude and longitude values to radians
    const startLatRad = startLat * Math.PI / 180;
    const endLatRad = endLat * Math.PI / 180;
    const deltaLon = (endLon - startLon) * Math.PI / 180;

    // Haversine formula
    const earthRadius = 6371; // Earth's radius in kilometers
    const distance = Math.acos(
        Math.sin(startLatRad) * Math.sin(endLatRad) +
        Math.cos(startLatRad) * Math.cos(endLatRad) * Math.cos(deltaLon)
    ) * earthRadius;

    // Assuming a constant speed of, say, 50 km/h
    const speed = 50; // in km/h
    const estimatedTimeHours = distance / speed;
    const estimatedTimeMinutes = estimatedTimeHours * 60;

    return estimatedTimeMinutes.toFixed(1);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Earth's radius in kilometers

    // Convert latitude and longitude values from degrees to radians
    const lat1Rad = lat1 * Math.PI / 180;
    const lon1Rad = lon1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    const lon2Rad = lon2 * Math.PI / 180;

    // Calculate differences in latitude and longitude
    const deltaLat = lat2Rad - lat1Rad;
    const deltaLon = lon2Rad - lon1Rad;

    // Haversine formula
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance.toFixed(1); // Distance in kilometers
}

export const Rides = ({driverData}) => {
    let [localDriverData, setLocalDriverData] = useState(driverData);
    let [isActive, setIsActive] = useState(false);
    function acceptRide(id)
    {
        const updatedRides = localDriverData.rides.map(ride => {
            if (ride.id === id) {
                return { ...ride, status: 'ongoing',Availability: false };
            }
            return ride;
        });
        const updatedDriverData = { ...localDriverData, rides: updatedRides };
        setLocalDriverData(updatedDriverData);
        axios.patch(process.env.REACT_APP_API + "/Driver/acceptRide", null, {
            params: {
                id:id
            }
        }).catch(reason => {
            const updatedRides = localDriverData.rides.map(ride => {
                if (ride.id === id) {
                    return { ...ride, status: 'pending',Availability: true};
                }
                return ride;
            });
            const updatedDriverData = { ...localDriverData, rides: updatedRides };
            setLocalDriverData(updatedDriverData);
        })
        setIsActive(true);
    }
    function rejectRide(id)
    {
        const updatedRides = localDriverData.rides.map(ride => {
            if (ride.id === id) {
                return { ...ride, status: 'cancelled',Availability: true };
            }
            return ride;
        });
        const updatedDriverData = { ...localDriverData, rides: updatedRides };
        setLocalDriverData(updatedDriverData);
        axios.patch(process.env.REACT_APP_API + "/Driver/rejectRide", null, {
            params: {
                id:id
            }
        }).catch(reason => {
            const updatedRides = localDriverData.rides.map(ride => {
                if (ride.id === id) {
                    return { ...ride, status: 'pending',Availability: true};
                }
                return ride;
            });
            const updatedDriverData = { ...localDriverData, rides: updatedRides };
            setLocalDriverData(updatedDriverData);
        })
    }
    function endRide(id)
    {
        const updatedRides = localDriverData.rides.map(ride => {
            if (ride.id === id) {
                return { ...ride, status: 'done',Availability: true };
            }
            return ride;
        });
        const updatedDriverData = { ...localDriverData, rides: updatedRides };
        setLocalDriverData(updatedDriverData);
        setIsActive(false);
        axios.patch(process.env.REACT_APP_API + "/Driver/endRide", null, {
            params: {
                id:id
            }
        }).catch(reason => {
            const updatedRides = localDriverData.rides.map(ride => {
                if (ride.id === id) {
                    return { ...ride, status: 'ongoing',Availability: false};
                }
                return ride;
            });
            const updatedDriverData = { ...localDriverData, rides: updatedRides };
            setLocalDriverData(updatedDriverData);
            setIsActive(false);
        })
    }
    function checkActive() {
        for (const ride of localDriverData.rides) {
            if (ride.status === 'ongoing') {
                setIsActive(true);
                break;
            }
        }
    }
    useEffect(() => {
        if (driverData.rides.length > localDriverData.rides.length) {
            const newRides = driverData.rides.filter(
                ride => !localDriverData.rides.some(localRide => localRide.id === ride.id)
            );
            setLocalDriverData(prevState => ({
                ...prevState,
                rides: [...prevState.rides, ...newRides]
            }));
        }else if(kIsUpdated && kUpdateId !=="")
        {
            setLocalDriverData(prevDriverData => ({
                ...prevDriverData,
                rides: prevDriverData.rides.map(ride => {
                    if (ride.id === kUpdateId) {
                        return driverData.rides.find(ride => ride.id === kUpdateId);
                    }
                    return ride;
                })
            }));
            clearUpdates();
        }
        checkActive();
    }, [driverData]);

    return (
        <div style = {isActive ? {marginTop: "28%"} : null}>
            {localDriverData.rides.map((ride) => (
                 (isActive && ride.status !== 'ongoing') || (!isActive && ride.status !== 'pending') ? null:
                    <div className="w-100 cardd mb-3">
                        <div className="border border-4 border-info rounded-4 w-100 h-auto">
                            <div className="row h-100 w-100 p-0 m-0">
                                <div className="col-2">
                                    <div className="">
                                        <div className="mt-2 text-center">
                                            <img
                                                src={require("./images/driver.jpg")}
                                                className="" style={{height: '70px', width: '70px', borderRadius: '50%'}}
                                                alt=""/>
                                        </div>
                                        <div className="w-100 mx-auto text-center bg-info">

                                        </div>
                                    </div>
                                </div>
                                <div className="col-8 p-2 h-100 text-start">
                                    <h3 className="mb-0 pb-0 ms-2 fw-bold"
                                        style={{color: '#5ed1d1', display: 'inline'}}>{ride['passanger']['userName'] === undefined? ride['passanger']['UserName'] : ride['passanger']['userName']}</h3>
                                    {driverData.smoking ?
                                        (<span><i className="fa-solid fa-ban-smoking fs-2 ms-4 mt-1"
                                                  style={{color: 'black'}}></i></span>) : null}
                                    <p style={{color: '#5ed1d1'}} className="mb-0 ms-2 fw-bolder">{calculateDistance(ride['lat1'], ride['long1'], ride['lat2'], ride['long2'])} Km ahead</p>
                                    <div className="row d-flex flex-nowrap w-100">
                                        <div className="col-1">
                                            <img src={require('./images/Screenshot (31).png')} alt=""/>
                                        </div>
                                        <div className="col-11 p-1 ms-3">
                                            <p className="mb-1">{ride.from}</p>
                                            <p className="mb-1">{ride.to}</p>
                                        </div>
                                    </div>
                                    {!(isActive && ride.status ==='ongoing') ? (<div className="form-group d-flex justify-content-between">
                                        <button className="btn login_btn btn-sm" style={{marginRight: '5px'}}
                                                onClick={() => acceptRide(ride.id)}>Accept Ride
                                        </button>
                                        <button className="btn login_btn btn-sm" style={{backgroundColor: '#e75e5e'}}
                                                onClick={() => rejectRide(ride.id)}>Reject Ride
                                        </button>
                                    </div>) : (
                                        <button className="btn login_btn btn-sm" style={{marginRight: '5px'}}
                                                onClick={() => endRide(ride.id)}>End Ride
                                        </button>)}

                                </div>
                                <div className="col-2" style={{color: '#5ed1d1'}}>
                                    <p className="fs-4 fw-bold mb-0 pb-0">
                                        {ride['price']} L.E
                                    </p>
                                    <p>{estimateTimeBetweenCoordinates(ride['lat1'], ride['long1'], ride['lat2'], ride['long2'])} mins</p>
                                </div>
                            </div>
                        </div>
                    </div>
            ))}
        </div>
    )
}

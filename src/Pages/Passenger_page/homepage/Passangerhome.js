import { useEffect, useState } from "react";
import { UseAuth } from "../../../Services/AuthProvider/AuthProvider";
import axios from "axios";
import { removeRideData, rideData,rideGoing,  setRideData,  setRideGoing } from "../data";
import { PassengerPage } from "../drivers_page/passenger_page";
import { ReservationRide } from "../ride/reservation_ride";
import Connection from '../../../Services/SignalR/SignalRConnection'
export const PassangerHomePage = ()=>{
    const {email,token} = UseAuth();
    const passengerEmail = email;
    const [rideTrigger, setTrigger] = useState(false);
    const connection = Connection;
    // const rideGoing=localStorage.getItem('rideGoing')
    

        useEffect(()=>{
            console.log('innnnnnnnnnnnnnnnnnnnnnn');
            removeRideData();
            setRideGoing(null);
            console.log(token);
            axios.get(process.env.REACT_APP_API+"/Passanger/getPassengerByEmail/"+passengerEmail,{headers: {"Authorization" : "Bearer "+token} })
            .then(e=>{console.log(e.data);
            // if (e.data['rides'] !== null) {
            setRideData( e.data['rides']?.map(element => {
                if((element.status!=="paid"&&element.status!=="cancelled")&& rideGoing==null){
                    setRideGoing(element);
                    console.log(element);
                }
                return element;
            }));
            setTrigger(prev=>!prev);
            // }
            console.log(rideData);
            connection.passWatchRideUpdated(email, ride => {
                setTrigger(prev=>!prev);
              });
        })

        },[email])

  

    return (
        <>
        {rideGoing==null ?(<PassengerPage/>):(<ReservationRide />)}
        </>
    );
};



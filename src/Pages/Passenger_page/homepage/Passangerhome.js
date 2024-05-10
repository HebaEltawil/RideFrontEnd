import { useEffect, useState } from "react";
import { UseAuth } from "../../../Services/AuthProvider/AuthProvider";
import axios from "axios";
import { removeRideData, rideData,rideGoing,  setRideGoing } from "../data";
import { PassengerPage } from "../drivers_page/passenger_page";
import { ReservationRide } from "../ride/reservation_ride";

export const PassangerHomePage = ()=>{
    const {email,token} = UseAuth();
    const passengerEmail = email;
    const [rideTrigger, setTrigger] = useState(false);
    // const rideGoing=localStorage.getItem('rideGoing')
    

        useEffect(()=>{
            removeRideData();
            setRideGoing(null);
            console.log(token);
            axios.get(process.env.REACT_APP_API+"/Passanger/getPassengerByEmail/"+passengerEmail,{headers: {"Authorization" : "Bearer "+token} })
            .then(e=>{console.log(e.data);
            // if (e.data['rides'] !== null) {
                e.data['rides']?.map(element => {

                if((element.status!=="paid"&&element.status!=="cancelled")&& rideGoing==null){
                    setRideGoing(element);
                    setTrigger(!rideTrigger);
                    console.log(1);
                }
                console.log(rideGoing);
                rideData.push(element);
                console.log(rideData);
                console.log(element.id);
                return 1;
            })
            // }
            console.log(rideData);

        })

        },[email])

  

    return (
        <>
        {rideGoing==null ?(<PassengerPage/>):(<ReservationRide />)}
        </>
    );
};



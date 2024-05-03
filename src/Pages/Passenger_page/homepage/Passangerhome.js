import { useEffect, useState } from "react";
import { UseAuth } from "../../../Services/AuthProvider/AuthProvider";
import axios from "axios";
import { removeRideData, rideData,rideGoing,  setRideGoing } from "../data";
import { PassengerPage } from "../drivers_page/passenger_page";
import { ReservationRide } from "../ride/reservation_ride";

export const PassangerHomePage = ()=>{
    const {email} = UseAuth();
    const passengerEmail = email;
    const [rideTrigger, setTrigger] = useState(false);
    // const rideGoing=localStorage.getItem('rideGoing')
    const rideID= localStorage.getItem('rideId');

        useEffect(()=>{
            removeRideData();
            setRideGoing(null);
            axios.get(process.env.REACT_APP_API+"/Passanger/getPassengerByEmail/"+passengerEmail)
            .then(e=>{console.log(e.data);
            // if (e.data['rides'] !== null) {
                e.data['rides']?.map(element => {
                if((element.status!="paid"&&element.status!="cancelled")&& rideGoing==null){
                    setRideGoing(element);
                    setTrigger(!rideTrigger);
                    console.log(1);
                }
                console.log(rideGoing);
                rideData.push(element);
                console.log(rideData);
                console.log(element.id);
                
            })
            // }
            console.log(rideData);
        })
        },[email])

        // useEffect(() => {
        //     const fetchPassengerData = async () => {
        //       try {
        //         removeRideData();
        //         setRideGoing(null);
        
        //         const response = await axios.get(process.env.REACT_APP_API+"/Passanger/getPassengerByEmail/"+passengerEmail);
        //         const passenger = response.data;
        
        //         const ongoingRide = passenger.rides?.find(
        //             (ride) => ['pending', 'ongoing', 'done'].includes(ride.status) && ride.id === rideID
        //           );

        //          setRideGoing(ongoingRide); 
        //          if(!ongoingRide){
        //             setRideGoing(null);
        //          }
                // if (passenger.rides && Array.isArray(passenger.rides)) {
                //   passenger.rides.forEach((element) => {
                //     if (
                //       (element.status !== 'paid' && element.status !== 'cancelled') &&
                //       rideGoing == null && element.id === rideID
                //     ) {
                //       setRideGoing(element);
                //       setTrigger(!rideTrigger);
                      
                //     }
        
                //     rideData.push(element);
                //   });
                // }
                // console.log(rideData);
                // console.log(rideGoing);
                // setLoading(false); // Data has been loaded
        //       } catch (err) {
        //         console.error('Error fetching passenger data:', err);
        //         // setError(err);
        //         // setLoading(false);
        //       }
        //     };
        
        // fetchPassengerData();
        // }, [email]);


    // useEffect(() => {
    // // removeRideData();
    // fetchPassengerData(); // Fetch initially
    // const intervalId = setInterval(() => {
    //     // setRide(currentRide);
    //     // removeRideData();
    //     fetchPassengerData(); // Re-fetch every 10 seconds
    // }, 2000); // Adjust the polling interval as needed

    // return () => clearInterval(intervalId); // Cleanup interval on component unmount
    // }, [email]); // Depend on email to refetch if email changes      

    return (
        
        <>
        {rideGoing==null ?(<PassengerPage/>):(<ReservationRide />)}
        </>
    );

    // if (rideGoing !==null) {
    //     return <ReservationRide  />;
    //   }
    
    //   // If there's no ongoing ride (status is paid or cancelled), show the passenger page
    //   else{return <PassengerPage />;}


};


// .then((response) => {
//     const passenger = response.data;

    // if (passenger.rides && Array.isArray(passenger.rides)) {
//       passenger.rides.forEach((element) => {
//         if (
//           (element.status !== "paid" || element.status !== "cancelled") &&
//           rideGoing == null
//         ) {
//           setRideGoing(element);
//           setTrigger(!rideTrigger);
//         }
//         console.log(rideGoing);
//         rideData.push(element);
//         console.log(rideData);
//       });
//     }
//   })
//   .catch((error) => {
//     console.error("Error fetching passenger data:", error);
//   });
// }, []);
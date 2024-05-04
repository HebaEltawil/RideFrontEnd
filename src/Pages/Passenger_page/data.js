// import { Rating } from "@mui/material";

let rideData=[];
let rideGoing  = null;
let rating , smoking ,userName,rideId;

const removeRideData = () => {

    rideData=[];
}
const setRideGoing = (e)=>{
    rideGoing = e;
    // localStorage.setItem('rideGoing',e)
}
const setDriverSmoking = (e)=>{
    // smoking = e;
    localStorage.setItem('smoking',e);
}
const setDriverRating = (e)=>{
    // rating = e;
    localStorage.setItem('rating',e);
}
const setDriverUserName = (e)=>{
    // userName = e;
    localStorage.setItem('userName',e);
}

const setrideId = (e)=>{
    // rideId = e;
    localStorage.setItem('rideId',e);
}

const setfrom = (e)=>{
    // rideId = e;
    localStorage.setItem('from',e);
    
    
}

const setto = (e)=>{
    // rideId = e;
    localStorage.setItem('to',e);
}

const setimagePath = (e)=>{
    // rideId = e;
    localStorage.setItem('imagePath',e);
}

export {rideData,removeRideData,rideGoing,setRideGoing,setimagePath,
setDriverRating,setDriverSmoking,setDriverUserName,setrideId,setfrom,setto};




// import React, { createContext, useContext, useState } from 'react';


// // 1. Create a context to store the shared data
// const RideContext = createContext();

// // 2. Define a provider component to manage and provide the shared state
// export const RideProvider = ({ children }) => {
//     let rideData=[];
// // let rideGoing  = null;
//     const removeRideData = () => {

//         rideData=[];
//     }
// // const setRideGoing = (e)=>{
// //     rideGoing = e;
// // }
//   const [rideGoing, setRideGoing] = useState(null);
//   const [rating, setRating] = useState(null);
//   const [smoking, setSmoking] = useState(null);
//   const [userName, setUserName] = useState(null);

//   return (
//     <RideContext.Provider
//       value={{ rideGoing, setRideGoing, rating, setRating, smoking, setSmoking, userName, setUserName,rideData,removeRideData,rideGoing,setRideGoing }}
//     >
//       {children}
//     </RideContext.Provider>
//   );
// };

// // 3. Custom hook to use the Ride context
// export const useRide = () => useContext(RideContext);
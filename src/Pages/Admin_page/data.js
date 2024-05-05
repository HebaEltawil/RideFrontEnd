let drivers =[];
let blockedDrivers=[];
let accountsPending=[];
let allRides=[];
let allDrivers =[];
const clear= ()=>{
    drivers=[];
    blockedDrivers=[];
}
const removeDriver =(index)=>{
    drivers.splice(index,1);
}
const removeBlock =(index)=>{
    blockedDrivers.splice(index,1);
}
const sortDriver =()=>{
    drivers.sort((a, b) => a["rating"] - b["rating"]);
}
const sortBlockedDriver =()=>{
    blockedDrivers.sort((a, b) => a["rating"] - b["rating"]);
} 
const clearAccount= ()=>{
    accountsPending=[];
}
const removeAccount =(index)=>{
    accountsPending.splice(index,1);
}
const clearAllRides= ()=>{
    allRides=[];
}
const clearAllDrivers= ()=>{
    allDrivers=[];
}
export {drivers,blockedDrivers,clear,removeDriver,removeBlock,sortDriver,sortBlockedDriver,accountsPending,clearAccount,removeAccount,clearAllRides,allRides,allDrivers,clearAllDrivers};
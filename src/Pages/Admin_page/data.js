let drivers =[];
let blockedDrivers=[];

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
export {drivers,blockedDrivers,clear,removeDriver,removeBlock,sortDriver,sortBlockedDriver};
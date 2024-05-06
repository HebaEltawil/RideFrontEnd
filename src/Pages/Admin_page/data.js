let drivers =[];
let blockedDrivers=[];
let accountsPending=[];
let allRides=[];
let allDrivers =[];
const clear= ()=>{
    drivers=[];
    blockedDrivers=[];
}
function customSortingFunction(a, b) {
    const statusOrder = { 'pending': 0, 'ongoing': 1, 'done': 2, 'paid': 3,'cancelled':4 };
    const statusA = a.status;
    const statusB = b.status;

    if (statusOrder[statusA] < statusOrder[statusB]) {
        return -1;
    } else if (statusOrder[statusA] > statusOrder[statusB]) {
        return 1;
    } else {
        return 0;
    }
}
const sortallRides = ()=>{
    allRides = allRides.sort(customSortingFunction);
}
const updateRide= (id,status) =>
{
    allRides.map(e => {
        if(id === e['id'] )
            {
                e['status'] = status;
            }
    })
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
export {drivers,blockedDrivers,clear,removeDriver,removeBlock,sortDriver,sortBlockedDriver,updateRide,accountsPending,clearAccount,removeAccount,clearAllRides,allRides,allDrivers,clearAllDrivers,sortallRides};
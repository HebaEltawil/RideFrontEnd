import { allRides,allDrivers } from '../../data';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import '../AllRidesStyle.css';
import { DropdownButton, DropdownItem } from 'react-bootstrap';

export const RidesCard = ()=>{
    
    const [driverName,setDriverName] =useState('')
    const [driverEmail,setDriverEmail] =useState('');
    const [driversName,setDrivers]= useState([]);
    console.log(allDrivers)
    
    useEffect(()=>{
        console.log(allDrivers.length)
        const temp = allDrivers.map((item)=>{console.log(item);return(
            <option value={item.username+','+item.email}>
                {item.username} | {item.email}
                </option>)})
        setDrivers(temp)
        console.log(temp)
    },[])
console.log(driversName);
console.log(driverName);
console.log(driverEmail);

return <>{allRides.length === 0?(<div style={{height:"100vh",width:"100%",textAlign:"center",alignContent:"center"}}>
<p style={{color:"#5ed1d1"}}>No Rides Yet</p>
</div>): <div>
    <div style={{padding:"10px"}}>
    <select className='selectRide' onChange={(e)=>{
        const value= e.target.value.split(',')
        setDriverName(value[0]);setDriverEmail(value[1])
    }} style={{borderStyle:"outset"}}>
        <option value=",">Select Driver</option>
        {driversName}</select>
    </div>
<div className='grid-container'>
{allRides.filter((item) =>{
        return driverName === 'Driver Name' ? item : item.driverEmail.includes(driverEmail);
    }).map((item)=>{
    return <div className="card-1 ridesCard" >
    <div className="card-body">
        <div className="card-text-1 from-to"><strong>From: </strong>{item.from} 
            <strong style={{marginLeft:"20px"}}>To:</strong> {item.to}</div>
        <p className="card-text-1" ><strong >Passenger Email:</strong> {item.passangerEmail}</p>
        <p className="card-text-1" ><strong >Driver Email:</strong> {item.driverEmail}</p>
        <p className="card-text-1" ><strong >Date:</strong> {item.date}</p>
        <p className="card-text-1" ><strong >Status:</strong> {item.status}</p>
        <p className="card-text-1" ><strong >Price:</strong> {item.price.toFixed(2)}</p>
        <p className="card-text-1" ><strong >Car Type:</strong> {item.driver.carType}</p>
    </div>
    </div>
})}
</div>
</div>
}
</>
}
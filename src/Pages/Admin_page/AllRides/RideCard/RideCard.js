import { allRides,allDrivers,sortallRides, updateRide } from '../../data';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import '../AllRidesStyle.css';
import * as signalR from '@microsoft/signalr';
import Connector from '../../../../Services/SignalR/SignalRConnection'

export const RidesCard = ()=>{
    
    const [driverName,setDriverName] =useState('')
    const [driverEmail,setDriverEmail] =useState('');
    const [driversName,setDrivers]= useState([]);
    const [,setTrigger] = useState(false);
    console.log(allDrivers)
    const connector = Connector;
    useEffect(()=>{
        connector.onRidesUpdated(rideToparse => { 
        console.log(rideToparse);
        if(rideToparse['type'] === 'rideCreated')
            {
                const ride = JSON.parse(rideToparse['data']);
                const rideToadd = {};
                console.log(JSON.parse(rideToparse['data']));
                for (const key in ride) {
                    if (Object.hasOwnProperty.call(ride, key)) {
                        const lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
                        rideToadd[lowerCaseKey] = ride[key];
                    }
                }
                allRides.push(rideToadd);
                sortallRides();
                setTrigger(prev => !prev);
            }
            else{
                const ride = JSON.parse(rideToparse['data']);
                updateRide(ride['Id'],ride['Status'])
                sortallRides();
                setTrigger(prev => !prev);
            }
      });
     console.log(allDrivers.length)
        const temp = allDrivers.map((item)=>{console.log(item);return(
            <option value={item.username+','+item.email} key={Math.random().toString(36).substr(2, 9)}>
                {item.username} | {item.email}
                </option>)})
        setDrivers(temp)
        console.log(temp);
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
        <option value="," key={Math.random().toString(36).substr(2, 9)}>Select Driver</option >
        {driversName}</select>
    </div>
<div className='grid-container'>
{allRides.filter((item) =>{
        return driverName === 'Driver Name' ? item : item.driverEmail.includes(driverEmail);
    }).map((item)=>{
    return <div className="card-1 ridesCard" key={Math.random().toString(36).substr(2, 9)}>
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
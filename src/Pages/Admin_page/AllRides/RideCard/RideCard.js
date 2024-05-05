import { allRides,allDrivers } from '../../data';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import '../AllRidesStyle.css';
import { DropdownButton, DropdownItem } from 'react-bootstrap';

export const RidesCard = ()=>{
    
    const [driverName,setDriverName] =useState('')
    const [driverEmail,setDriverEmail] =useState('');
    let driversName = allDrivers.map((item)=>(
    <DropdownItem onClick={() => {setDriverName(item.username);setDriverEmail(item.email)}}>
        {item.username}
        </DropdownItem>)) 
    // const filter =()=>{
    //     return (
    //         <select
    //     name="select"
    //     className="border border-3 border-black rounded-3"
    //     style={{ width: "300px", height: "45px" }}
    //     onChange={(event) => {
    //         const name = event.target.value;
    //         setDriverName(name);
    //     }}>
    //         <optgroup defaultValue="">
    //             <option value="" className="fs-5">Going To</option>
    //         </optgroup>
    //         <optgroup label={driverName}>
    //          {allDrivers.map((item)=>{
    //             return <option  value={item.username}>
    //             {item.username}
    //           </option>
    //          })}
                
    //         </optgroup>
    //     </select>
        
    //     )
    // }
    useEffect(()=>{
    
    },[])
console.log(driversName);
console.log(driverName);
console.log(driverEmail);

return <>{allRides.length === 0?(<div style={{height:"100vh",width:"100%",textAlign:"center",alignContent:"center"}}>
<p style={{color:"#5ed1d1"}}>No Rides Yet</p>
</div>): <div>
<DropdownButton title={driverName} style={{marginLeft:"10px"}}>
{driversName}
</DropdownButton>
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
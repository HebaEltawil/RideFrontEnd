import { allRides } from '../../data';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import '../AllRidesStyle.css'

export const RidesCard = ()=>{
    let [cards,setCards]= useState([]);
    useEffect(()=>{
        ridesCard();
        console.log(cards);
    },[])

    const ridesCard =()=>{
        let temp=[];
        console.log(temp);
        console.log(allRides);
        for (const key in allRides) {
            let ride = allRides[key];
            console.log(ride);
            temp.push(<div class="card-1 ridesCard" >
            <div className="card-body">
                <div className="card-text-1 from-to"><strong>From: </strong>{ride["from"]} 
                    <strong style={{marginLeft:"20px"}}>To:</strong> {ride["to"]}</div>
                <p className="card-text-1" ><strong >Passenger Email:</strong> {ride["passangerEmail"]}</p>
                <p className="card-text-1" ><strong >Driver Email:</strong> {ride["driverEmail"]}</p>
                <p className="card-text-1" ><strong >Date:</strong> {ride["date"]}</p>
                <p className="card-text-1" ><strong >Status:</strong> {ride["status"]}</p>
                <p className="card-text-1" ><strong >Price:</strong> {ride["price"]}</p>
                <p className="card-text-1" ><strong >Car Type:</strong> {ride["driver"]["carType"]}</p>
            </div>
            </div>
            
        )
    }
        setCards(temp);
        console.log(temp);
        console.log(cards);

}

return <>{cards.length === 0?(<div style={{height:"100vh",width:"100%",textAlign:"center",alignContent:"center"}}>
<p style={{color:"#5ed1d1"}}>No Rides Yet</p>
</div>):<div className='grid-container'>
{cards}
</div>}
</>
}
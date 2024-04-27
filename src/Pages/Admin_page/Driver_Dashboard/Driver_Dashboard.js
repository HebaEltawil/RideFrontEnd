import './media.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from '../../../Assets/img/thumb-cristiano-ronaldo-in-jump-4k-red-neon-lights-cr7-football-stars.jpg';
import img2 from '../../../Assets/img/pngtree-vector-star-icon-png-image_1577370.jpg';
import { blockedDrivers, drivers,removeDriver,sortDriver } from '../data';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export const DriverDashboard = ()=> {
    let [cards,setCards]= useState([]);
    let [blocktrigger,setBlockTrigger]= useState(false);
    let block =(driver,index)=>{
        driver["blocked"]=true;
        const email = driver["email"];
        console.log(email);
        axios.post(process.env.REACT_APP_API +"/Admin/blockDriver",{},{params:{email:email}}).then(()=>{
            blockedDrivers.push(drivers[index]);
            removeDriver(parseInt(index));
            setBlockTrigger(!blocktrigger);
        })
    }
    useEffect(()=>{
        driverCards();
        console.log(cards);
    },[blocktrigger]);
    const driverCards = ()=>{
        let temp=[];
        console.log(temp);
        console.log(drivers);
        for (const key in drivers) {
            let driver=drivers[key];
            console.log(driver);
            let income=0;
            let trips=0;
            if(driver["rides"]){
                let rides= driver["rides"]
                for(const k in rides){
                    if(rides[k]["status"] === "paid"){
                        income = income + rides[k]["price"];
                    }
                    if(rides[k]["status"] === "paid" || rides[k]["status"] === "done"){
                        trips+=1;
                    }
                    
                }
            }
            temp.push(<div className="container">
            <div className=" border border-4 border-info rounded-4 w-75 h-auto boarderpadding " >
                <div className="row h-100 w-100 p-0 m-0">
                    <div className="col-2 ">
                        <div className="position-relative ">
                        <FontAwesomeIcon icon={faUserCircle} className="rounded-circle w-100 mt-2" size='7x' />
                            <div className="w-100  h-25 rating_div position-absolute bottom-0">
                                <div className="d-flex justify-content-center">
                                    <FontAwesomeIcon icon={faStar} style={{margin:"6px 0 auto 0",color:"#FFD700"}}/>
                                    <h4 className="fw-bold text-white ps-1 pe-2">{driver["rating"]}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8 p-2 ">
                        <h3 className="mb-0 pb-0 ms-2" style={{color: "#5ed1d1"}}>{driver["username"]}</h3>
                        <p style={{color: "#5ed1d1"}} className="fs-3 mb-0 pb-0 ">Total Trips: {trips} </p>
                            {driver["rating"] <2 &&
                            <input type="button" value="Block" className="btn btn-danger" onClick={()=>{block(driver,key)}}/>}
                    </div>
                    <div className="col-2 " style={{color: "#5ed1d1"}}>
                        <p className="fs-3 fw-bold mb-0 pb-0">
                            {income.toFixed(2)}
                        </p>
                        <p className="">{driver["availability"]? "Available": "Not Available"}</p>
                        <Button className="btn btn-info">Feedback</Button>
                        
                    </div>
                </div>
            </div>
            <br/>
        </div>
        )
        }
        setCards(temp);
        console.log(temp);
    }
    return <>
    <body>
    <div style={{margin:"0 20px 0 auto",display:"flex",justifyContent:"end"}} >
    <button className='btn btn-warning' onClick={()=>{sortDriver();setBlockTrigger(!blocktrigger)}}>Sort</button>
    </div>
    
    <div className='main'>    
    {cards}
    </div>
</body> 
    </>

}
import './media.css';
import './blockStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { blockedDrivers, drivers,removeBlock,sortBlockedDriver } from '../data';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export const BlocksPage = ()=> {
    let [cards,setCards]= useState([]);
    let [blocktrigger,setBlockTrigger]= useState(false);
    let unBlock =(driver,index)=>{
        driver["blocked"]=true;
        const email = driver["email"];
        console.log(email);
        axios.post(process.env.REACT_APP_API +"/Admin/unBlockDriver",{},{params:{email:email}}).then(()=>{
            drivers.push(blockedDrivers[index]);
            removeBlock(parseInt(index));
            setBlockTrigger(!blocktrigger);
        })
    }
    useEffect(()=>{
        driverCards();
        console.log(cards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[blocktrigger]);
    const driverCards = ()=>{
        let temp=[];
        console.log(temp);
        console.log(drivers);
        for (const key in blockedDrivers) {
            let driver=blockedDrivers[key];
            console.log(driver);
            let income=0;
            let trips=0;
            if(driver["rides"]){
                let rides= driver["rides"];
                let feedback=[];
                for(const k in rides){
                    if(rides[k]["status"] === "paid"){
                        income = income + rides[k]["price"];
                    }
                    if(rides[k]["status"] === "paid" || rides[k]["status"] === "done"){
                        trips+=1;
                    }
                    if(rides[k]["status"] === "paid"){
                    feedback.push(
                        <Popover.Body>
                            <strong>Trip's ID:</strong> {rides[k]["id"]}<br/>
                            <strong>Trip's Rating:</strong> {rides[k]["rate"]}<br/>
                            <strong>Trip's Feedback:</strong> {rides[k]["feedback"]}<br/>
                            <strong>Passenger Email:</strong> {rides[k]["passangerEmail"]}<br/>
                            <strong>Passenger Name:</strong> {rides[k]["passanger"]["userName"]}<br/>
                            <strong>Trip's Status:</strong> {rides[k]["status"]}<br/>
                        </Popover.Body>
                    );
                }
                }
                var popover=( <Popover id="popover-positioned-bottom">
                    {feedback.length === 0 ?
                <Popover.Body>
                    <strong>No Feedback Yet</strong>
                </Popover.Body>
            : feedback}</Popover>)
                
            }
            else{
                popover = (
                    <Popover id="popover-positioned-bottom">
                        <Popover.Body>
                            <strong>No Trips Yet</strong>
                        </Popover.Body>
                    </Popover>
                );
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
                            <input type="button" value="Unblock" className="btn btn-success" onClick={()=>{unBlock(driver,key)}}/>}
                    </div>
                    <div className="col-2 " style={{color: "#5ed1d1"}}>
                        <p className="fs-3 fw-bold mb-0 pb-0">
                            {income.toFixed(2)}
                        </p>
                        <p className="">{driver["availability"]? "Available": "Not Available"}</p>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <Button className="btn btn-info">Feedback</Button>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>
            <br/>
        </div>
        )
        }
        setCards(temp);
        console.log(temp);
        console.log(cards);
    }
    return <> {cards.length === 0?(<div style={{height:"100vh",width:"100%",textAlign:"center",alignContent:"center"}}>
    <p style={{color:"#5ed1d1"}}>No Block Drivers</p>
</div>):<body className='bodyB'>
    <div style={{margin:"0 20px 0 auto",display:"flex",justifyContent:"end"}} >
    <button className='btn btn-warning' onClick={()=>{sortBlockedDriver();setBlockTrigger(!blocktrigger)}}>Sort</button>
    </div>
    <div className='main'>
    {cards}
    </div>
</body> }
</>
}
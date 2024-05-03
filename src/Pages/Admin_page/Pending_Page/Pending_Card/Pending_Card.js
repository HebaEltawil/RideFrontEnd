import './media.css';
import './pandingStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { accountsPending,removeAccount } from '../../data';
import { useEffect, useState } from 'react';
import axios from 'axios';
export const PendingCard = ()=> {
    let [cards,setCards]= useState([]);
    let [trigger,setTrigger]= useState(false);
    let Accept =(email,index)=>{
        axios.post(process.env.REACT_APP_API +"/Admin/acceptAccount",{},{params:{email:email}}).then(()=>{
            removeAccount(parseInt(index));
            setTrigger(!trigger);
        })
    }
    let Reject =(email,index)=>{
        axios.post(process.env.REACT_APP_API +"/Admin/rejectAccount",{},{params:{email:email}}).then(()=>{
            removeAccount(parseInt(index));
            setTrigger(!trigger);
        })
    }

    useEffect(()=>{
        pendingCards();
        console.log(cards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[trigger]);
    const pendingCards = ()=>{
        let temp=[];
        console.log(temp);
        console.log(accountsPending);
        for (const key in accountsPending) {
            let account=accountsPending[key];
            console.log(account);
            if(account["role"] === "Passenger"){
            temp.push(<div style={{alignContent:"start"}}>
            <div className="card" style={{width: "18rem",height:"16rem",backgroundColor:"white",borderColor:"#5ed1d1"}}>
            <div className="cardPadding">
                <h5 className="card-title" style={{color: "#5ed1d1"}}>{account["role"]}</h5>
                <p className="card-text">{account["data"]["userName"]}</p>
                <p className="card-text">{account["data"]["email"]}</p>
            </div>
            <ul className="list-group list-group-flush">
            {account["data"]["gender"] === 0 ? <li  className="list-group-item ">Female</li>
                            :<li  className="list-group-item"> Male </li>}
            </ul>
            <div className="cardPadding">
            <button className="btn btn-danger card-link" onClick={()=>{Reject(account["data"]["email"],key)}}>Reject</button>
            <button className="btn btn-success card-link" onClick={()=>{Accept(account["data"]["email"],key)}}>Accept</button>
            </div>
            </div>
            </div>
        )
    }
    else{
        temp.push(
    <div style={{padding:"0"}}>
    <div className="card" style={{width: "18rem",backgroundColor:"white",borderColor:"#5ed1d1"}}>
    <div className="card-body">
        <h5 className="card-title" style={{color: "#5ed1d1"}}>{account["role"]}</h5>
        <p className="card-text">{account["data"]["username"]}</p>
        <p className="card-text">{account["data"]["email"]}</p>
    </div>
    <ul className="list-group list-group-flush">
    {account["data"]["gender"] === 0 ? <li  className="list-group-item ">Female</li>
                        :<li  className="list-group-item"> Male </li>}
        <li className="list-group-item">{account["data"]["city"]}</li>
        <li className="list-group-item">{account["data"]["region"]}</li>
        {account["data"]["smoking"] === false ? <li  className="list-group-item">Non-Smoking</li>
                        :<li className="list-group-item">Smoking</li>}
        <li className="list-group-item">{account["data"]["carType"]}</li>
    </ul>
    <div className="card-body">
    <button className="btn btn-danger card-link"onClick={()=>{Reject(account["data"]["email"],key)}}>Reject</button>
    <button className="btn btn-success card-link" onClick={()=>{Accept(account["data"]["email"],key)}}>Accept</button>
    </div>
    </div>
    </div>

    
        )
    }
        }
        setCards(temp);
        console.log(temp);
    }
    return <>
    {cards.length === 0?(<div style={{height:"100vh",width:"100%",textAlign:"center",alignContent:"center"}}>
        <p style={{color:"#5ed1d1"}}>No Pending Accounts</p>
    </div>):
    (<div className='grid-container'>
    {cards}
    </div>)}
    </>

}



/* <div className="container">
        <div className=" border border-4 border-info rounded-4 w-75 h-auto boarderpadding " >
            <div className="row h-100 w-100 p-0 m-0">
                <div className="col-2 ">
                    <div className="position-relative ">
                        <div className="w-100  h-25 rating_div bottom-0">
                            <div className="d-flex justify-content-center">
                                <h4 className="fw-bold text-white ps-1 pe-2"></h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8 p-2 ">
                    <h3 className="mb-0 pb-0 ms-2" style={{color: "#5ed1d1"}}>UserName: {account["data"]["username"]} </h3>
                    <p style={{color: "#5ed1d1"}} className="fs-3 mb-0 pb-0 ">Email: {account["data"]["email"]} </p>
                    {account["data"]["gender"] === 0 ? <p style={{color: "#5ed1d1"}} className="fs-3 mb-0 pb-0 ">Gender: Female </p>
                    :<p style={{color: "#5ed1d1"}} className="fs-3 mb-0 pb-0 ">Gender: male </p>}
                    <p style={{color: "#5ed1d1"}} className="fs-3 mb-0 pb-0 ">City: {account["data"]["city"]} </p>
                    <p style={{color: "#5ed1d1"}} className="fs-3 mb-0 pb-0 ">Region: {account["data"]["region"]} </p>
                    <p style={{color: "#5ed1d1"}} className="fs-3 mb-0 pb-0 ">Car Type: {account["data"]["carType"]} </p>
                    {account["data"]["smoking"] === false ? <p style={{color: "#5ed1d1"}} className="fs-3 mb-0 pb-0 ">Not Smoking </p>
                    :<p style={{color: "#5ed1d1"}} className="fs-3 mb-0 pb-0 "> Smoking</p>}
                </div>
                <div className="col-2 " >
                    <button className="btn btn-danger">Reject</button><br/>
                    <button className="btn btn-success">Accept</button>
                </div>
            </div>
        </div>
        <br/>
    </div> */
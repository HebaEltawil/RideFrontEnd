import './media.css';
import './dashboardStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { blockedDrivers, drivers,removeDriver,sortDriver } from '../data';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowDownShortWide,faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Popover from 'react-bootstrap/Popover';
import ReactCardFlip from 'react-card-flip';

export const DriverDashboard = ()=> {
    let [search,setSearch] = useState('');
    let [blocktrigger,setBlockTrigger]= useState(false);
    let [isFlipped,setFlipped]= useState({});
    const [count, setCount] = useState({});
    const leftArrow = (index)=>{
        if (count[index] > 0) {
            setCount({ ...count, [index]: count[index] - 1 });
        }
    };
    const rightArrow = (index,length)=>{
        if (count[index] < length - 1) {
            setCount({ ...count, [index]: count[index] + 1 });
        }
    };

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
    },[blocktrigger]);
    return <> {drivers.length === 0 ? (<div style={{height:"100vh",width:"100%",textAlign:"center",alignContent:"center"}}>
    <p style={{color:"#5ed1d1"}}>No Drivers Yet</p>
    </div>):(
<body className='bodyD'>
    <div className="input-group rounded mt-4 w-75 mx-auto" style={{marginBottom:"70px"}}>
        <input type="search" className="form-control rounded border border-3 border-black rounded-3" 
        style={{ height: "50px" }} placeholder="Search" aria-label="Search" 
        aria-describedby="search-addon" 
        onChange={(e)=>setSearch(e.target.value)}/>
        <span className="input-group-text border-0" style={{background: "none"}}>
        <FontAwesomeIcon icon={faArrowDownShortWide} className='ml-xl-5 sortIcon'  size='xl' onClick={()=>{sortDriver();setBlockTrigger(!blocktrigger)}}></FontAwesomeIcon>
        </span>
        
    </div>
    <div className='main'>    
    {drivers.filter((item) =>{
        return search.toLowerCase() === '' ? item : item.username.toLowerCase().includes(search);
    }).map((item,index) => {
        let imageURL= item.imagePath.replace(/\\/g,"/");
        let profileImage = "https://localhost:7115/"+imageURL
        let income=0;
        let trips=0;
        let feedback = [];
        if(!isFlipped.hasOwnProperty(index)){
            isFlipped[index]=false;
        }
        if (!count.hasOwnProperty(index)) {
            count[index]=0;
        }


        if(item.rides){
            let rides= item.rides;
            feedback = item.rides.map((ride,index)=>{
                return <div className='card-f'>
                    <strong>ID:</strong> {ride.id}<br/>
                    <strong>Passenger Email:</strong> {ride.passangerEmail}<br/>
                        <strong>Passenger Name:</strong> {ride.passanger.userName}<br/>
                        <strong>From:</strong> {ride.from}<br/>
                        <strong>To:</strong> {ride.to}<br/>
                        <strong>Date:</strong> {ride.date}<br/>
                        <strong>Price:</strong> {ride.price.toFixed(2)}<br/>
                        <strong>Status:</strong> {ride.status}<br/>
                        <strong>Rating:</strong> {ride.rate}<br/>
                        <strong>Feedback:</strong> {ride.feedback===null? "no feedback": ride.feedback}<br/>
                </div>
            })

            for(const k in rides){
                if(rides[k]["status"] === "paid"){
                    income = income + rides[k]["price"];
                }
                if(rides[k]["status"] === "paid" || rides[k]["status"] === "done"){
                    trips+=1;
                }
            }
        }

        return <ReactCardFlip  isFlipped={isFlipped[index]} flipDirection='vertical'>
        <div className="container">
        <div className=" border border-4 border-info rounded-4 w-75 h-auto boarderpadding " >
            <div className="row h-100 w-100 p-0 m-0">
                <div className="col-2 ">
                    <div className="position-relative ">
                    <img src={profileImage} alt="Profile" className="rounded-circle mt-2" style={{ objectFit: "cover", width: "120px", height: "120px" }} />
                        <div className="w-100  h-25 rating_div position-absolute bottom-0">
                            <div className="d-flex justify-content-center">
                                <FontAwesomeIcon icon={faStar} style={{margin:"6px 0 auto 0",color:"#FFD700"}}/>
                                <h4 className="fw-bold text-white ps-1 pe-2">{item.rating}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8 p-2 ">
                    <h3 className="mb-0 pb-0 ms-2" style={{color: "#5ed1d1"}}>{item.username}</h3>
                    <p style={{color: "#5ed1d1"}} className="fs-3 mb-0 pb-0 ">Total Trips: {trips} </p>
                        {item.rating <2 &&
                        <input type="button" value="Block" className="btn btn-danger" onClick={()=>{block(item,index)}}/>}
                </div>
                <div className="col-2 " style={{color: "#5ed1d1"}}>
                    <p className="fs-3 fw-bold mb-0 pb-0">
                        {income.toFixed(2)}
                    </p>
                    <p className="">{item.availability? "Available": "Not Available"}</p>
                    <Button className="btn btn-info" onClick={()=>{;setFlipped({
            ...isFlipped,
            
                [index]:true
            
        })}}>Feedback</Button>
                </div>
            </div>
        </div>
        <br/>
    </div>
    {/***************** */}
    <div style={{width: "75%", height: "auto"}}> {/* Change width and height properties */}
    <div className="w-100 cardd mb-3" >
        <div className="border border-4 border-info rounded-4 w-100 h-auto">
            <h2 style={{marginLeft: '20px'}}>FeedBack</h2>
            <div className="d-flex align-items-center justify-content-between h-100 p-0 m-0">
                <div className="col-2 d-flex align-items-center arrowIcon" style={{paddingLeft:"120px"}} >
                    <FontAwesomeIcon icon={faChevronLeft} size="xl" onClick={()=>leftArrow(index)}/>
                </div>
                <div className="col-8 p-2 h-100 feedCard">
                    <div  >
                        {feedback[count[index]]}
                    </div>
                </div>
                <div className="col-2 d-flex align-items-center justify-content-end arrowIcon" style={{paddingRight:"120px"}}>
                    <FontAwesomeIcon icon={faChevronRight} size="xl" onClick={()=> rightArrow(index, feedback.length)}/>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-info mr-3 mb-3" style={{marginRight: "20px"}} onClick={()=>{;setFlipped({
            ...isFlipped,
            
                [index]:false
            
        })}}>Driver Information</button>
            </div>
        </div>
    </div>
</div>
    </ReactCardFlip>
    })}
    </div>
</body>)}
    </>
    
}
















//style={{backgroundColor: 'grey', height: '300px', width: '750px'}}
                //if(rides[k]["status"] === "paid"){
                // feedback.push(
                //     <Popover.Body>
                //         <strong>Trip's ID:</strong> {rides[k]["id"]}<br/>
                //         <strong>Trip's Rating:</strong> {rides[k]["rate"]}<br/>
                //         <strong>Trip's Feedback:</strong> {rides[k]["feedback"]}<br/>
                //         <strong>Passenger Email:</strong> {rides[k]["passangerEmail"]}<br/>
                //         <strong>Passenger Name:</strong> {rides[k]["passanger"]["userName"]}<br/>
                //         <strong>Trip's Status:</strong> {rides[k]["status"]}<br/>
                //     </Popover.Body>
                // );
           //
           //     var popover=( <Popover id="popover-positioned-bottom"> {feedback.length !== 0 ? feedback   
        //     : <Popover.Body>
        //     <strong>No Feedback Yet</strong>
        // </Popover.Body>}</Popover>);
        //else{
            //     popover = (
            //         <Popover id="popover-positioned-bottom">
            //             <Popover.Body>
            //                 <strong>No Trips yet</strong>
            //             </Popover.Body>
            //         </Popover>
            //     );
            // }
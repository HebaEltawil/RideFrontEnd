import { useLocation, useNavigate } from "react-router-dom";
import React, {  useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmoking} from '@fortawesome/free-solid-svg-icons';
import { faBanSmoking } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { UseAuth } from "../../../Services/AuthProvider/AuthProvider";
import {  rideGoing,setRideGoing } from "../data";
import './style1.css'
import img_CityRegion from '../../../Assets/img/Screenshot (31).png'
import Connection from '../../../Services/SignalR/SignalRConnection'
import { ImageList } from "@mui/material";



export const ReservationRide = () => {

  const location = useLocation();
  const navigate =useNavigate();

  let [rate,setRate]=useState(rideGoing === null || rideGoing === undefined || Object.keys(rideGoing)? null : rideGoing['driver']['rating']);
  let [smoke,setSmoke]=useState(rideGoing === null || rideGoing === undefined || Object.keys(rideGoing)? null :rideGoing['smoking']);
  let [name,setName] =useState(rideGoing === null || rideGoing === undefined || Object.keys(rideGoing)? null :rideGoing['driver']['username']);
  let [rideID,setRideId]=useState(rideGoing === null || rideGoing === undefined || Object.keys(rideGoing)? null :rideGoing['id']);
  let [image,setImage]=useState(rideGoing === null || rideGoing === undefined || Object.keys(rideGoing)? null :rideGoing['driver']['imagePath']);
  let [from,setFrom]=useState(rideGoing === null || rideGoing === undefined || Object.keys(rideGoing)? null :rideGoing['from']);
  let [to,setTo]=useState(rideGoing === null || rideGoing === undefined || Object.keys(rideGoing)? null : rideGoing['to']);
  const [isPaying, setIsPaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [userRating, setUserRating] = useState('');
  const [error, setError] = useState('');
  const [,updateScreen] = useState(false);
    const {email}=UseAuth();
    console.log(email);
  const connection = Connection;

  useEffect(() => {
    if(name === null)
    {
      setTimeout(() => {
        setRate(prevState => rideGoing?.driver?.rating || prevState);
        setSmoke(prevState => rideGoing?.smoking || prevState);
        setName(prevState => rideGoing?.driver?.username || prevState);
        setRideId(prevState => rideGoing?.id || prevState);
        setImage(prevState => rideGoing?.driver?.imagePath || prevState);
        setFrom(prevState => rideGoing?.from || prevState);
        setTo(prevState => rideGoing?.to || prevState);
        setIsLoading(false);
      }, 3000);
    }else {
      setIsLoading(false);
    }

    connection.passWatchRideUpdated(email, ride => {
      rideGoing['status'] = ride;
      console.log('in');
      if (ride === "cancelled") {
        setRideGoing(null);
      }
      navigate('/');
    });
  }, []);


  const cancelRide = async () => {
      console.log(rideGoing);
        try {
          await axios.patch(`${process.env.REACT_APP_API}/Passanger/cancelRide?id=${rideID}`)
            .then((res) => {
              setRideGoing(null);
            console.log("Ride cancelled:", res.data);
          });
          
        } catch (error) {
          console.error("Error canceling ride:", error);
        }
        console.log(rideGoing);
        navigate("/PassengerPage");
    };
  
    // Function to pay and provide feedback
    const payAndFeedback = async () => {
      console.log(rideGoing);
        if(userRating!==''  && feedback!=='' ){
        try {
          
          console.log("userRating=",userRating);
          await axios.patch(`${process.env.REACT_APP_API}/Passanger/payAndFeedback?id=${rideID}&rating=${userRating}&feedback=${feedback}`)
          .then(response => {
            setRideGoing(null);
            navigate("/PassengerPage");
          })
        } catch (error) {
          console.error("Error paying for ride:", error);
        }
      }
      }

      
    const handleRatingChange = (e) => {
      const newRating = parseInt(e.target.value, 10);
      
      if (isNaN(newRating) || newRating < 1 || newRating > 5) {
        setError('Rating must be between 1 and 5');
        setUserRating(''); 
      } else {
        setError('');
        setUserRating(newRating); 
      }
    };

  
  const handlePayClick = () => {
    setIsPaying(true);
  };
  
  const isDisabled = () => {
    return !userRating || !feedback;
  }

    console.log(location);
    console.log("userRating",userRating);
    console.log("feedback",feedback);
    console.log(rideGoing);
    if(rideGoing !== null && !isLoading){
    return (
      <div>
  
        {(rideGoing["status"] === "pending") && (
          <>
           <div className="ride-container">
            <div className="ride-top bg-light text-center">
                <div className="smoking-icon" style={{marginLeft:1000}}>
                  {smoke===true ? (
                    <FontAwesomeIcon icon={faSmoking} className="fa-solid fs-5 ms-4 mt-1" style={{ color: "black" }} />
                  ) : (
                    <FontAwesomeIcon icon={faBanSmoking} className="fa-solid fs-5 ms-4 mt-1" style={{ color: "black" }} />
                  )}
                </div>

                <h3 className="mb-0 pb-0 ms-2 fw-bold" style={{ color: "#5ed1d1" }}>{name}</h3><br/>
                <img
                  src={'https://localhost:7115/'+image.replace(/\\/g,'/')}
                  alt="profile"
                  className="rounded-circle ride-image"
                /><br/>

              <div className="fw-bold text-white rating-background" style={{background:"#5ed1d1"}}>
                <FontAwesomeIcon icon={faStar} className='fa-solid fa-fw text-white' />
                {parseFloat(rate).toFixed(2)}</div>
              </div>

            <div className="ride-bottom bg-white ">
            <p className="centered-text">The trip is pending, Waiting for the driver to accept.</p><br/>
              <div className=" d-flex justify-content-center">
                <div className="" > <img src={img_CityRegion} alt="" /></div>
                <div className="p-2 ms-4">
                  <p className="mb-1">{from}</p>
                  <p className="mb-1">{to}</p>
                </div>
              </div>
            </div>
            <button  className="cancel-ride-btn" 
               onClick={()=>{cancelRide();}}>Cancel Ride
            </button>

          </div>
          </>
        )}
  
        {(rideGoing["status"] === "ongoing") && (
        <>
        <div className="ride-container">
        <div className="ride-top bg-light text-center">
            <div className="smoking-icon" style={{marginLeft:1000}}>
              {smoke===true ? (
                <FontAwesomeIcon icon={faSmoking} className="fa-solid fs-5 ms-4 mt-1" style={{ color: "black" }} />
              ) : (
                <FontAwesomeIcon icon={faBanSmoking} className="fa-solid fs-5 ms-4 mt-1" style={{ color: "black" }} />
              )}
            </div>

            <h3 className="mb-0 pb-0 ms-2 fw-bold" style={{ color: "#5ed1d1" }}>{name}</h3><br/>

            <img
              src={'https://localhost:7115/'+image.replace(/\\/g,'/')}
            alt="profile"
              className="rounded-circle ride-image"
            /><br/>

          <div className="fw-bold text-white rating-background" style={{background:"#5ed1d1"}}>
            <FontAwesomeIcon icon={faStar} className='fa-solid fa-fw text-white' />
            {rate}</div>
          </div>

        <div className="ride-bottom bg-white ">
        <p className="centered-text1" >The driver accept the trip.</p><br/>
          <div className=" d-flex justify-content-center">
            <div className="" > <img src={img_CityRegion} alt="" /></div>
            <div className=" p-2 ms-4">
              <p className="mb-1">{from}</p>
              <p className="mb-1">{to}</p>
            </div>
          </div>
        </div>
        <button  className="cancel-ride-btn" 
            onClick={()=>{cancelRide();}}>Cancel Ride
        </button>

      </div>
      </>
        )}
        
  
        {(rideGoing["status"] === "done" )&& (
          <>
          <div className="ride-container">
          <div className="ride-top bg-light text-center">
              <div className="smoking-icon" style={{marginLeft:1000}}>
                {smoke===true? (
                  <FontAwesomeIcon icon={faSmoking} className="fa-solid fs-5 ms-4 mt-1" style={{ color: "black" }} />
                ) : (
                  <FontAwesomeIcon icon={faBanSmoking} className="fa-solid fs-5 ms-4 mt-1" style={{ color: "black" }} />
                )}
              </div>
          
              <h3 className="mb-0 pb-0 ms-2 fw-bold" style={{ color: "#5ed1d1" }}>{name}</h3><br/>
          
              <img
                src={'https://localhost:7115/'+image.replace(/\\/g,'/')}
                alt="profile"
                className="rounded-circle ride-image"
              /><br/>
          
            <div className="fw-bold text-white rating-background" style={{background:"#5ed1d1"}}>
              <FontAwesomeIcon icon={faStar} className='fa-solid fa-fw text-white' />
              {rate}</div>
            </div>
          
          <div className="ride-bottom bg-white ">
          <p className="centered-text1" >The trip is end please pay.</p><br/>
            <div className=" d-flex justify-content-center">
              <div className="" > <img src={img_CityRegion} alt="" /></div>
              <div className=" p-2 ms-4">
                <p className="mb-1">{from}</p>
                <p className="mb-1">{to}</p>
              </div>
            </div>
          </div>
          {isPaying ? (
            <div  className="form-container">
              <p>Rating:</p>
              <input
                type="number"
                className="form-control"
                placeholder="Rating"
                min={1}
                max={5}
                value={userRating || 0}
                onChange={(e) => handleRatingChange(e)}
              />
              {error && <div className="form-error" style={{ color: 'red' }}>{error}</div>}
              <br/><p>Feedback:</p>
              <input
                type="text"
                className="form-control"
                placeholder="Feedback"
                value={feedback || ""}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <br/><div className="d-flex">
              <input
                type="submit"
                value="ok"
                disabled={isDisabled()}
                className="submit-btn"
                onClick={()=>{payAndFeedback();}} 
              />
              </div>
            </div>
          ) : (
            <button  className="cancel-ride-btn" 
              onClick={()=>{handlePayClick();}}>Pay
            </button>
          )}
          
          </div>
          </>
        )}

      </div>
    );
  }else{
      return (<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <p>This text is centered!</p>
      </div>)
    }

}
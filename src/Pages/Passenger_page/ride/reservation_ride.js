import { useLocation, useNavigate } from "react-router-dom";
import React, {  useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmoking} from '@fortawesome/free-solid-svg-icons';
import { faBanSmoking } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { UseAuth } from "../../../Services/AuthProvider/AuthProvider";
import {  rideGoing,setRideGoing } from "../data";
import './style1.css'
import img_CityRegion from '../../../Assets/img/Screenshot (31).png'




export const ReservationRide = () => {

  const location = useLocation();
  const navigate =useNavigate();
  
  const rate=localStorage.getItem('rating');
  const smoke=localStorage.getItem('smoking');
  const name =localStorage.getItem('userName');
  const rideID=localStorage.getItem('rideId');
  const image=localStorage.getItem('imagePath');
  const from=localStorage.getItem('from');
  const to=localStorage.getItem('to');

  const [isPaying, setIsPaying] = useState(false); 
  const [feedback, setFeedback] = useState('');
  const [userRating, setUserRating] = useState('');
  const [error, setError] = useState('');
    const {email}=UseAuth();
    console.log(email);


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
        if(userRating!==''  && feedback!=='' ){
        try {
          
          console.log("userRating=",userRating);
          await axios.patch(`${process.env.REACT_APP_API}/Passanger/payAndFeedback?id=${rideID}&rating=${userRating}&feedback=${feedback}`)
          .then(response => console.log(response.data))
        } catch (error) {
          console.error("Error paying for ride:", error);
        }
        navigate("/PassengerPage");
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

    if(rideGoing !== null){
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
                  src={image}
                  alt="profile"
                  className="rounded-circle ride-image"
                /><br/>

              <div className="fw-bold text-white rating-background" style={{background:"#5ed1d1"}}>
                <FontAwesomeIcon icon={faStar} className='fa-solid fa-fw text-white' />
                {rate}</div>
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
              src={image}
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
                src={image}
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
  }

}




// {(rideGoing["status"] === "done" )&& (
//   <>
//     <p>Driver: {name}</p>
//     <p>Rating: {rate}</p>
//     {(smoke==true)?(
//         <FontAwesomeIcon icon={faSmoking} />
//     ):(<FontAwesomeIcon icon={faBanSmoking} />)}
    
//      {isPaying ? (
//     <div>
//       <input
//         type="number"
//         className="form-control rounded-pill"
//         placeholder="Rating"
//          min={1}
//         max={5}
//         value={userRating || 0}
//         onChange={(e) => handleRatingChange(e)}
//       />
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       <input
//         type="text"
//         className="form-control rounded-pill"
//         placeholder="Feedback"
//         value={feedback || ""}
//         onChange={(e) => setFeedback(e.target.value)}
//       />
//       <input
//         type="submit"
//         value="ok"
//         disabled={isDisabled()}
//         className="btn login_btn"
//         onClick={()=>{payAndFeedback();}} 
//       />
//     </div>
//   ) : (
//     <input
//       type="submit"
//       value="Pay"
//       className="btn login_btn"
//       onClick={handlePayClick} 
//     />
//   )}
//   </>
// )}
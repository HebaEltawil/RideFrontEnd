import { DriverCard } from "../drivers_page/driver_card/driver_card";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmoking} from '@fortawesome/free-solid-svg-icons';
import { faBanSmoking } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { UseAuth } from "../../../Services/AuthProvider/AuthProvider";
import { rideData,removeRideData, rideGoing, rating, smoking, userName, setRideGoing } from "../data";



export const ReservationRide = () => {

    const location = useLocation();
    // const { rating, username, smoke, email2} = location.state || {};
    //  const [ride,setRide]=useState([]);
    const navigate =useNavigate();
    // var ride = rideGoing;
    // if (!ride || !ride["status"]) {
    //   return <p>No ride information available.</p>;
    // }
    //  export ride1=[];
    const rate=localStorage.getItem('rating');
    const smoke=localStorage.getItem('smoking');
    const name =localStorage.getItem('userName');
    const rideID=localStorage.getItem('rideId');
    const [isPaying, setIsPaying] = useState(false); // State to control when to display the additional inputs
  const [feedback, setFeedback] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [error, setError] = useState('');
    const {email}=UseAuth();
    const [isCancelled, setIsCancelled] = useState(false);
    console.log(email);


    // console.log(rideID);
    // console.log(rideStatus);

    const cancelRide = async () => {
      // if (rideGoing) {
        const data= { status: "cancelled" }
        try {
          // await axios.patch(process.env.REACT_APP_API +"/Passanger/cancelRide"+rideID,data )
          // .then((res)=> {console.log(res.data);})
          await axios.patch(`${process.env.REACT_APP_API}/Passanger/cancelRide?id=${rideID}`,data)
            .then((res) => {
            console.log("Ride cancelled:", res.data);
          });
          // setRideGoing(null);
          // setIsCancelled(true);
          
          // navigate("/PassengerPage");
          // Update ride status locally
          // setRide({ ...ride, status: "cancelled" });
        } catch (error) {
          console.error("Error canceling ride:", error);
        }

        // setRideGoing(null);
        navigate("/PassengerPage");
        
      // }
    };
  
    // Function to pay and provide feedback
    const payAndFeedback = async () => {
      // if (ride) {
        try {
          // await axios.patch(
          //   `${process.env.REACT_APP_API}/api/Passanger/payAndFeedback`,
          //   { rideId: rideID ,rate: 3, feedback: "Thank you!" }
          // );
          const response = await axios.patch(
            `${process.env.REACT_APP_API}/Passanger/payAndFeedback`, // Base endpoint
            {},
            {
              params: { 
                id: rideID,
                rate: userRating,
                feedback: feedback
              }
            }
          );
        } catch (error) {
          console.error("Error paying for ride:", error);
        }
        navigate("/PassengerPage");
      }

    // const payAndFeedback = async () => {
        // const response = await axios.patch(
        //   `${process.env.REACT_APP_API}/Passanger/payAndFeedback`, // Base endpoint
        //   {},  // No request body, we're using query parameters
        //   {
        //     params: {  // Pass query parameters
        //       id: rideID,
        //       rating,
        //       feedback
        //     }
        //   }
        // );
    //     console.log("Response from server:", response.data);
    //     navigate("/PassengerPage");  // Navigate to another page on success
    //     } catch (err) {
    //       console.error("Error submitting feedback:", err);
    //       setError("Failed to submit feedback. Please try again.");
    //     }
    //   }

        
    //   }
    // };
    const handlePayClick = () => {
      setIsPaying(true); // Show the additional input fields
    };
    
    const isDisabled = () => {
      if(userRating!==null && feedback!==null){
        return false;
       }
      else{return true} 
    }
    // const handleSubmit = () => {
    //   const ratingValue = parseInt(userRating, 10);
    //   if (ratingValue >= 5 || ratingValue <= 0) { // Validate the range
    //     setError('Rating must be between 1 and 4'); // Set the error message
    //     return; // Exit early to avoid submission
    //   }
  
    //   setError(''); 
    //   console.log(`Rating: ${userRating}, Feedback: ${feedback}`);
    //   // Add logic to submit the data to the backend
    // };

    // const pay =()=>{
    //   return(<div>
    //     <input type="number" className="form-control rounded-pill" placeholder="rating" />
    //     <input type="text" className="form-control rounded-pill" placeholder="feedback" />
    //     </div>
    //   );
    // }
      


    // if (ride["status"] === "ongoing"){
    //   return(
    //     <>
    //         <p>Driver: {userName}</p>
    //         <p>Rating: {rating}</p>
    //         {(smoke==true)?(
    //             <FontAwesomeIcon icon={faSmoking} />
    //         ):(<FontAwesomeIcon icon={faBanSmoking} />)}
    //         <p>The trip is ongoing. You can cancel it.</p>
    //         <button >
    //             Cancel Ride
    //         </button>
          
    //       </>
    //   );
    // }
    
    // if (ride["status"] === "done" ){
    //   return (
    //     <>
    //         <p>Driver: {userName}</p>
    //         <p>Rating: {rating}</p>
    //         {(smoke==true)?(
    //             <FontAwesomeIcon icon={faSmoking} />
    //         ):(<FontAwesomeIcon icon={faBanSmoking} />)}
    //         <button >
    //           Pay for the Ride
    //         </button>
    //       </>
    //   );
    // }

    // if(rideGoing["status"] === "cancelled"){
    //   // setRideGoing(null);
    //   navigate("/PassengerPage");

    // }

    // useEffect(() => {
    //   if (isCancelled ) {
    //     // setRideGoing(null);
    //     navigate("/PassengerPage");
    //   }
    // }, [isCancelled,navigate]);
    console.log(location);

    if(rideGoing !== null){
    return (
      <div>
  
        {(rideGoing["status"] === "pending") && (
          <>
            <p>Driver: {name}</p>
            <p>Rating: {rate}</p>
            {(smoke==true)?(
                <FontAwesomeIcon icon={faSmoking} />
            ):(<FontAwesomeIcon icon={faBanSmoking} />)}
            <p>The trip is pending. You can cancel it.</p>
            <input type="submit" value="Cancel Ride" className="btn login_btn" 
               onClick={()=>{cancelRide();setRideGoing(null);navigate("/PassengerPage"); }}
            />
          </>
        )}
  
        {(rideGoing["status"] === "ongoing") && (
          <>
            <p>Driver: {name}</p>
            <p>Rating: {rate}</p>
            {(smoke==true)?(
                <FontAwesomeIcon icon={faSmoking} />
            ):(<FontAwesomeIcon icon={faBanSmoking} />)}
            <p>The trip is ongoing. You can cancel it.</p>
            <input type="submit" value="Cancel Ride" className="btn login_btn" 
               onClick={()=>{cancelRide();}}
            />
              
          
          </>
        )}
        
  
        {(rideGoing["status"] === "done" )&& (
          <>
            <p>Driver: {userName}</p>
            <p>Rating: {rating}</p>
            {(smoke==true)?(
                <FontAwesomeIcon icon={faSmoking} />
            ):(<FontAwesomeIcon icon={faBanSmoking} />)}
            {/* <input type="submit" value="Pay" className="btn login_btn" 
               onClick={()=>{pay();}}
            /> */}
             {isPaying ? (
            <div>
              <input
                type="number"
                className="form-control rounded-pill"
                placeholder="Rating"
                required min={1}
                max={5} // To limit the range of valid ratings
                value={userRating}
                onChange={(e) => setUserRating(e.target.value)}
              />
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
              <input
                type="submit"
                value="Pay"
                disabled={isDisabled()}
                className="btn login_btn"
                onClick={()=>{payAndFeedback()}} 
              />
            </div>
          ) : (
            <input
              type="submit"
              value="Pay"
              className="btn login_btn"
              onClick={handlePayClick} 
            />
          )}
          </>
        )}

       {/* {(ride["status"] === "cancelled") && (

       ):()} */}
      </div>
    );
  }

}
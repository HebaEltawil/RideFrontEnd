import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component
import { faSmoking} from '@fortawesome/free-solid-svg-icons';
import { faBanSmoking,faStar } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import './media_CardDrive.css';
import './style_CardDrive.css';
import img_Rating from '../../../../Assets/img/pngtree-vector-star-icon-png-image_1577370.jpg';
import img_UserPicture from '../../../../Assets/img/user_picture.png'
import img_CityRegion from '../../../../Assets/img/Screenshot (31).png'
import { UseAuth } from "../../../../Services/AuthProvider/AuthProvider";
// import { jwtDecode } from "jwt-decode";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { setDriverRating, setDriverSmoking, setDriverUserName, setRideGoing, setrideId } from "../../data";
// import { useRide } from "../../data";


// export const DriverCard = (props) => {
// const filteredDrivers =[];
export const DriverCard = ({filterDriversByFilters,citySource,cityDest
    ,regionSource,regionDest,lat1,lat2,long1,long2}) => {
    
    const navigate = useNavigate();
    const {email}=UseAuth();
    const [price, setPrice]=useState(null);
    // const [rideID,setrideId]=useState();

    console.log(email);

    useEffect( () => {
        if(regionSource!=='' && regionDest!== ''){
             axios.post(process.env.REACT_APP_API +"/Passanger/tripPrice", {
                lat1: lat1,
                long1: long1,
                lat2: lat2,
                long2: long2
            })
            .then((response) => {
                console.log(response.data);
                setPrice(response.data);
                // Handle data
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [regionSource, regionDest, lat1, lat2, long1, long2]);
    

    const sendRideRequest =async (data) => {
        console.log(data);
        var response ;
         await axios.post(process.env.REACT_APP_API +"/Passanger/requestRide", data)
            .then((res)=>{
                response = res.data;
                console.log(res.data);
                 console.log(res.data.id);
                setrideId(res.data.id)})
          .catch((e)=>  console.error('Error sending ride request:', e));
        setRideGoing(response);
    };    

    const handleRequestRide = async (driverEmail,rating,smoking,userName) => {
    const rideData = {
        passangerEmail: email,
        driverEmail: driverEmail,
        from: regionSource +','+ citySource,
        to: regionDest +','+ cityDest,
        lat1: lat1, 
        lat2: lat2, 
        long1: long1, 
        long2: long2, 
    };
    await sendRideRequest(rideData);
    setDriverUserName(userName);
    setDriverRating(rating);
    setDriverSmoking(smoking);
  
    navigate("/reservation");
    };  

    return (
            // <> 
            <div className="container" >
                {filterDriversByFilters.length > 0 ? (
                    filterDriversByFilters.map((driver) => (
                        <div key={driver.email} className="w-100 cardd mb-3" >
                          <div className="border border-4 border-info rounded-4 w-100 h-auto">
                            <div className="row h-100 w-100 p-0 m-0">
                              <div className="col-2">
                                <div className="">
                                  <div className="mt-2 text-center">
                                    <img src={driver.imagePath?'https://localhost:7115/'+driver.imagePath.replace(/\\/g,'/'):img_UserPicture} className="" style={{ height: "70px", width: "70px", borderRadius: "50%" }} alt="" />
                                  </div>
                                  <div className="w-100 mx-auto text-center bg-info">
                                    <div className="w-100 fs-5">
                                      <div className="fw-bold text-white"><FontAwesomeIcon icon={faStar} className='fa-solid fa-fw text-white' /> {driver.rating}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-8 p-2 h-100">
                                <div className="col-25 p-1 ms-2"><h3 className="mb-0 pb-0 ms-2 fw-bold" style={{ color: "#5ed1d1", display: 'inline' }}>{driver.username}</h3> </div>
                                {driver.smoking ? (
                                  <FontAwesomeIcon icon={faSmoking} className="fa-solid fs-5 ms-4 mt-1" style={{ color: "black" }} />
                                ) : (
                                  <FontAwesomeIcon icon={faBanSmoking} className="fa-solid fs-4 ms-4 mt-1" style={{ color: "black" }} />
                                )}
                      
                                <div className="row d-flex flex-nowrap  w-100">
                                  <div className="col-1"> <img src={img_CityRegion} alt="" /></div>
                                  <div className="col-10 p-2 ms-4">
                                    <p className="mb-1">{driver.city}</p>
                                    <p className="mb-1">{driver.region}</p>
                                  </div>
                                </div>
                                <div className="form-group">
                                  {(citySource !== '' && cityDest !== '') ? (
                                    <input
                                      type="submit"
                                      value="Request Ride"
                                      className="btn login_btn"
                                      onClick={() => {
                                        console.log("Button clicked");
                                        handleRequestRide(driver.email, driver.rating, driver.smoking, driver.username);
                                      }}
                                    />
                                  ) : (
                                    <input type="submit" value="Request Ride" disabled={true} className="btn login_btn" />
                                  )}
                                </div>
                              </div>
                              <div className="col-2" style={{ color: "#5ed1d1" }}>
                                {price ? (
                                  <>
                                    <p className="fs-4 fw-bold mb-0 pb-0">
                                      {price.toFixed(2)} L.E
                                    </p>
                                 
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                      
            ) : (
              <p>No available drivers found.</p>
            )}
            </div>
        // </>
        ); 
          
}

// return <div className="cardDesign">
//         <div className="card" style={{margin:50}}>
//             {/* <img className="card-img-top" src="https://source.unsplash.com/random/300x200" alt="" /> */}
//             <div className="card-body">
//                 <div className="card-title" >
//                     <h4 className="card-title">{props.name}</h4>
//                     <h4 className="card-title">{props.price}</h4> 
//                 </div>
                
//                 <span className="card-text">{props.rating} <br/></span>
//                 <span className="card-text">{props.gender} <br/></span> 
//                 <span className="card-text">{props.carType} <br/></span>
//                 <span className="card-text">{props.city} <br/></span>
//                 <span className="card-text">Smoking : {props.smoking} <br/></span>
//                 <span className="card-text">{props.region} </span>
                
//                 <Link to={'/reservation' }
//                     className="btn btn-success btn-block"
//                 >
//                     Accept 
//                 </Link>
//                 {/* <a className="btn btn-success btn-block"
                    // onClick={() => {
                    //     navigate("/details/" + props.id)
                    // }}
//                 >
//                     Details Page (using Hook)
//                 </a> */}
//             </div>
//         </div>
//     </div>




// setTimeout(() => {
    // navigate("/reservation"); }}/>
// state: {
    //   rating: driver.rating,
    //   username: driver.username,
    //   smoke: driver.smoking,
    //   email2: driver.email,
    // },
    // Delay navigation to allow state updates
//   }, 100);
// }}/>
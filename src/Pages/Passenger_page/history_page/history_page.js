import { useState,useEffect } from "react";
import { rideData } from "../data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faSmoking} from '@fortawesome/free-solid-svg-icons';
import { faBanSmoking } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './media_HistoryCard.css';
import './style_HistoryCard.css';
import './style.css';
import img_UserPicture from '../../../Assets/img/user_picture.png'
import img_CityRegion from '../../../Assets/img/Screenshot (31).png'
import axios from "axios";


const generateStars = (rating) => {
  const stars = [];
  const totalStars = 5; 

  for (let i = 0; i < rating; i++) {
    stars.push(<FontAwesomeIcon key={`full-${i}`} icon={solidStar} className="text-warning" />);
  }

  const remainingStars = totalStars - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={emptyStar} className="text-warning" />);
  }

  return stars;
};

export const HistoryPage = () => {


    const [driverDetails, setDriverDetails] = useState({});
    const relevantRides = rideData.filter(ride => ["paid", "cancelled"].includes(ride.status));

    useEffect(() => {
      const getDriver = async (driverEmail) => {
        try {
          const response = await axios.get(process.env.REACT_APP_API+"/Driver/getDriverByEmail/"+driverEmail );
          console.log(response.data);
          return response.data;
          
        } catch (error) {
          console.error('Error fetching driver details:', error);
        }
      };
  
      const fetchDriverDetails = async () => {
        const details = {};
        // Fetch driver details for each ride and store them in a dictionary
        for (const ride of rideData) {
          if (ride.driverEmail && !details[ride.driverEmail]) {
            const driverData = await getDriver(ride.driverEmail);
            console.log(driverData);
            if (driverData) {
              details[ride.driverEmail] = {
                userName: driverData.username,
                rating: driverData.rating,
                smoking: driverData.smoking,
                imagePath: driverData.imagePath?'https://localhost:7115/'+driverData.imagePath.replace(/\\/g,'/'):img_UserPicture,
              };
            }
          }
        }
        console.log(details);
        setDriverDetails(details); // Store all driver details in state
      };
  
      fetchDriverDetails(); // Fetch all driver details initially
    }, [rideData]); // Dependency on rideData to refetch if rideData changes

 
    return (
      <body className="bodyHe">
        <div className="container" >
          {relevantRides.length > 0  ? (
            relevantRides.map((ride) => {
              const driverDetail = driverDetails[ride.driverEmail] || {}; 
              console.log(driverDetail);
               console.log(ride);
              return (
                <div key={ride.id} className="w-100 cardd mb-3">
                    
                    <div className="border border-4 border-info rounded-4 w-100 h-auto">
                    <div className="row h-100 w-100 p-0 m-0">
                        <div className="col-2">
                        <div className="">
                            <div className="mt-2 text-center">
                            <img src={driverDetail.imagePath} className="" style={{ height: "70px", width: "70px", borderRadius: "50%" }} alt="" />
                            </div>
                            <div className="w-100 mx-auto text-center bg-info">
                            <div className="w-100 fs-5">
                                <div className="fw-bold text-white"><FontAwesomeIcon icon={faStar} className='fa-solid fa-fw text-white' /> {driverDetail.rating}</div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-8 p-2 h-100">
                        <div className="col-25 p-1 ms-2"><h3 className="mb-0 pb-0 ms-2 fw-bold" style={{ color: "#5ed1d1", display: 'inline' }}>{driverDetail.userName}</h3> </div>
                        {(driverDetail.smoking) ? (
                            <FontAwesomeIcon icon={faSmoking} className="fa-solid fs-5 ms-4 mt-1" style={{ color: "black" }} />
                        ) : (
                            <FontAwesomeIcon icon={faBanSmoking} className="fa-solid fs-4 ms-4 mt-1" style={{ color: "black" }} />
                        )}

                        <div className="row d-flex flex-nowrap  w-100">
                            <div className="col-1"> <img src={img_CityRegion} alt="" /></div>
                            <div className="col-10 p-2 ms-4">
                            <p className="mb-1">{ride.from}</p>
                            <p className="mb-1">{ride.to}</p>
                            </div>
                        </div>
                        {/* Add badge for status */}
                    {ride.status === "cancelled" ? <span class="badge cancelled">Cancelled</span>
                         : ride.status === "paid" ? <span class="badge paid">Done</span> : ""}    
                        </div>
                        <div className="col-2" style={{ color: '#5ed1d1' }}>
                            <p className="fs-6 fw-bold mb-0 pb-0">{ride.price.toFixed(2)} L.E</p>
                            <p className="fs-6 fw-bold mb-0 pb-0">{generateStars(ride.rate)}</p>
                        </div>
                    
                    </div>
                    </div>
                    </div>
              );
            })
          ) : (
            <p>No rides found.</p>
          )}
        </div>
        </body>
      );
}


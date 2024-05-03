import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { rideData } from "../../Pages/Passenger_page/data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { UseAuth } from "../../Services/AuthProvider/AuthProvider";

export const Header = () => {
    // const navigate = useNavigate();
    const navigate = useNavigate();
  const location = useLocation();
  const {setToken,setRole,setEmail} = UseAuth();

  const isRideDataEmpty = rideData.length === 0; 
  const isOnReservationPage = location.pathname === "/reservation";
  useEffect(()=>{
    navigate('/');
},[])
  return ( <>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
            <div className="container">
                <ul className="navbar-nav">

                    {/* {(rideData.length === 0)? ( */}
                    {/* {  isOnReservationPage? (    
                       <>
                       <li className="nav-item">
                           <button className="nav-link">Home</button>
                       </li>
                       <li className="nav-item">
                           <Link to={'/history'} className="nav-link">History1</Link>
                       </li>
                   </>
                    ) : (
                    //    {(rideData.length === 0)? (    
                     <>
                     <li className="nav-item">
                         <Link to="/" className="nav-link">Home</Link>
                     </li>
                     
                     <li className="nav-item">
                         <Link to={'/history'} className="nav-link">History</Link>
                     </li>  
                 </>
                    )} 
                </ul>     */}
                
                    
                    <li className="nav-item">
                        <Link to={'/'} className="nav-link">Home</Link>
                    </li>
                     <li className="nav-item">
                        <Link to={'/history'} className="nav-link">History</Link>
                    </li>
                </ul>
                {/* <a className="navbar-brand">
                <img
                        className="navbar-brand" src="https://source.unsplash.com/random/300x200" 
                        alt="error"
                        style={{ width: 30, height: 30, marginRight: 10 }}
                    />
                    
                </a> */}
                {/* <a className="btn btn-success btn-block"
                    onClick={() => {
                        navigate("/profile" )
                    }}
                >
                    <img
                        className="navbar-brand" src="https://source.unsplash.com/random/300x200" 
                        alt="error"
                        style={{ width: 60, height: 30}}
                    />
                </a> */}
              <div>  
            <FontAwesomeIcon icon={faUserCircle} inverse size='lg'  
            onClick={()=>{setToken();setRole();setEmail()}} onMouseMove={() =>"SignOut"}></FontAwesomeIcon>
            {/* <Link className='signout'onClick={()=>{setToken();setRole();setEmail()}} style={{color: "white"}}>sign out</Link> */}
           </div>
        </div>
        </nav>
    </>
  );
}


//////{isRideDataEmpty ? (
//     <>
//     <li className="nav-item">
//         <Link to="/" className="nav-link">Home</Link> {/* Navigate to Home */}
//     </li>
//     <li className="nav-item">
//         <Link to="/history" className="nav-link">History</Link> {/* Navigate to History */}
//     </li>
//     </>
// ) : (

//     <>
//         {isOnReservationPage ? (
//           <button className="nav-link">Home1</button>
//         ) : (
//         <Link to="/reservation" className="nav-link">Home</Link> 
//         )}
      
//     <li className="nav-item">
//         <Link to="/history" className="nav-link">History</Link> 
//     </li>
//     </>
// )}
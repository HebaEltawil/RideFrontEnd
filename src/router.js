import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UseAuth } from "./Services/AuthProvider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "./Pages/LoginRegister_page/Login/login";
import { RegisterPage } from "./Pages/LoginRegister_page/Register/Register";
import { AdminPage } from "./Pages/Admin_page/admin";
import { DriverPage } from "./Pages/Driver_page/driver";
import { BlocksPage } from "./Pages/Admin_page/BlocksPage/BlocksPage";
import { PendingPage } from "./Pages/Admin_page/Pending_Page/PendingPage";
import { AllRidesPage } from "./Pages/Admin_page/AllRides/AllRides";
import { Navbar } from "./Pages/Admin_page/Admin_Navbar/Navbar";
import {HistoryPageDriver} from "./Pages/Driver_page/historyPage/historyPage";
import {NavbarDriver} from "./Pages/Driver_page/driverNavBar/Navbar";

import { Header } from "./Pages/Passenger_page/header/header";
import {PassengerPage} from './Pages/Passenger_page/drivers_page/passenger_page';
import {HistoryPage} from './Pages/Passenger_page/history_page/history_page';
import { ReservationRide } from "./Pages/Passenger_page/ride/reservation_ride";
import { PassangerHomePage } from "./Pages/Passenger_page/homepage/Passangerhome";
import {useEffect} from "react";
import axios from "axios";

const Routes = () => {
  const { token,role } = UseAuth();

    axios.defaults.headers.common["Authorization"] = "Bearer " + token;


  const routesForAuthenticatedAdmin = [
    {
      path: "/",
      element: <><Navbar/> <ProtectedRoute /></>, 
      children: [
        {
          path: "/",
          element:< AdminPage/>,
        },
        {
          path:"/blockPage",
          element: <BlocksPage/>
        },
        {
          path: "/pendingPage",
          element: <PendingPage/>
        },
        {
          path: "/allRidesPage",
          element: <AllRidesPage/>
        }

      ],
    },
    {
        path: "*",
        element:<><Navbar/><AdminPage/></>
    }

];
const routesForAuthenticatedDriver = [
  {
    path: "/",
    element: <><NavbarDriver/> <ProtectedRoute /></>,
    children: [
      {
        path: "/",
        element:  < DriverPage/>,
      },

      {
        path: "/driverHistoryPage",
        element:  < HistoryPageDriver/>,
      },
    ],
  },
  {
      path: "*",
      element:<><Navbar/><DriverPage/></>
  }
];
const routesForAuthenticatedPassenger = [
  {
    path: "/",
    element:  <>
    <Header /> 
    <div style={{ paddingTop: '60px' }}> 
      <ProtectedRoute />
    </div> </>,
    children: [
      {
        path: "/", // localhost:3000
        // element: <PassengerPage />
        element:<PassangerHomePage/>
      },
      {
        path: "/PassengerPage", // localhost:3000
        element: <PassengerPage />
        // element:<PassangerHomePage/>
      },
      {
        path: "/history", // localhost:3000/history
        element: <HistoryPage />
      },
      // {
      //   path: "/reservation", // localhost:3000/reservation
      //   element: <ReservationRide />
      // },
    ],
  },
  {
      path: "*",
      element:<><Header/><PassangerHomePage /></>
  }
];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
    path: "/",
      element: <ProtectedRoute />,
  } , 
    {
      path: "/signup",
      element: <RegisterPage/>,
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    // ...(!token ? routesForNotAuthenticatedOnly : []),
    // ...(token && role === "Admin" ? routesForAuthenticatedAdmin: routesForNotAuthenticatedOnly)
    ...(token ? 
      (role === "Admin" ? routesForAuthenticatedAdmin :
        (role === "Driver" ? routesForAuthenticatedDriver :
          (role === "Passenger" ? routesForAuthenticatedPassenger : [])
        )
      ) :
      routesForNotAuthenticatedOnly
    )
  ]);
  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;






























// import App from "./App";


// const { createBrowserRouter } = require("react-router-dom");

// export const router = createBrowserRouter([
//     {
//         path: "", // localhost:3000
//         element: <App />,
//         children: [
//             {
//                 path: "", 
//                 element: < LoginPage/>
//             },
//             {
//                 path: "/Register", 
//                 element: < RegisterPage/>
//             },
//             {
//                 path: "/admin", 
//                 element: < AdminPage/>
//             },
//             {
//                 path: "/driver", 
//                 element: < DriverPage/>
//             },
//             {
//                 path: "/passenger", 
//                 element: < PassengerPage/>
//             },
//         ]
//     }
// ])
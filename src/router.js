import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UseAuth } from "./Services/AuthProvider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "./Pages/LoginRegister_page/Login/login";
import { RegisterPage } from "./Pages/LoginRegister_page/Register/Register";
import { AdminPage } from "./Pages/Admin_page/admin";
import { PassengerPage } from "./Pages/Passenger_page/passenger";
import { DriverPage } from "./Pages/Driver_page/driver";


const Routes = () => {
  const { token,role } = UseAuth();

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedAdmin = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element:  < AdminPage/>,
        },
      ],
    },
    {
        path: "*",
        element:<AdminPage/>
    }
];
const routesForAuthenticatedDriver = [
  {
    path: "/",
    element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
    children: [
      {
        path: "/",
        element:  < DriverPage/>,
      },
    ],
  },
  {
      path: "*",
      element:<DriverPage/>
  }
];
const routesForAuthenticatedPassenger = [
  {
    path: "/",
    element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
    children: [
      {
        path: "/",
        element:  < PassengerPage/>,
      },
    ],
  },
  {
      path: "*",
      element:<PassengerPage/>
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
  console.log(token);
  console.log(role);
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
  console.log(role);
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
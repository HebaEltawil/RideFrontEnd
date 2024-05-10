import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

//http://schemas.microsoft.com/ws/2008/06/identity/claims/role


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [role, setRole_] = useState(localStorage.getItem("role"));
  const [email, setEmail_] = useState(localStorage.getItem("email"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };
  const setEmail = (email) => {
    setEmail_(email);
  };
  const setRole = (role) => {
    setRole_(role);
  }


  useEffect(() => {
    if (token) {
      //axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
      localStorage.setItem('role',role);
      localStorage.setItem('email',email);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('email')
    }
  }, [token,email,role]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      role,
      setRole,
      email,
      setEmail
    }),
    [token,role,email]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
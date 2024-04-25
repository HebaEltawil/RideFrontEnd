import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
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

  function decodeJWT(token) {
    try {
        
        // Decode the header and payload
        const decodedPayload = jwtDecode(token);
        return  decodedPayload ;
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
}
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
      const decodedToken = decodeJWT(token);
      let role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      let email = decodedToken.email;
      setRole(role);
      setEmail(email);
      localStorage.setItem('role',role);
      localStorage.setItem('email',email);

    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);

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
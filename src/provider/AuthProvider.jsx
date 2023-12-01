/**
 * Guide : https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 * Code : https://github.com/sanjay-arya/react-auth-demo/blob/main/src/provider/authProvider.jsx
*/

import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie"
import PropTypes from "prop-types";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      Cookies.set("token", token) // TODO: set http-only cookies 
    } else {
      delete axios.defaults.headers.common["Authorization"];
      Cookies.remove("token");
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.any)
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
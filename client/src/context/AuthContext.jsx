import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null)
  const [pending, setPending] = useState(true);

  useEffect(()=>{
    const storedToken = localStorage.getItem('authToken');
    if(storedToken){
      setAuthToken(storedToken);
      // setIsAuthenticated(true);
    }
    setPending(false)
  },[])

  const login = (token) => {
    setAuthToken(token)
    // setIsAuthenticated(true); 
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setAuthToken(null)
    // setIsAuthenticated(false); 
    localStorage.removeItem('authToken');
  };

  // const isAuthenticated = !!authToken;

  const value = {
    // isAuthenticated,
    authToken,
    login,
    logout,
    pending
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
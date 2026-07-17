import React, {createContext, useState, useEffect} from 'react';
import api from '../api/axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const raw = localStorage.getItem('deskflow_user');
    if (raw) setUser(JSON.parse(raw));
    setLoading(false);
  },[]);

  const login = ({token, user}) => {
    localStorage.setItem('deskflow_token', token);
    localStorage.setItem('deskflow_user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('deskflow_token');
    localStorage.removeItem('deskflow_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, loading, login, logout, api}}>
      {children}
    </AuthContext.Provider>
  );
};

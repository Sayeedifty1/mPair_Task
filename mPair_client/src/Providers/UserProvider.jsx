/* eslint-disable react-refresh/only-export-components */
import { clear } from 'localforage';
import { createContext, useContext, useState, useEffect } from 'react';
import { clearToken } from '../utilities/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from localStorage on initial mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }

    // Load JWT token from localStorage and set it in fetch headers
    const token = localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line no-undef
      fetchConfig.headers.Authorization = `Bearer ${token}`;
    }
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    clearToken();
    localStorage.removeItem('token');
  };
  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

const fetchConfig = {
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers you need here
  },
};
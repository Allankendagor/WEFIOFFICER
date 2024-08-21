// src/context/UserContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the context
interface UserContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

// Create UserContext with the correct types
export const UserContext = createContext<UserContextType>({
  token: null,
  setToken: () => {},
});

// UserProvider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to store the token, initializing it from localStorage
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('awesomeleadstoken')
  );

  // Effect to handle token changes and update localStorage
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const requestOptions = {
            method: 'GET',
            headers: {
              "Content-Type":"application/json",
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await fetch('http://52.206.183.121:8000/login', requestOptions);

          if (!response.ok) {
            console.log('Token:', token);
            console.error('Error fetching user data:', response.status);
            // Handle error, e.g., redirect to login or clear token
            setToken(null);
            localStorage.removeItem('awesomeleadstoken');
          } else {
            console.log('Token:', token);
            const data = await response.json();
            console.log('User data:', data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle error, e.g., clear token
          setToken(null);
          localStorage.removeItem('awesomeleadstoken');
        }
      }
    };

    fetchUser();
  }, [token]);

  // Update localStorage whenever the token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('awesomeleadstoken', token);
    } else {
      localStorage.removeItem('awesomeleadstoken');
    }
  }, [token]);

  // Provide the token and setToken function to the children components
  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
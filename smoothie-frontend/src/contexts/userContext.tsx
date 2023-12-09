import React, { createContext, useState, useContext } from 'react';

// Define the type for your user data
type UserType = {
    email: string,
    googleId: string,
    firstName: string,
    lastName: string,
    jwt: string,
    photo: string,
    user_id: number | null
    // Add other user properties here
  };

  export const emptyUser = {
    email: '',
    googleId: '',
    firstName: '',
    lastName: '',
    jwt: '',
    photo: '',
    user_id: null
  }
  
  // Define the type for the context value
  type UserContextType = {
    user: UserType | null;
    updateUser: (user: UserType) => void;
  };
  
  // Create a Context with the specific type
  const UserContext = createContext<UserContextType>({
    user: null, // Default value for user
    updateUser: () => {} // Default empty function
  });
  
  export const useUser = () => useContext(UserContext);
  
  type UserProviderProps = {
    children: React.ReactNode;
  };


  export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(emptyUser); // Placeholder for user data
  
    const updateUser = (newUserData: UserType) => {
        console.log("NEW USER")
        console.log(updateUser)
      setUser(newUserData);
    };
  
    return (
      <UserContext.Provider value={{ user, updateUser }}>
        {children}
      </UserContext.Provider>
    );
  };


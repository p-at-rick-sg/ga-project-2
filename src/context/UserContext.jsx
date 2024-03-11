import {createContext, useState} from 'react';
import {createTheme} from '@mui/material';

export const UserContext = createContext();
const defaultTheme = createTheme();

const logout = () => {
  setUser(null);
};

export function UserProvider({children}) {
  //set the UserContext values and adding to an object here for clarity
  const [user, setUser] = useState({email: 'patrick.kittle@gmail.com', name: 'Patrick'});
  const [pageTitle, setPageTitle] = useState('');
  const value = {defaultTheme, user, setUser, logout, pageTitle, setPageTitle}; //this object is available in the useUser context

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

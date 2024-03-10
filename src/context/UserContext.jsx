import {createContext, useState} from 'react';
import {createTheme} from '@mui/material';

export const UserContext = createContext();
const defaultTheme = createTheme();

const logout = () => {
  setUser(null);
};

export function UserProvider({children}) {
  const [user, setUser] = useState({email: 'patrick.kittle@gmail.com', name: 'Patrick'});
  return (
    <UserContext.Provider value={{defaultTheme, user, logout}}>{children}</UserContext.Provider>
  );
}

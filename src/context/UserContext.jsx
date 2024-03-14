import {createContext, useState} from 'react';
import {createTheme} from '@mui/material';

export const UserContext = createContext();
const defaultTheme = createTheme();

const logout = () => {
  setUser(null);
};

export function UserProvider({children}) {
  //set the UserContext values and adding to an object here for clarity
  const [user, setUser] = useState({
    email: null,
    name: null,
    airtableId: null,
    firstName: null,
    primaryLocation: null,
  });
  const [authenticated, setAuthenticated] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const BASEURI = 'https://api.airtable.com/v0/';
  const BASEID = 'appczfLTtCoMql9J8/';
  const TABLEID = 'tblK9XMatvmUi5vNS';
  const value = {
    defaultTheme,
    user,
    setUser,
    setAuthenticated,
    authenticated,
    logout,
    pageTitle,
    setPageTitle,
    BASEURI,
    BASEID,
    TABLEID,
  }; //this object is available in the useUser context

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

import './App.css';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/Signup';

import UserContext from './context/user-context';
import {useState} from 'react';
import {createTheme} from '@mui/material/styles';

function App() {
  const [user, setUser] = useState({email: 'patrick.kittle@gmail.com', name: 'Patrick'}); // this will start as null after testing
  const logout = () => {
    setUser(null);
  };

  const defaultTheme = createTheme(); //using context to pass this down to each component

  return (
    <UserContext.Provider value={{user, logout, defaultTheme: defaultTheme}}>
      <>
        <NavBar></NavBar>
        {/* <SignUp></SignUp>
        <SignIn></SignIn> */}
      </>
    </UserContext.Provider>
  );
}

export default App;

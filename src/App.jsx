import './App.css';
import NavBar from './components/NavBar';
import {useState} from 'react';

import {createTheme} from '@mui/material/styles';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserDisplay from './components/UserDisplay';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <UserDisplay></UserDisplay>
      {/* <SignIn></SignIn>
      <SignUp></SignUp> */}
    </>
  );
}

export default App;

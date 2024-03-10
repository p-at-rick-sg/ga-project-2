import './App.css';
import NavBar from './components/NavBar';
// import SignIn from './components/SignIn';
// import SignUp from './components/Signup';

import {useState} from 'react';
import {createTheme} from '@mui/material/styles';
import SignIn from './components/SignIn';
import SignUp from './components/Signup';

function App() {
  return (
    <>
      <NavBar></NavBar>
      {/* <SignIn></SignIn>
      <SignUp></SignUp> */}
    </>
  );
}

export default App;

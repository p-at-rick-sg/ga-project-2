import './App.css';
import {useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

//Component Imports
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import UserPage from './pages/UserPage';
import RecruiterPage from './pages/RecruiterPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

// context stuff
import {useUser} from './hooks/useUser';

//MUI Imports
import {createTheme} from '@mui/material/styles';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  const {pageTitle} = useUser();
  return (
    <>
      <NavBar pageTitle={pageTitle}></NavBar>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="recruiter" element={<RecruiterPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

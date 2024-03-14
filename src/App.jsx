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

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  const {pageTitle, authenticated} = useUser();
  const [showUpdate, setShowUpdate] = useState(false);
  if (authenticated) {
    return (
      <>
        <NavBar
          pageTitle={pageTitle}
          setShowUpdate={setShowUpdate}
          showUpdate={showUpdate}></NavBar>
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<LandingPage />} />
          <Route path="signin" element={<Navigate to="/user" />} />
          <Route
            path="user"
            element={<UserPage showUpdate={showUpdate} setShowUpdate={setShowUpdate} />}
          />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <NavBar pageTitle={pageTitle}></NavBar>
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<LandingPage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="recruiter" element={<RecruiterPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    );
  }
}

export default App;

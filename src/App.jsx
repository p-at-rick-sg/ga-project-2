import './App.css';
import {useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

//Component Imports
import NavBar from './components/NavBar';
import RecruiterNavBar from './components/RecruiterNavBar';
import LandingPage from './pages/LandingPage';
import UserPage from './pages/UserPage';
import RecruiterPage from './pages/RecruiterPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
// context stuff
import {useUser} from './hooks/useUser';
// end user imports
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
//recruitment user imports
import RecruiterSignup from './components/RecruiterSignup';
import RecruiterSignin from './components/RecruiterSignin';
import {useRecruiter} from './hooks/useRecruiter';
import NewJobForm from './components/NewJobForm';

function App() {
  const {pageTitle, authenticated} = useUser();
  const [showUpdate, setShowUpdate] = useState(false);
  const {recUser, authIsReady} = useRecruiter();
  //this checks end user (job seeker) authentication status
  if (authenticated) {
    return (
      <>
        <NavBar
          pageTitle={pageTitle}
          setShowUpdate={setShowUpdate}
          showUpdate={showUpdate}></NavBar>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="home" element={<LandingPage />} />
          <Route path="signin" element={<Navigate to="/user" />} />
          <Route
            path="user"
            element={<UserPage showUpdate={showUpdate} setShowUpdate={setShowUpdate} />}
          />
        </Routes>
      </>
    );
  } else if (recUser) {
    //recruiter signin status
    return (
      <>
        <RecruiterNavBar
          pageTitle="Recruiter Area"
          setShowUpdate={setShowUpdate} //need to change this and the next line to the recruiter state/function
          showUpdate={showUpdate}></RecruiterNavBar>
        <Routes>
          <Route path="recruiter" element={<RecruiterPage />} />
          <Route path="/recruiter-display" element={<RecruiterPage />} />
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
          <Route path="recruiter-signup" element={<RecruiterSignup />} />
          <Route path="recruiter-signin" element={<RecruiterSignin />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="jobs" element={<NewJobForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    );
  }
}

export default App;

import {useEffect, useState} from 'react';
import useFetch from '../hooks/useFetch';
import {useUser} from '../hooks/useUser';
import styles from './UserDisplay.module.css';
import JobTable from './JobTable';
import JobDetails from './JobDetails';

// MUI Imports

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider} from '@mui/material/styles';
// Import the functions you need from the SDKs you need FIREBASE
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {collection, query, where, doc, setDoc, addDoc, getDocs} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const UserDisplay = () => {
  const {defaultTheme, BASEURI, BASEID, TABLEID, authenticated, setAuthenticated, setUser, user} =
    useUser();
  const bearer = import.meta.env.VITE_AIRTABLEPAT;
  const USERID = user.airtableId;
  const [loggedInUser, fetchUser] = useFetch();
  const [jobs, setJobs] = useState([]);
  const [userSaved, setUserSaved] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const getOneUser = () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + import.meta.env.VITE_AIRTABLEPAT);

    const myRequestOptions = {
      signal,
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    const fullURI = BASEURI + BASEID + TABLEID + '/' + USERID;
    fetchUser(fullURI, myRequestOptions);
  };

  // ******* FIREBASE CONFIG *******
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FBAPIKEY,
    authDomain: import.meta.env.VITE_FBAUTHDOM,
    projectId: 'ga-project-2-d64a9',
    storageBucket: 'ga-project-2-d64a9.appspot.com',
    messagingSenderId: '798703869466',
    appId: '1:798703869466:web:90dce310155e0f234cbba3',
    measurementId: 'G-MNCE84146G',
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  //  ******** END FIREBASE CONFIG ********

  // ******* Start Firebase Firestore Add records
  // const testFirestore2 = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, 'users'), {
  //       first: 'Alan',
  //       middle: 'Mathison',
  //       last: 'Turing',
  //       born: 1912,
  //     });

  //     console.log('Document written with ID: ', docRef.id);
  //   } catch (e) {
  //     console.error('Error adding document: ', e);
  //   }
  // };

  //GETTING JOBS DATA FROM THE DB
  // const getFirebaseData = async () => {
  //   const jobs = [];
  //   const querySnapshot = await getDocs(collection(db, 'jobs'));
  //   querySnapshot.forEach(doc => {
  //     jobs.push({id: doc.id, ...doc.data()});
  //   });
  //   setJobs(jobs);
  // };
  //  ******* End Firestore Testing ********

  useEffect(() => {
    queryFirebaseJobs();
  }, []);

  const queryFirebaseJobs = async () => {
    const tempJobs = [];
    const jobsRef = collection(db, 'jobs');
    const q = query(jobsRef, where('location', '==', 'Singapore'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      // console.log(doc.id, ' => ', doc.data());
      tempJobs.push({id: doc.id, ...doc.data()});
    });
    setJobs(tempJobs);
  };

  useEffect(() => {
    // if (user.email === null)
    if (!userSaved) getOneUser();
  }, [user]);

  // get the full details of the logged in user and save to context user object
  useEffect(() => {
    if (loggedInUser.length !== 0) {
      setUserSaved(false);
      const tempUpdateValues = {...user};
      for (const [key, value] of Object.entries(loggedInUser.fields)) {
        if (
          (key === 'primaryLocation' && value !== 'not set' && value !== '') ||
          (key === 'secondaryLocation' && value !== 'not set' && value !== '') ||
          (key === 'firstName' && value !== 'not set' && value !== '')
        ) {
          tempUpdateValues[key] = value;
        }
      }
      setUser(tempUpdateValues);
      setUserSaved(true);
    }
  }, [loggedInUser]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container direction="row" sx={{marginTop: 2}}>
        <Grid item md={12}>
          <Typography variant="h6">Welcome Back {user.firstName}</Typography>
        </Grid>
        <Grid item md={6}></Grid>
      </Grid>

      <div>
        <div className={styles.leftDiv}>
          <JobTable
            jobs={jobs}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}></JobTable>
        </div>
        <div className={styles.rightDiv}>
          <JobDetails jobs={jobs} selectedRows={selectedRows} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UserDisplay;

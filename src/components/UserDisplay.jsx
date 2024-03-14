import {useEffect, useState} from 'react';
import useFetch from '../hooks/useFetch';
import {useUser} from '../hooks/useUser';
import styles from './UserDisplay.module.css';
import JobTable from './JobTable';

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
import {getAnalytics} from 'firebase/analytics';
import {collection, query, where, doc, setDoc, addDoc, getDocs} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const UserDisplay = () => {
  const {defaultTheme, BASEURI, BASEID, TABLEID, authenticated, setAuthenticated, setUser, user} =
    useUser();
  const bearer = import.meta.env.VITE_AIRTABLEPAT;
  const USERID = user.airtableId;
  const [loggedInUser, fetchUser] = useFetch();
  const [job, setJobs] = useState([]);

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
  const analytics = getAnalytics(app);
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
  const queryFirebaseData = async () => {
    const tempJobs = [];
    const jobsRef = collection(db, 'jobs');
    const q = query(jobsRef, where('location', '==', 'singapore'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      console.log(doc.id, ' => ', doc.data());
      tempJobs.push({id: doc.id, ...doc.data()});
    });
  };

  useEffect(() => {
    getOneUser();
    queryFirebaseData();
  }, [user]);

  useEffect(() => {
    if (loggedInUser.length !== 0) {
      console.log('user arr:', user);
      const tempUpdateValues = {...user};
      console.log('temp array: ', tempUpdateValues);
      for (const [key, value] of Object.entries(loggedInUser.fields)) {
        if (
          key === 'primaryLocation' ||
          key === 'secondaryLocation' ||
          (key === 'firstName' && value !== 'not set' && value !== '')
        ) {
          tempUpdateValues[key] = value;
          console.log('added: ', key, value);
        }
      }
    }
  }, [loggedInUser]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container direction="row" sx={{marginTop: 2}}>
        <Paper elevation={2}>
          <Grid item md={6}>
            <Typography variant="h6">Welcome Back </Typography>
          </Grid>
        </Paper>
        <Grid item md={6}>
          <Typography variant="h6">Testing Location</Typography>
          <Typography variant="h5">Some more text</Typography>
        </Grid>
      </Grid>

      <div>
        <div className={styles.leftDiv}>
          <JobTable></JobTable>
        </div>
        <div className={styles.rightDiv}>Applied Jobs</div>
      </div>
    </ThemeProvider>
  );
};

export default UserDisplay;

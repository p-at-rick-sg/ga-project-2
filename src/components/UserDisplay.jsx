import {useEffect, useState} from 'react';
import useFetch from '../hooks/useFetch';
import {useUser} from '../hooks/useUser';
import styles from './UserDisplay.module.css';

// MUI Imports

import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider} from '@mui/material/styles';
// Import the functions you need from the SDKs you need FIREBASE
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAnalytics} from 'firebase/analytics';
import {collection, addDoc, getDocs} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const UserDisplay = () => {
  const {defaultTheme, BASEURI, BASEID, TABLEID, authenticated, setAuthenticated, setUser, user} =
    useUser();
  const bearer = import.meta.env.VITE_AIRTABLEPAT;
  const USERID = user.airtableId;
  const [loggedInUser, fetchUser] = useFetch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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

  // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  // const db = getFirestore(app);

  //
  //  ******** END FIREBASE CONFIG ********

  // ******* Start Firebase Firestore Testing
  // const testFirestore = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, 'users'), {
  //       first: 'Ada',
  //       last: 'Lovelace',
  //       born: 1815,
  //     });
  //     console.log('Document written with ID: ', docRef.id);
  //   } catch (e) {
  //     console.error('Error adding document: ', e);
  //   }
  // };

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

  // const getFirebaseData = async () => {
  //   const querySnapshot = await getDocs(collection(db, 'users'));
  //   querySnapshot.forEach(doc => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //   });
  // };

  // useEffect(() => {
  //   console.log('Testing Firestore Connection');
  //   // testFirestore();
  //   // testFirestore2();
  //   getFirebaseData();
  // }, [user]);

  //  ******* End Firestore Testing ********

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="md">
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography variant="h2">Welcome Back</Typography>
          <Typography variant="h5">{user.email}</Typography>
        </Box>
      </Container>

      <div>
        <div className={styles.leftDiv}>Jobs List</div>
        <div className={styles.rightDiv}>Applied Jobs</div>
      </div>
    </ThemeProvider>
  );
};

export default UserDisplay;

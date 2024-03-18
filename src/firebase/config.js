import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

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
const auth = getAuth(app);
//  ******** END FIREBASE CONFIG ********

export {db, auth};

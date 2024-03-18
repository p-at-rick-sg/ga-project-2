import {useEffect, useState} from 'react';
import useFetch from '../hooks/useFetch';
import {useUser} from '../hooks/useUser';
import styles from './UserDisplay.module.css';
import JobTable from './JobTable';
import JobDetails from './JobDetails';

// MUI Imports

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {ThemeProvider} from '@mui/material/styles';

import {db} from '../firebase/config';
import {useFirestore} from '../hooks/useFirestore';
import Footer from './Footer';

const UserDisplay = () => {
  const {defaultTheme, BASEURI, BASEID, TABLEID, authenticated, setAuthenticated, setUser, user} =
    useUser();
  const bearer = import.meta.env.VITE_AIRTABLEPAT;
  const USERID = user.airtableId;
  const [loggedInUser, fetchUser] = useFetch();
  // const [jobs, setJobs] = useState([]);
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

  // New firestore hook lookup
  const {documents: jobs} = useFirestore('jobs');

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
          {jobs && (
            <JobTable
              jobs={jobs}
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}></JobTable>
          )}
        </div>
        <div className={styles.rightDiv}>
          {jobs && <JobDetails jobs={jobs} selectedRows={selectedRows} />}
        </div>
      </div>
      <Grid container direction="column" sx={{marginTop: 2}}>
        <Grid item sm={12} md={12}>
          <Footer />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default UserDisplay;

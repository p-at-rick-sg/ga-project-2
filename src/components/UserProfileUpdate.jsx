import {useState, useEffect} from 'react';
import {Button, CircularProgress} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {InputLabel, Paper} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider} from '@mui/material/styles';
import {useUser} from '../hooks/useUser';
import useFetch from '../hooks/useFetch';

export default function UserProfileUpdate({setShowUpdate}) {
  const {defaultTheme, BASEURI, BASEID, TABLEID, user} = useUser();
  const USERID = user.airtableId;
  const [userDetails, fetchUser] = useFetch();
  const [patchResponse, patchUser] = useFetch();
  const [inputFields, setInputFields] = useState({
    firstName: '',
    lastName: '',
    primaryLocation: 'not set',
    secondaryLocation: 'not set',
    highestLevel: 'not set',
    highestSubject: 'not set',
    activelySearching: false,
  });
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [updateValues, setUpdateValues] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  //update the existing user in Airtable
  const updateUser = controller => {
    setLoading(true);
    const fullURI = BASEURI + BASEID + TABLEID + '/' + USERID;

    const signal = controller.signal;
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + import.meta.env.VITE_AIRTABLEPAT);
    myHeaders.append('Content-Type', 'application/json');

    const myRequestOptions = {
      signal,
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify({
        //create an object to pass in for this
        fields: updateValues,
      }),
      redirect: 'follow',
    };
    patchUser(fullURI, myRequestOptions);
  };
  //wait for the patchResponse update and close the form
  useEffect(() => {
    console.log('response is', patchResponse);
    console.log('id is: ', user.airtableId);
    if (patchResponse.id === user.airtableId) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowUpdate(false); //add a delay here later
      }, 1500);
    }
  }, [patchResponse]);

  //fetching the latest user details from the airtable database
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
    console.log('initial fetch of the logged in users details from Airtable');
    setLoading(true);
    if (errors.length === 0) {
      console.log('past the check');
      const controller = new AbortController();
      getOneUser(controller.signal);
      setLoading(false);
      return () => {
        controller.abort();
      };
    }
  }, []);

  //use the data from the initial fetch above
  useEffect(() => {
    //update the pulled details from the initial pull to the state
    if (userDetails.length !== 0) {
      for (const [key, value] of Object.entries(userDetails.fields)) {
        if (key in inputFields) inputFields[key] = value;
      }
    }
    setLoading(false);
  }, [userDetails]);

  const validateValues = (first, last) => {
    const errors = [];
    if (first.length < 2) errors.push('First Name Error');
    if (last.length < 2) errors.push('Last Name Error');
    return errors;
  };

  const handleSubmit = e => {
    console.log('submit button');
    e.preventDefault();
    setErrors(validateValues(inputFields.firstName, inputFields.lastName));
    setUpdateValues({}); //clear any previous update value that may be lingering
    const tempUpdateValues = {};
    for (const [key, value] of Object.entries(inputFields)) {
      if (value !== 'not set' && value !== '') {
        tempUpdateValues[key] = value;
        console.log('added a value to the updateValues object');
      }
    }
    setUpdateValues(tempUpdateValues);
    setSubmitting(true);
  };

  useEffect(() => {
    if (submitting && updateValues.length !== 0) {
      const controller = new AbortController();
      updateUser(controller.signal);
      return () => {
        controller.abort();
      };
    }
  });

  const handleChange = e => {
    setInputFields({...inputFields, [e.target.name]: e.target.value});
    console.log(e.target.value);
  };

  const handleSelectChange = e => {
    setInputFields({...inputFields, [e.target.name]: e.target.value});
    console.log(inputFields);
  };

  const handleCheckChange = e => {
    console.log(e.target.checked);
    setInputFields({...inputFields, [e.target.name]: e.target.checked});
  };

  if (!showSuccess) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md" sx={{mt: 4}}>
          <CssBaseline />
          {loading && <CircularProgress />}
          <Box component="Form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  name="firstName"
                  value={inputFields.firstName}
                  onChange={handleChange}
                  autoFocus
                  placeholder="First Name"
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  autoComplete="family-name"
                  required
                  fullWidth
                  name="lastName"
                  value={inputFields.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email Address"
                  value={user.email} //this comes from the con text user value and it locked in this screen
                  disabled={true}
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel id="highest-level-label">Highest Education level</InputLabel>
                <Select
                  fullWidth
                  labelId="highest-level-label"
                  value={inputFields.highestLevel}
                  label="Primary Location"
                  name={'highestLevel'}
                  onChange={handleChange}>
                  <MenuItem value={'not set'}>Not Set</MenuItem>
                  <MenuItem value={'bsc'}>Bsc</MenuItem>
                  <MenuItem value={'ba'}>BA</MenuItem>
                  <MenuItem value={'mba'}>MBA</MenuItem>
                  <MenuItem value={'msc'}>MSc</MenuItem>
                </Select>
              </Grid>
              <Grid item md={6}>
                <InputLabel id="highest-subject-label">Highest Education Subject</InputLabel>
                <Select
                  fullWidth
                  labelId="highest-subject-label"
                  name={'highestSubject'}
                  value={inputFields.highestSubject}
                  label="Highest Subject"
                  onChange={handleChange}>
                  <MenuItem value={'not set'}>Not Set</MenuItem>
                  <MenuItem value={'maths'}>Maths</MenuItem>
                  <MenuItem value={'biology'}>Biology</MenuItem>
                  <MenuItem value={'law'}>Law</MenuItem>
                  <MenuItem value={'computerScience'}>Computer Science</MenuItem>
                </Select>
              </Grid>
              <Grid item md={6}>
                <InputLabel id="primary-location-label">Primary Location</InputLabel>
                <Select
                  fullWidth
                  labelId="PrimaryLocationLabel"
                  id="PrimaryLocation"
                  name={'primaryLocation'}
                  value={inputFields.primaryLocation}
                  label="Primary Location"
                  onChange={handleChange}>
                  <MenuItem value={'not set'}>Not Set</MenuItem>
                  <MenuItem value={'singapore'}>Singapore</MenuItem>
                  <MenuItem value={'uk'}>UK</MenuItem>
                  <MenuItem value={'malaysia'}>Malaysia</MenuItem>
                </Select>
              </Grid>
              <Grid item md={6}>
                <InputLabel id="secondary-location-label">Secondary Location</InputLabel>
                <Select
                  fullWidth
                  labelId="secondary-location-label"
                  id="SecondaryLocation"
                  name={'secondaryLocation'}
                  value={inputFields.secondaryLocation}
                  label="Secondary Location"
                  onChange={handleChange}>
                  <MenuItem value={'not set'}>Not Set</MenuItem>
                  <MenuItem value={'singapore'}>Singapore</MenuItem>
                  <MenuItem value={'uk'}>UK</MenuItem>
                  <MenuItem value={'malaysia'}>Malaysia</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="activeSearcher" color="primary" />}
                  label="I am actively looking for a new role"
                  name={'activelySearching'}
                  onChange={handleCheckChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{mt: 3, mb: 2}}
                  disabled={false}>
                  Update My Details
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    );
  } else
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md" sx={{mt: 4}}>
          <CssBaseline />
          <Box>
            <Grid container spacing={2}></Grid>
            <Typography component="h1" variant="h5">
              Success
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
}

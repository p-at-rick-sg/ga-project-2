import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider} from '@mui/material/styles';
import {useUser} from '../hooks/useUser';
import {NavLink} from 'react-router-dom';
import {useState, useEffect} from 'react';
import useFetch from '../hooks/useFetch';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Patrick Kittle
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const {defaultTheme, BASEURI, BASEID, TABLEID, authenticated, setAuthenticated, setUser} =
    useUser();
  const [users, fetchUsers] = useFetch();
  const [creds, setCreds] = useState({email: '', password: ''});
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const validateValues = inputValues => {
    const errors = [];
    const regex = new RegExp('^[^@]+@[^@]+.[^@]+$');
    if (regex.test(inputValues.email)) {
      console.log('email ok');
      if (inputValues.password.length < 8) {
        errors.push('Password is too short');
        console.log('password too short');
      }
    } else errors.push('Invalid Email Address');
    return errors;
  };

  // the getuser function called to pull all the user records
  const getAllUsers = controller => {
    const signal = controller.signal;
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + import.meta.env.VITE_AIRTABLEPAT);

    const myRequestOptions = {
      signal,
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    const fullURI = BASEURI + BASEID + TABLEID;
    fetchUsers(fullURI, myRequestOptions);
    //do i put the isLoading state to true here or before I call the fetch hook
  };

  //pulling the full list of users
  useEffect(() => {
    console.log('initial fetch users effect');
    if (errors.length === 0 && submitting) {
      const controller = new AbortController();
      getAllUsers(controller.signal);

      return () => {
        controller.abort();
      };
    }
  }, [errors, submitting]);

  //checking the creds against the users data
  useEffect(() => {
    if (users.length !== 0) {
      for (const userRecord of users.records) {
        console.log(userRecord.fields.email);
        if (userRecord.fields.email.toLowerCase() === creds.email.toLowerCase()) {
          if (userRecord.fields.password === creds.password) {
            console.log('password is OK');
            console.log(userRecord.id);
            setUser({email: creds.email, airtableId: userRecord.id});
            setAuthenticated(true);
            console.log('set useID to ', userRecord.id);
            break;
          } else console.log('incorrect password');
        } else console.log('incorrect username');
      }
    }
  }, [users]);

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(validateValues({email: creds.email, password: creds.password}));
    //creds are valid - checking the user/password logic here
    setSubmitting(true); //need to set this back to false if the login fails
  };

  const handleChange = e => {
    //check for the sending field and update the values accordingly
    if (e.target.name === 'email') setCreds({email: e.target.value, password: creds.password});
    if (e.target.name === 'password') setCreds({email: creds.email, password: e.target.value});
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errors.map(error => (
            <div>{error}</div>
          ))}
          {authenticated && <div>User Authenticated OK</div>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={creds.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={creds.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link>Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link variant="body2">
                  <NavLink to="/signup">{"Don't have an account? Sign Up"}</NavLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{mt: 8, mb: 4}} />
      </Container>
    </ThemeProvider>
  );
}

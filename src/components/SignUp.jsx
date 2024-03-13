import {useState, useEffect} from 'react';
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
import useFetch from '../hooks/useFetch';
import {NavLink} from 'react-router-dom';

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

export default function SignUp() {
  const {defaultTheme, BASEURI, BASEID, TABLEID} = useUser();
  const [users, fetchUsers] = useFetch();
  const [newUser, addNewUser] = useFetch();
  const [userExists, setUserExists] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [inputFields, SetInputFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateValues = inputValues => {
    let errors = {};
    if (inputValues.email.length < 5) {
      errors.email = 'Email is too short';
    }
    if (inputValues.password.length < 8) {
      errors.passwordLength = 'Password is too short';
    }
    if (inputValues.passwordCheck !== inputValues.password) {
      errors.passwordMatch = 'Passwords Do Not Match';
    }
    return errors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(validateValues(inputFields));
    setSubmitting(true);
  };

  const handleChange = e => {
    SetInputFields({...inputFields, [e.target.name]: e.target.value});
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      const controller = new AbortController();
      getAllUsers(controller.signal);

      return () => {
        controller.abort();
      };
    }
  }, [errors]);

  useEffect(() => {
    if (users.length !== 0) {
      setUserExists(false); //reset the exists property on submit
      // check if the email is already in the database
      for (const userRecord of users.records) {
        console.log(userRecord.fields.email);
        if (userRecord.fields.email.toLowerCase() === inputFields.email.toLowerCase()) {
          console.log('User Already Exists');
          setUserExists(true);
        } else {
          // set the state to allow ther add user effect to run
          setAddUser(true);
        }
      }
    }
  }, [users]);

  const insertUser = controller => {
    const fullURI = BASEURI + BASEID + TABLEID;

    const signal = controller.signal;
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + import.meta.env.VITE_AIRTABLEPAT);
    myHeaders.append('Content-Type', 'application/json');

    const myRequestOptions = {
      signal,
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        fields: {
          email: inputFields.email,
          password: inputFields.password,
        },
      }),
      redirect: 'follow',
    };
    addNewUser(fullURI, myRequestOptions);
  };

  useEffect(() => {
    if (addUser) {
      const controller = new AbortController();
      insertUser(controller.signal);

      return () => {
        controller.abort();
      };
    }
  }, [addUser]);

  useEffect(() => {
    if (addUser.id !== undefined) {
    }
  }, [addUser.id]);

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
  };

  if (!newUser.id) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="sm">
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
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={inputFields.firstName}
                    onChange={handleChange}
                    autoFocus
                    disabled={addUser ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={inputFields.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    disabled={addUser ? true : false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={inputFields.email}
                    onChange={handleChange}
                    autoComplete="email"
                    disabled={addUser ? true : false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={inputFields.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    disabled={addUser ? true : false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="passwordCheck"
                    label="PasswordCheck"
                    type="password"
                    id="passwordCheck"
                    value={inputFields.passwordCheck}
                    onChange={handleChange}
                    autoComplete="new-password"
                    disabled={addUser ? true : false}
                  />
                </Grid>

                {errors &&
                  Object.entries(errors).map((value, idx) => {
                    <div key={idx}>{value[0]}</div>;
                  })}

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive great promotions and updates via email."
                  />
                </Grid>
              </Grid>
              {userExists && (
                <Grid>
                  <div>
                    User Already Exists - <NavLink to="/signin">Login</NavLink>
                  </div>
                </Grid>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                disabled={addUser ? true : false}>
                Sign Up Now
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="signin" variant="body2">
                    <NavLink to="/signin">Already have an account? Sign in Here</NavLink>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{mt: 5}} />
        </Container>
      </ThemeProvider>
    );
  } else
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="sm">
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
              Account Succesfully Created! <NavLink to="/signin">Login</NavLink>
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
}

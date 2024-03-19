import {useState, useEffect} from 'react';
import {useRecruiter} from '../hooks/useRecruiter';
import {useNavigate} from 'react-router-dom';

//MUJI Imports
import {ThemeProvider} from '@mui/material';
import {Container} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {Box, CircularProgress} from '@mui/material';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {NavLink} from 'react-router-dom';
import {useSignup} from '../hooks/useSignup';
import Footer from './Footer';

const RecruiterSignup = () => {
  const {recruiterTheme} = useRecruiter();
  //bring in the signup hook function
  const {error, signup} = useSignup();
  const [inputFields, SetInputFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [errors, setErrors] = useState({});
  const [addUser, setAddUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    e.preventDefault();
    setErrors(validateValues(inputFields));
    const submitEmail = inputFields.email;
    const submitPassword = inputFields.password;
    if (Object.keys(errors).length === 0) {
      setAddUser(true);
      signup(submitEmail, submitPassword);
      setTimeout(() => {
        navigate('/recruiter-display');
      }, 1000);
      setLoading(false);
    }
  };

  const handleChange = e => {
    SetInputFields({...inputFields, [e.target.name]: e.target.value});
  };

  return (
    <div>
      <ThemeProvider theme={recruiterTheme}>
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
              Sign up as a Recruiter/Company User
            </Typography>
            {loading && <CircularProgress />}
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

                {error &&
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

              {error && (
                <Grid>
                  <div>{error}</div>
                </Grid>
              )}
              {error && (
                <Grid>
                  User Already Exists - <NavLink to="/signin">Login</NavLink>
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
                <Grid item component={NavLink} to="/recruiter-signin">
                  Already have an account? Sign in Here
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default RecruiterSignup;

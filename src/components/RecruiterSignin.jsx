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
import {NavLink} from 'react-router-dom';
import {useState} from 'react';
import {useRecruiter} from '../hooks/useRecruiter';
import {useSignin} from '../hooks/useSignin';
import {useNavigate} from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/p-at-rick-sg">
        Patrick Kittle
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const RecruiterSignin = () => {
  const {recruiterTheme} = useRecruiter();
  const {error, signin} = useSignin();
  const [creds, setCreds] = useState({email: '', password: ''});
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    signin(creds.email, creds.password);
    navigate('/recruiter-display');
  };

  const handleChange = e => {
    //check for the sending field and update the values accordingly
    if (e.target.name === 'email') setCreds({email: e.target.value, password: creds.password});
    if (e.target.name === 'password') setCreds({email: creds.email, password: e.target.value});
  };

  return (
    <ThemeProvider theme={recruiterTheme}>
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
            Recruiter/Company Sign-in
          </Typography>
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
                  <NavLink to="/recruiter-signup">{"Don't have an account? Sign Up"}</NavLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{mt: 8, mb: 4}} />
      </Container>
    </ThemeProvider>
  );
};

export default RecruiterSignin;

import styles from './NavBar.module.css';
import {NavLink, Link} from 'react-router-dom';
import {useUser} from '../hooks/useUser';

//MUI Imports
import {AppBar, Box, Button, Toolbar, Typography, IconButton, CssBaseline} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Fragment} from 'react';

const NavBar = ({setShowUpdate, showUpdate}) => {
  const {user, pageTitle, logout} = useUser();

  const handleClick = () => {
    if (showUpdate) setShowUpdate(false);
    else setShowUpdate(true);
  };

  return (
    <Fragment>
      <CssBaseline />
      <Box sx={{flexgrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              // ege="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
              component={NavLink}
              to="/home">
              {/* <MenuIcon /> */} JobFinder
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              {pageTitle && pageTitle}
            </Typography>
            {!user.email && (
              <Button color="inherit" component={NavLink} to="signin">
                Login
              </Button>
            )}

            {!user.email && (
              <Button color="error" component={NavLink} to="recruiter-signin">
                Recruiter Login
              </Button>
            )}

            {user.email && (
              <Button color="inherit" component={NavLink} to="home" onClick={logout}>
                Logout
              </Button>
            )}
            {user.email && (
              <Button color="inherit" component={NavLink} to="user">
                User Area
              </Button>
            )}
            {!user.email && (
              <Button color="inherit" component={NavLink} to="signup">
                Sign Up
              </Button>
            )}
            {user.email && (
              <AccountCircle onClick={handleClick} sx={{fontSize: 40, marginLeft: 5}} />
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Fragment>
  );
};

export default NavBar;

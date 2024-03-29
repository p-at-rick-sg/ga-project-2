import styles from './NavBar.module.css';
import {NavLink, Link} from 'react-router-dom';

//hook & context imports
import {useUser} from '../hooks/useUser';
import {useLogout} from '../hooks/useLogout';

//MUI Imports
import {AppBar, Box, Button, Toolbar, Typography, IconButton, CssBaseline} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Fragment} from 'react';
import {useRecruiter} from '../hooks/useRecruiter';

const NavBar = ({setShowUpdate, showUpdate}) => {
  const {recUser, pageTitle} = useRecruiter();
  const {logout} = useLogout();

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
              JobFinder
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              {pageTitle && pageTitle}
            </Typography>

            {recUser && (
              <Button color="inherit" component={NavLink} to="/recruiter-display">
                My Home
              </Button>
            )}
            {!recUser && (
              <Button color="inherit" component={NavLink} to="signin">
                Login
              </Button>
            )}

            {recUser && <AccountCircle onClick={handleClick} sx={{fontSize: 40, marginLeft: 5}} />}
            {recUser && (
              <Button color="inherit" onClick={logout} component={NavLink} to="home">
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Fragment>
  );
};

export default NavBar;

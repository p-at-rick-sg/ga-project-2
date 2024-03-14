import styles from './NavBar.module.css';
import {NavLink, Link} from 'react-router-dom';
import {useUser} from '../hooks/useUser';

//MUI Imports
import {AppBar, Box, Button, Toolbar, Typography, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

const NavBar = ({setShowUpdate, showUpdate}) => {
  const {user, pageTitle} = useUser();
  const handleClick = () => {
    if (showUpdate) setShowUpdate(false);
    else setShowUpdate(true);
  };

  return (
    <Box sx={{flexgrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" ege="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            {pageTitle && pageTitle}
          </Typography>
          {/* <Button color="inherit">Search</Button>  //will need this later in the users section possibly */}
          {/* <Button color="inherit">Post Job</Button>  //will need this later once we get to recruiter section */}
          {!user.name && (
            <Button color="inherit" component={NavLink} to="signin">
              Login
            </Button>
          )}
          {!user.name && (
            <Button color="inherit" component={NavLink} to="signup">
              Sign Up
            </Button>
          )}
          {user.name && <AccountCircle onClick={handleClick} sx={{fontSize: 40}} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;

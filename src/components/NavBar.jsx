import styles from './NavBar.module.css';
import {Link} from 'react-router-dom';
import {useUser} from '../hooks/useUser';

//MUI Imports
import {AppBar, Box, Button, Toolbar, Typography, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

const NavBar = () => {
  const {user} = useUser();

  return (
    <Box sx={{flexgrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" ege="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Placeholder Page Title
          </Typography>
          <Button color="inherit">Search</Button>
          <Button color="inherit">Post Job</Button>
          {!user.name && <Button color="inherit">Login</Button>}
          {user.name && <AccountCircle />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;

// const {user, logout} = useContext(UserContext);
// return <div>{user?.name}</div>;

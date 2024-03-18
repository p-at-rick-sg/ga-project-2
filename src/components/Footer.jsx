import {useRecruiter} from '../hooks/useRecruiter';

//MUI Imports
import {Container, Box, Typography, ThemeProvider, Link} from '@mui/material';

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

const Footer = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          py: 2,
          mt: 5,
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        }}>
        <Container>
          <Typography variant="body1">A cool looking Footer Element</Typography>
          <Copyright />
        </Container>
      </Box>
    </>
  );
};

export default Footer;

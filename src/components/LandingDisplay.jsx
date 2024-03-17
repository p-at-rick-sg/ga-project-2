import {NavLink, Link} from 'react-router-dom';
import mainImage from '../assets/jobs.jpeg';

//MUI imports
import {Box, Grid, Typography, Paper, Button} from '@mui/material';

const LandingDisplay = () => {
  return (
    <>
      <Grid container spacing={5} sx={{marginTop: 5}}>
        <Grid item lg={6} md={10} sm={8}>
          <Box
            component="img"
            sx={{maxWidth: '100%', borderRadius: '5px', boxShadow: 2}}
            direction="column"
            alignItems="center"
            justifyContent="center"
            alt="Recruitment Image"
            src={mainImage}></Box>
        </Grid>
        <Grid item lg={6} md={10} sm={8}>
          <Paper sx={{height: 400}}>
            <Typography variant="h2" color="primary" sx={{margin: '0 10px'}}>
              Welcome to the Latest Concept in Recruitment
            </Typography>
            <hr />
            <br />
            <Typography variant="h4" color="secondary" sx={{marginTop: '10px'}}>
              Matching Candidate Skills with Employer Requirements
            </Typography>
          </Paper>
        </Grid>
        <Grid item lg={5} md={10} sm={10} sx={{margin: '5px', marginTop: '10px'}}>
          <Button variant="contained" component={NavLink} to="/signup">
            JobSeeker Signup
          </Button>
        </Grid>
        <Grid item lg={5} md={10} sm={8} sx={{margin: '5px', marginTop: '10px'}}>
          <Button variant="outlined">Recruiter Signup</Button>
        </Grid>
        <Grid item lg={12} md={10} sm={8} sx={{padding: 5}}>
          <Paper>
            <Typography variant="body">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo aperiam eius neque
              tempore molestiae provident temporibus voluptas? Quia esse facere voluptatibus rerum
              officia corporis consequatur corrupti at quam a autem quaerat veritatis quisquam,
              facilis iste quidem molestiae officiis vero, vitae fuga quasi modi optio deserunt
              cupiditate? Eveniet voluptates itaque maiores.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default LandingDisplay;

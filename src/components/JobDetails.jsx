import {useState, useEffect} from 'react';
import {Card, CardContent, Typography, Button} from '@mui/material';
import CardActions from '@mui/material/CardActions';

const JobDetails = ({jobs, selectedRows}) => {
  const [currentJob, setCurrentJob] = useState({});

  const selectJob = () => {
    console.log('blblbl', currentJob);
    for (const job of jobs) {
      if (job.id === selectedRows[0]) {
        setCurrentJob(job);
      }
    }
  };

  useEffect(() => {
    selectJob();
  }, [selectedRows]);

  if (currentJob.jobTitle !== undefined) {
    return (
      <>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {currentJob.jobTitle.toUpperCase()}
            </Typography>
            <Typography sx={{mb: 1.5}} color="text.secondary">
              {currentJob.company} : {currentJob.location}
            </Typography>
            <hr />
            <Typography variant="body2">{currentJob.jobDescription}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Register Interest</Button>
          </CardActions>
        </Card>
      </>
    );
  }
};

export default JobDetails;

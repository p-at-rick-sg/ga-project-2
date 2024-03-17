import {useEffect} from 'react';
import {useUser} from '../hooks/useUser'; //import the useUser context
import RecruiterDisplay from '../components/RecruiterDisplay';
import {useFirestore} from '../hooks/useFirestore';

const RecruiterPage = () => {
  //Set NavBar Ttile
  const {setPageTitle} = useUser();
  useEffect(() => {
    setPageTitle('Recruiters Area');
  }, []);

  const {documents: jobs} = useFirestore('jobs');
  return (
    <div>
      Recruiters Page TL
      {jobs &&
        jobs.map((job, idx) => {
          return <p>{job.jobTitle} </p>;
        })}
      <RecruiterDisplay />
    </div>
  );
};

export default RecruiterPage;

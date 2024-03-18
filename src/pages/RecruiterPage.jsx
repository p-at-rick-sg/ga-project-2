import {useEffect} from 'react';

//contect imports
import {useUser} from '../hooks/useUser'; //import the useUser context
import {useRecruiter} from '../hooks/useRecruiter';

import RecruiterDisplay from '../components/RecruiterDisplay';
import {useFirestore} from '../hooks/useFirestore';

const RecruiterPage = () => {
  //Set NavBar Ttile
  const {setPageTitle} = useUser();
  useEffect(() => {
    setPageTitle('Recruiters Area');
  }, []);

  const {documents: jobs} = useFirestore('jobs'); //will use this to pull a list of jobs back

  return (
    <div>
      <RecruiterDisplay />
    </div>
  );
};

export default RecruiterPage;

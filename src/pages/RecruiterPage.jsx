import {useEffect} from 'react';
import {useUser} from '../hooks/useUser'; //import the useUser context

const RecruiterPage = () => {
  // testing the propped context by destructuing the function we need here
  const {setPageTitle} = useUser();
  // and calling it in the useEffect function below
  useEffect(() => {
    setPageTitle('Recruiters Area');
  }, []);

  return <div>Recruiters Page TL</div>;
};

export default RecruiterPage;

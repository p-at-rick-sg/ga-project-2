import UserDisplay from '../components/UserDisplay';
import {useEffect} from 'react';
import {useUser} from '../hooks/useUser'; //import the useUser context

const UserPage = () => {
  // testing the propped context by destructuing the function we need here
  const {setPageTitle} = useUser();
  // and calling it in the useEffect function below
  useEffect(() => {
    setPageTitle('Job Seekers Area');
  }, []);
  return (
    <>
      <h1>Users Page TL</h1>
      <br />
      <UserDisplay></UserDisplay>
    </>
  );
};

export default UserPage;

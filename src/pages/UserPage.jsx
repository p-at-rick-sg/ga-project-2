import UserDisplay from '../components/UserDisplay';
import {useEffect, useState} from 'react';
import {useUser} from '../hooks/useUser'; //import the useUser context
import UserProfileUpdate from '../components/UserProfileUpdate';

const UserPage = ({showUpdate, setShowUpdate}) => {
  const {setPageTitle} = useUser();

  // calling the page title update
  useEffect(() => {
    setPageTitle('Job Seekers Area');
  }, []);

  return (
    <>
      {!showUpdate && <UserDisplay />}
      {showUpdate && <UserProfileUpdate setShowUpdate={setShowUpdate} />}
    </>
  );
};

export default UserPage;

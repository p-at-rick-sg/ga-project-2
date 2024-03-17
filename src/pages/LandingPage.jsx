import LandingDisplay from '../components/LandingDisplay';
import {useEffect, useState} from 'react';
import {useUser} from '../hooks/useUser'; //import the useUser context

const LandingPage = () => {
  const {setPageTitle} = useUser();
  // calling the page title update
  useEffect(() => {
    setPageTitle('#1 Job Search Site');
  }, []);
  return <LandingDisplay />;
};

export default LandingPage;

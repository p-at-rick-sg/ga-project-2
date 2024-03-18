import React from 'react';
import {useRecruiter} from '../hooks/useRecruiter';
import NewJobForm from './NewJobForm';

const RecruiterDisplay = () => {
  const {recruiterTheme} = useRecruiter();

  return (
    <div>
      <NewJobForm></NewJobForm>
    </div>
  );
};

export default RecruiterDisplay;

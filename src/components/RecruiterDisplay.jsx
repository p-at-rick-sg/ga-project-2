import React from 'react';
import {useRecruiter} from '../hooks/useRecruiter';

const RecruiterDisplay = () => {
  const {recruiterTheme} = useRecruiter();

  return <div>Recruiter display component</div>;
};

export default RecruiterDisplay;

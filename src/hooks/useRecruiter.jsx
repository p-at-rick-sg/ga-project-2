import {RecruiterContext} from '../context/RecruiterContext';
import {useContext} from 'react';

export const useRecruiter = () => {
  const recContext = useContext(RecruiterContext);

  if (!recContext) {
    throw Error('useRecruiterContext must be used inside an autContextProvider');
  }

  return recContext;
};

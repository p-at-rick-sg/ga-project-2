import {useState} from 'react';
import {useRecruiter} from './useRecruiter';

//firebase imports
import {auth} from '../firebase/config';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const useSignup = () => {
  const [error, setError] = useState(null);
  const {dispatch} = useRecruiter();

  //   console.log(auth);  api key is correct

  const signup = (email, password) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then(newCreds => {
        console.log('user created OK');
        dispatch({type: 'LOGIN', payload: newCreds.user});
      })
      .catch(err => {
        setError('err.message');
        console.log('error: ', err.message);
      });
  };
  return {error, signup};
};

export {useSignup};

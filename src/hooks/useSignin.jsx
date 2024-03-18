import {useState} from 'react';
import {useRecruiter} from './useRecruiter';

//firebase imports
import {auth} from '../firebase/config';
import {signInWithEmailAndPassword} from 'firebase/auth';

const useSignin = () => {
  const [error, setError] = useState(null);
  const {dispatch} = useRecruiter();

  const signin = (email, password) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then(creds => {
        console.log('Signin OK');
        dispatch({type: 'LOGIN', payload: creds.user});
      })
      .catch(err => {
        setError('err.message');
        console.log('error: ', err.message);
      });
  };
  return {error, signin};
};

export {useSignin};

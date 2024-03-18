//context import
import {useRecruiter} from './useRecruiter';

//firebase imports
import {auth} from '../firebase/config';
import {signOut} from 'firebase/auth';

const useLogout = () => {
  console.log('use logout called OK');
  //bring in dispatch funtion which handles the logout/in logic for firebase
  const {dispatch} = useRecruiter();

  // the logout function itself
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log('logged out the user OK');
        dispatch({type: 'LOGOUT'});
      })
      .catch(err => {
        console.log('Error: ', err.message);
      });
  };
  return {logout};
};

export {useLogout};

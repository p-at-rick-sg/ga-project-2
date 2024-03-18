import {createContext, useReducer, useEffect} from 'react';
import {createTheme} from '@mui/material';
import {auth} from '../firebase/config';
import {onAuthStateChanged} from 'firebase/auth';

export const RecruiterContext = createContext();
const recruiterTheme = createTheme();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, recUser: action.payload};
    case 'LOGOUT':
      return {...state, recUser: null};
    case 'AUTH_IS_READY':
      return {recUser: action.payload, authIsReady: true};
    default:
      return state;
  }
};

export const RecruiterProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, {
    recUser: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, recUser => {
      dispatch({type: 'AUTH_IS_READY', payload: recUser});
      unsub();
    });
  }, []);

  const value = {
    recruiterTheme,
    ...state,
    dispatch,
  };

  return <RecruiterContext.Provider value={value}>{children}</RecruiterContext.Provider>;
};

import {createContext, useReducer, useEffect} from 'react';
import {auth} from '../firebase/config';
import {onAuthStateChanged} from 'firebase/auth';

export const RecruiterContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, user: action.payload};
    case 'LOGOUT':
      return {...state, user: null};
    case 'AUTH_IS_READY':
      return {user: action.payload, authIsReady: true};
    default:
      return state;
  }
};

export const AuthContectProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      dispatch({type: 'AUTH_IS_READY', payloafd: user});
      unsub();
    });
  }, []);

  return <RecruitContextProvider value={{...state, dispatch}}>{children}</RecruitContextProvider>;
};

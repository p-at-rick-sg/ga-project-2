import {useEffect, useState} from 'react';
import useFetch from '../hooks/useFetch';
import {useUser} from '../hooks/useUser'; //import the useUser context

const UserDisplay = () => {
  const bearer = import.meta.env.VITE_AIRTABLEPAT;
  const BASEURI = 'https://api.airtable.com/v0/';
  const BASEID = 'appczfLTtCoMql9J8/';
  const TABLEID = 'tblK9XMatvmUi5vNS';
  const USERID = 'users/rec861xSLSYZzzwbV'; //for testing of pulling 1 record
  const [userList, setUserList] = useState({});
  const [users, fetchUsers] = useFetch();
  const [user, fetchUser] = useFetch();

  // useEffect(() => {
  //   //get all users
  //   const controller = new AbortController();
  //   getUsers(controller.signal);

  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  const getAllUsers = () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer patPYCjP4bRmQsuEc.15b07cbdd7f809eadba37fc8407f90ae9db79b602a23f61b7f1cee44c5e4429b'
    );
    const myRequestOptions = {
      signal,
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    const fullURI = BASEURI + BASEID + TABLEID;
    fetchUsers(fullURI, myRequestOptions);
  };

  const getOneUser = () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer patPYCjP4bRmQsuEc.15b07cbdd7f809eadba37fc8407f90ae9db79b602a23f61b7f1cee44c5e4429b'
    );
    const myRequestOptions = {
      signal,
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    const fullURI = BASEURI + BASEID + USERID;
    console.log(fullURI);
    fetchUser(fullURI, myRequestOptions);
  };

  // testing the propped context by destructuing the function we need here
  const {setPageTitle} = useUser();
  // and calling it in the useEffect function below
  useEffect(() => {
    setPageTitle('Users Area');
  }, []);

  return (
    <div>
      <p>User Display Component</p>
      <button onClick={getAllUsers}>Get All Users</button>
      {users && JSON.stringify(users)}
      <br />
      <button onClick={getOneUser}>Get 1 user</button>
      {user && JSON.stringify(user)}
    </div>
  );
};

export default UserDisplay;

//import.meta.env.VITE_

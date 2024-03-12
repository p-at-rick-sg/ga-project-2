import {useEffect} from 'react';
import {useUser} from '../hooks/useUser'; //import the useUser context

const AdminPage = () => {
  // testing the propped context by destructuing the function we need here
  const {setPageTitle} = useUser();
  // and calling it in the useEffect function below
  useEffect(() => {
    setPageTitle('** DANGER**Admin Area');
  }, []);
  return <div>Admin Page TL</div>;
};

export default AdminPage;

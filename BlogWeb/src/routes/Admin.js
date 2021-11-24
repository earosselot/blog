import {useEffect, useState} from 'react';

import Login from '../components/Admin/Login';
import AdminPage from '../components/Admin/AdminPage';

import useApi from '../utils/useApi';
import Axios from 'axios';

let localStorageUser = localStorage.getItem('user') || null;
const baseUrl = 'http://localhost:5000/api/user';

function Admin() {
  // const [user, setUser] = useState(localStorageUser);
  const [user, isQueryingUser, userApi] = useApi(`${baseUrl}`);

  useEffect(() => {
    userApi.me();
  }, []);

  return (
    <div>
      {isQueryingUser && 'Loading...'}
      {!isQueryingUser && (
        user.length !== 0 ? <AdminPage userApi={userApi} /> : <Login userApi={userApi} />
      )}
    </div>);
}

export default Admin;

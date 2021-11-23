import { useState } from 'react';

import Login from '../components/Admin/Login';
import AdminPage from '../components/Admin/AdminPage';

function Admin() {
  const [user, setUser] = useState(null);

  return <div>{user ? <AdminPage /> : <Login setUser={setUser} />}</div>;
}

export default Admin;

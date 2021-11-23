import { useState } from 'react';
import Axios from 'axios';

function Login({ setUser }) {
  const [uname, setUname] = useState('');
  const [pw, setPw] = useState('');

  async function handleLogin() {
    const res = await Axios({
      method: 'POST',
      data: {
        username: uname,
        password: pw,
      },
      withCredentials: true,
      url: 'http://localhost:5000/api/user/login',
    });
    if (res.status === 200) {
      setUser(res.data.user);
    }
    console.log(res);
  }

  let isAuth = 'No';

  async function handleIsAuth() {
    const res = await Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:5000/api/user',
    });
    console.log(res);
  }

  return (
    <div>
      <form>
        <label htmlFor="uname">Username: </label>
        <input
          type="text"
          id="uname"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="pw"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={handleIsAuth}>
          Auth?
        </button>
      </form>
      <p>{isAuth === 'No' ? 'No' : 'Yes'}</p>
    </div>
  );
}

export default Login;

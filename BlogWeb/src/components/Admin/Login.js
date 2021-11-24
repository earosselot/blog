import { useState } from 'react';
import Axios from 'axios';

function Login({ setUser, userApi }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    // const res = await Axios({
    //   method: 'POST',
    //   data: {
    //     username: username,
    //     password: password,
    //   },
    //   withCredentials: true,
    //   url: 'http://localhost:5000/api/user/login',
    // });
    // if (res.status === 200) {
    //   localStorage.setItem('user', JSON.stringify(res.data.user));
    //   setUser(res.data.user);
    // }
    // console.log(res);

    const loginData = {
      username: username,
      password: password,
    };

    userApi.login(loginData);
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="pw"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

import React, { useState } from 'react';

const Login = ({ login, register }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const _login = async (ev) => {
    ev.preventDefault();
    try {
      // Eli- Attempt to login
      await login({ username, password });

      //Eli- If successful, clear any previous alert
      window.alert('Login successful');
    } catch (ex) {
      //Eli- If there's an error, show an alert with the error message
      window.alert('Invalid credentials. Please try again.');
      console.error(ex); //Eli- Log the error for debugging
    }
  };

  return (
    <form onSubmit={_login}>
      <input
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button disabled={!username || !password}>Login</button>
      <button type='button' onClick={()=>register({username, password, is_admin:false, is_vip:false})} disabled={!username || !password}>Register</button>
    </form>
  );
};

export default Login;

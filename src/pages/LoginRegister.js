import React from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const LoginRegister = () => {
  return (
    <div className="login-register">
      <Login />
      <Register />
    </div>
  );
};

export default LoginRegister;

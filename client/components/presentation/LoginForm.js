import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  onSubmit, onChange, usernameValue, passwordValue
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="form-inline my-2 my-lg-0"
    >
      <input
        onChange={onChange}
        value={usernameValue}
        name="username"
        className="form-control mr-sm-2"
        type="text"
        placeholder="Username"
        aria-label="Username"
        required
      />
      <input
        onChange={onChange}
        value={passwordValue}
        name="password"
        className="form-control mr-sm-2"
        type="password"
        placeholder="Password"
        aria-label="Password"
        required
      />
      <button id="login-btn" className="btn btn-outline-success my-2 my-sm-2" type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

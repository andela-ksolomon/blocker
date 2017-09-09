import React from 'react';
import PropTypes from 'prop-types';

const SignupForm = ({
  errors, onSubmit, onChange, fullnameValue, usernameValue, emailValue, passwordValue
}) => {
  return (
    <div className="col-sm-4">
      <div className="card my-signup">
        <h4 className="card-header text-center">Create An Account</h4>
        <div className="card-body">
          {errors && <div className="text-danger">{errors}</div>}
          <form
            onSubmit={onSubmit}
            className="form-inline my-2 my-lg-2 justify-content-center align-items-center"
          >
            <input
              onChange={onChange}
              value={fullnameValue}
              name="fullname"
              className="form-control col-sm-10 signup-input"
              type="text"
              placeholder="Full Name"
              aria-label="Full Name"
              required
            />
            <input
              onChange={onChange}
              value={usernameValue}
              name="username"
              className="form-control col-sm-10 signup-input"
              type="text"
              placeholder="Username"
              aria-label="Username"
              required
            />
            <input
              onChange={onChange}
              value={emailValue}
              name="email"
              className="form-control col-sm-10 signup-input"
              type="text"
              placeholder="Email"
              aria-label="Email"
              required
            />
            <input
              onChange={onChange}
              value={passwordValue}
              name="password"
              className="form-control col-sm-10 signup-input"
              type="password"
              placeholder="Password"
              aria-label="Password"
              required
            />
            <button className="btn btn-primary col-sm-10" id="signup-btn" type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;

import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import NavBar from './NavBar';
import AuthenticationActions from '../actions/loginActions';
import { addFlashMessage } from '../actions/flashMessages';
import FlashMessagesList from './FlashMessagesList';
import SignupForm from './presentation/SignupForm';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      username: '',
      email: '',
      password: '',
      errors: '',
      errorStatus: false,
      isLoading: false
    };
  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value 
    });
  };

  onSubmit(event) {
    event.preventDefault();
    this.props.signup(this.state)
      .then((response) => {
        if (response.confirmation === 'fail') {
          this.setState({
            errors: response.message
          });
        } else {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });
          browserHistory.push('/main');
        }
      });
  }

  render() {
    const { errors } = this.state;
    return(
      <div className="background-img" id="home">
        <div className="col-sm-5 justify-content-center">
          <FlashMessagesList />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
                <h1 className="text-white vertical-align">Welcome</h1>
            </div>
            <div className="col-sm-4 ">
              <div className="card my-signup">
                <h4 className="card-header text-center">Create An Account</h4>
                <div className="card-body">
                  <form
                    onSubmit={this.onSubmit}
                    className="form-inline my-2 my-lg-2 justify-content-center align-items-center"
                  >
                    <input
                      onChange={this.onChange}
                      value={this.state.firstname}
                      name="firstname"
                      className="form-control col-sm-10 signup-input"
                      type="text"
                      placeholder="First Name"
                      aria-label="First Name"
                      required
                    />
                    <input
                      onChange={this.onChange}
                      value={this.state.lastname}
                      name="lastname"
                      className="form-control col-sm-10 signup-input"
                      type="text"
                      placeholder="Last Name"
                      aria-label="Last Name"
                      required
                    />
                    <input
                      onChange={this.onChange}
                      value={this.state.username}
                      name="username"
                      className="form-control col-sm-10 signup-input"
                      type="text"
                      placeholder="Username"
                      aria-label="Username"
                      required
                    />
                    <input
                      onChange={this.onChange}
                      value={this.state.email}
                      name="email"
                      className="form-control col-sm-10 signup-input"
                      type="text"
                      placeholder="Email"
                      aria-label="Email"
                      required
                    />
                    <input
                      onChange={this.onChange}
                      value={this.state.password}
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
            { (this.props.authenticated) ?
              (<div />) :
              (
                <SignupForm
                  errors={errors}
                  onSubmit={this.onSubmit}
                  onChange={this.onChange}
                  fullnameValue={this.state.fullname}
                  usernameValue={this.state.username}
                  emailValue={this.state.email}
                  passwordValue={this.state.password}
                />
              )  
            }
            
          </div>
        </div>

      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    authenticated: state.loginReducer.isAuthenticated,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    signup: (data) => {
      return dispatch(AuthenticationActions.signup(data));
    },
    addFlashMessage: (message) => {
      return dispatch(addFlashMessage(message));
    }
  };
};

export default connect(stateToProps, dispatchToProps)(Home);

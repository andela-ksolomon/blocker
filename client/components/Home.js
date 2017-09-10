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
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (this.props.isAuthenticated) {
      browserHistory.push('/main');
    }
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
      <div id="home">
        <div className="background-img">
        <div className="col-sm-5 justify-content-center">
          <FlashMessagesList />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <div className="text-white text-center welcome">
                <h1>Welcome to Blocka</h1>
                <h2>Learn, Resolve blockers and Build awesome things faster, the Andela way</h2>
                
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

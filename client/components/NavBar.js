import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import AuthenticationActions from '../actions/loginActions';
import { addFlashMessage } from '../actions/flashMessages';
import LoginForm from './presentation/LoginForm';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false,
      view: { showModal: false }
    };

  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  this.logout = this.logout.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value 
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.login(this.state)
      .then((response) => {
        if (response.confirmation === 'fail') {
          this.props.addFlashMessage({
            type: 'error',
            text: response.message
          });
        } else {
          this.props.addFlashMessage({
            type: 'success',
            text: 'Login successful. Welcome!'
          });
          browserHistory.push('/main');
        }
        
      });
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
    browserHistory.push('/');
  }

  render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-light my-nav">
        <img className="blocker-img" src="https://www.freelogoservices.com/api/main/images/1j+ojVVCOMkX9Wyrexe4hGe...0vSNuksWzBPO1T5vbjRI9At61X50x7c++Pw+KhkJ4FEDhRY=" />
        <a className="navbar-brand my-brand" href="#">Blocker</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
          </ul>
          { (this.props.authenticated) ? 
            (
              <div className="col-md-5">
                <ul className="nav navbar-nav navbar-right">
                  <li className="hidden-xs">
                    <a href="#" className="add-project" onClick={this.handleShowModal} data-toggle="modal" data-target="#add_project">
                      Ask a Question
                    </a>
                  </li> 
                    
                  <li className="dropdown">
                      <a href="#" data-toggle="dropdown" className="icon-info nav-link">
                          <i className="fa fa-bell" aria-hidden="true"></i> 
                          <span className="badge badge-pill badge-danger">3</span>
                      </a>  
                      <ul className="dropdown-menu">
                        <div className="navbar-content-notify">
                          <li><a href="#"><span className="label label-warning">4:00 AM</span>Favourites Snippet</a></li>
                          <li><a href="#"><span className="label label-warning">4:30 AM</span>Email marketing</a></li>
                          <li><a href="#"><span className="label label-warning">5:00 AM</span>Subscriber focused email
                              design</a></li>
                          <li className="divider"></li>
                          <li><a href="#" className="text-center">View All</a></li>
                        </div>
                      </ul>
                  </li>
                  <li className="dropdown">
                      <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown"><img src="http://jskrishna.com/work/merkury/images/user-pic.jpg" alt="Account" />
                          <b className="caret"></b></a>
                      <ul className="dropdown-menu">
                          <li>
                              <div className="navbar-content">
                                  <span>{this.props.currentUser.user.username}</span>
                                  <p className="text-muted small">
                                    {this.props.currentUser.user.email}
                                  </p>
                                  <div className="divider">
                                  </div>
                                  <a href="#" className="view btn-sm active">View Profile</a>
                              </div>
                          </li>
                      </ul>
                  </li>
                  <li><button onClick={this.logout} id="login-btn" className="btn btn-outline-success my-2 my-sm-2" type="submit">Logout</button></li>
              </ul>
              </div>
            ) : 
            (
              <LoginForm
                onSubmit={this.onSubmit}
                onChange={this.onChange}
                usernameValue={this.state.username}
                passwordValue={this.state.password}
              />
            )
          }
        </div>
      </nav>
      );
    }
}

const stateToProps = (state) => {
  return {
    authenticated: state.loginReducer.isAuthenticated,
    currentUser: state.loginReducer.user,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    addFlashMessage: (message) => {
      return dispatch(addFlashMessage(message));
    },
    login: (data) => {
      return dispatch(AuthenticationActions.login(data));
    },
    logout: () => {
      dispatch(AuthenticationActions.logout());
    }
  };
};
export default connect(stateToProps, dispatchToProps)(NavBar);

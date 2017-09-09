import React from 'react';
import { connect } from 'react-redux';
import LoginActions from '../actions/loginActions';

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
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value 
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.login(this.state);
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
                                  <span>JS Krishna</span>
                                  <p className="text-muted small">
                                      me@jskrishna.com
                                  </p>
                                  <div className="divider">
                                  </div>
                                  <a href="#" className="view btn-sm active">View Profile</a>
                              </div>
                          </li>
                      </ul>
                  </li>
              </ul>
              </div>
            ) : 
            (
              <form
                onSubmit={this.onSubmit}
                className="form-inline my-2 my-lg-0"
              >
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  name="username"
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Username"
                  aria-label="Username"
                  required
                />
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  name="password"
                  className="form-control mr-sm-2"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  required
                />
                <button id="login-btn" className="btn btn-outline-success my-2 my-sm-2" type="submit">Login</button>
              </form>
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
  };
};

const dispatchToProps = (dispatch) => {
  return {
    login: (data) => {
      return dispatch(LoginActions.login(data));
    }
  };
};
export default connect(stateToProps, dispatchToProps)(NavBar);

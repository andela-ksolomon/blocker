import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import AuthenticationActions from '../actions/loginActions';
import { postQuestion } from '../actions/questionsActions'
import { addFlashMessage } from '../actions/flashMessages';
import LoginForm from './presentation/LoginForm';
import { validate } from '../utils/helpers';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      tags: [],
      questions: {
        title: '',
        content: ''
      },
      errors: {},
      isLoading: false,
      isOpen: true
    };

  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  this.logout = this.logout.bind(this);
  this.onChange = this.onChange.bind(this);
  this.onEdit = this.onEdit.bind(this);
  this.postQuestion = this.postQuestion.bind(this);
  this.clearError = this.clearError.bind(this);
  this.removeTag = this.removeTag.bind(this);
  this.addTag = this.addTag.bind(this);
  }

  onChange(event) {
    const { questions } = this.state;
    questions[event.target.name] = event.target.value;
    this.setState({
      questions
    });
  }

  onEdit(event) {
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

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  postQuestion() {
    event.preventDefault();
    $('#myModal').hide('showw')
    this.setState({
      errors: {},
    });
    const { errors, isValid } = validate(this.state.questions);
    if (!isValid) {
      this.props.postQuestion(this.state.questions)
      .then((result) => {
          this.setState({
            questions: {
              title: '',
              content: '',
              access: ''
            },
            invalid: false
          });
        });
    } else {
      this.setState({
        errors,
        invalid: true
      });
    }
  }
  /**
   * clearError - clears error when onFocus
   * @param  {object} event the event handler
   * @return {void} no returns or void
   */
  clearError() {
    let errors = this.state.errors;
    if (errors) {
      errors = {};
      const invalid = false;
      this.setState({ errors, invalid });
    }
  }

  addTag(event) {
    event.preventDefault();
    const { tags } = this.state;
    const tag = event.target[0].value;
    tags.push(tag);
    this.setState({
      tags
    });
  }

  removeTag(tag) {
    const { tags } = this.state;
    const index = tags.indexOf(tag);
    tags.splice(index, 1);
    this.setState({
      tags
    });
  }

  render() {
    const { questions, errors, tags, isOpen } = this.state;
    return(
      <div>
      <nav className="navbar navbar-expand-lg navbar-light my-nav">
        <img className="blocker-img" src="https://www.freelogoservices.com/api/main/images/1j+ojVVCOMkX9Wyrexe4hGe...0vSNuksWzBPO1T5vbjRI9At61X50x7c++Pw+KhkJ4FEDhRY=" />
        <a className="navbar-brand my-brand" href="/main">Blocka</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="navbar-nav mr-auto">
          </ul>
          { (this.props.authenticated) ? 
            (
              <div className="col-md-5">
                <ul className="nav navbar-nav navbar-right">
                  <li className="hidden-xs">
                    <a href="#" className="add-project" data-toggle="modal" data-target="#myModal">
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
                onChange={this.onEdit}
                usernameValue={this.state.username}
                passwordValue={this.state.password}
              />
            )
          }
        </div>
      </nav>
      <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="title">Ask Question</h5>
            <button type="button" className="close" data-dismiss="modal"><span style={{ color: '#cc0000' }} aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
          </div>
          <div className="modal-body">
          <div className="panel panel-default">
              <div className="panel-body">
                  <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <input onChange={this.onChange} value={questions.title} name="title" type="text" placeholder="Title of Question" />
                          {errors.title && <span className="alert alert-danger">{errors.title}</span>}
                          </div>
                          <div className="form-group">
                              <textarea onChange={this.onChange} value={questions.content} name="content" placeholder="Keywords" required></textarea>
                              <br />
                              {errors.content && <span className="alert alert-danger">{errors.content}</span>}
                          </div>
                          <div className="">
                            <form onSubmit={this.addTag}>
                            <input type="text" placeholder="Add Tags" className="add-tag" />
                            </form>
                            <div className="display-tag" >
                              {tags && tags.map((tag) => <span className="badge">
                                  {tag} <a onClick={(tag) => this.removeTag(tag)}>x</a>
                                </span>)}
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" onClick={this.postQuestion} className="btn btn-primary">Save changes</button>
          </div>
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
    postQuestion: (data) => {
      return dispatch(postQuestion(data));
    },
    logout: () => {
      return dispatch(AuthenticationActions.logout())
    }
  };
};
export default connect(stateToProps, dispatchToProps)(NavBar);

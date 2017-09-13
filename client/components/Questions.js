import React from 'react';
import Modal from './Modal';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getFirstLetter, getDate } from '../utils/helpers';
import { fetchData } from '../actions/questionsActions';

class Questions extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = { isOpen: false };
      }
    componentWillMount() {
        this.props.fetchQuestions();
    }
      toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }    
  render() {
      const {
          questions
      } = this.props;
    return (
    <div className="tab-content">
      <div className="tab-pane active" id="inbox">
          
          <div className="">
              <div className="content-container clearfix">
                  <div className="col-md-12">
                      <input type="search" placeholder="Search Questions" className="form-control mail-search" />
                      
                      <ul className="mail-list">
                          {questions.questions && questions.questions.map((question) => <div className="media-body">
                          <div className="media">
                              <a id="profile-pix">{getFirstLetter(question.User.username)}</a>
                                  <div className="media-body">
                                    <Link to={"/threads/"+ question.id}><p className="title h5">{question.title}</p></Link>
                                        {question.body}
                                      <br />
                                      <div className="stats">
                                      <small className="text-muted">@{question.User.username} | {getDate(question.createdAt)}</small>
                                      <a href="#" className="btn btn-default stat-item pull-right">
                                        <i className="fa fa-comments icon"></i>  {question.Answers.length}
                                     </a>
                                    </div>
                                      <hr />
                                  </div>
                              </div>
                
                          </div> )}
                      </ul>
                  </div>
              </div>
          </div>
          
      </div>
      <Modal show={this.state.isOpen}
          onClose={this.toggleModal}>
          <h1>Here's some content for the modal</h1>
        </Modal>
    </div> 
    );
  }
}
const stateToProps = (state) => {
      return {
      questions: state.questions,
    };
  };
const dispatchToProps = (dispatch) => {
    return {
      fetchQuestions: (data) => {
        return dispatch(fetchData());
      }
    };
  };
export default connect(stateToProps, dispatchToProps)(Questions);

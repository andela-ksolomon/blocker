import React from 'react';
import Modal from './Modal';
import { connect } from 'react-redux';
import { getFirstLetter, getDate } from '../utils/helpers';

class Questions extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = { isOpen: false };
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
      console.log(questions);
    return (
    <div className="tab-content">
      <div className="tab-pane active" id="inbox">
          
          <div className="">
              <div className="content-container clearfix">
                  <div className="col-md-12">
                      <input type="search" placeholder="Search Questions" className="form-control mail-search" />
                      
                      <ul className="mail-list">
                          {questions.map((question) => <li>
                              <a href="">
                                <span className="mail-sender">{question.title}</span>
                                <span className="mail-subject">{getDate(question.createdAt)}</span>
                                <span className="mail-message-preview">{question.content}</span>
                            <hr/>
                                <span className="mail-subject">0 Answer | 10 upvotes | 12 downvotes</span>
                              </a>
                          </li>)}
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
      fetch: (data) => {
        return dispatch(fetchData());
      }
    };
  };
export default connect(stateToProps, dispatchToProps)(Questions);

import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestion } from '../actions/questionsActions';
import Comment from './Comment.js';
import { getFirstLetter, getDate } from '../utils/helpers';
import AnswerForm from './AnswerForm.js';
import RelatedQuestions from './RelatedQuestions';

class Threads extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.fetchQuestion(this.props.routeParams.id);
    }
    render() {
        const { questions } = this.props;
        console.log(questions);
        return (
            <div className="container nav-margin">
            <div className="row">  
              <div className="col-sm-8">
                <div className="panel panel-white post panel-shadow">
               {questions.singleQuestion && <div><div className="media">
                    <a id="profile-pix">{getFirstLetter(questions.singleQuestion.question.User.username)}</a>
                        <div className="media-body">
                        <a><p className="title h5">{questions.singleQuestion.question.title}</p></a>
                        <span className="text-muted time">{questions.singleQuestion.question.User.username} | {getDate(questions.singleQuestion.question.createdAt)}</span>
                        </div>
                    </div>
                  <div className="post-description">
                    <p>{questions.singleQuestion.question.body}</p>
                    <div className="stats">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"><span className="glyphicon glyphicon-th-list">
                    </span><button className="btn btn-primary post-btn">Post an Answer</button></a>  
                    </div>
                  </div>
                  </div>}
                  <AnswerForm/>
                  <hr />
                  <Comment />
                  </div> 
              </div>   
              <RelatedQuestions />   
              </div> 
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
      fetchQuestion: (id) => {
        return dispatch(fetchQuestion(id));
      }
    };
  };

export default connect(stateToProps, dispatchToProps)(Threads);

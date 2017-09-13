import React from 'react';

class Comment extends React.Component {
    render() {
        return (
            <div className="media-body">
            <div className="media">
                    <a id="profile-pix">M</a>
                    <div className="media-body">
                        Donec sit amet ligula enim. Duis vel condimentum massa.
                        Donec sit amet ligula enim. Duis vel condimentum massa.Donec sit amet ligula enim. 
                        Duis vel condimentum massa.
                        Donec sit amet ligula enim. Duis vel condimentum massa.
                        <br />
                        <small className="text-muted">Alex Deo | 23rd June at 5:00pm</small>
                        <div className="stats">
                        <a href="#" className="btn btn-default stat-item">
                          <i className="fa fa-thumbs-up icon"></i> 2
                       </a>
                      <a href="#" className="btn btn-default down-vote stat-item">
                          <i className="fa fa-thumbs-down icon"></i> 2
                      </a> 
                      <a id="answer-text">
                      <i className="fa fa-check icon"></i>  Mark as Answer</a>
                      <span id="answer-text">Answer</span>
                      </div>
                        <hr />
                    </div>
                </div>
  
            </div> 
        );
    }
}
export default Comment;

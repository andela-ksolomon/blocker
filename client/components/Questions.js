import React from 'react';

class Questions extends React.Component {

  render() {
    return (
    <div className="tab-content">
      <div className="tab-pane active" id="inbox">
          
          <div className="">
              <div className="content-container clearfix">
                  <div className="col-md-12">
                      <input type="search" placeholder="Search Questions" className="form-control mail-search" />
                      
                      <ul className="mail-list">
                          <li>
                              <a href="">
                                <span className="mail-sender">How to debug webpack</span>
                                <span className="mail-subject">@codejockie . 19 minutes ago</span>
                                <span className="mail-message-preview">You have ten more subscriptions click her...</span>
                            <hr/>
                                <span className="mail-subject">0 Answer | 10 upvotes | 12 downvotes</span>
                              </a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          
      </div>
      
    </div> 
    );
  }
}
export default Questions;

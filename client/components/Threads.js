import React from 'react';

function Threads() {
  return (
    <div className="container nav-margin">
    <div className="row">  
      <div className="col-sm-8">
        <div className="panel panel-white post panel-shadow">
          <div className="post-heading">
            <div className="pull-left image">
              <img
                src="http://bootdey.com/img/Content/user_1.jpg"
                className="img-circle avatar"
                alt="user profile image" />
            </div>
            <div className="pull-left meta">
              <div className="title h5">
                How to debug Webpack v3
            </div>
              <span className="text-muted time">@codejockie | 1 minute ago</span>
            </div>
          </div>
          <div className="post-description">
            <p>Bootdey is a gallery of free snippets resources templates and utilities for
            bootstrap css hmtl js framework. Codes for developers and web designers</p>
            <div className="stats">
            <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"><span className="glyphicon glyphicon-th-list">
            </span><button className="btn btn-primary post-btn">Post an Answer</button></a>  
            </div>
          </div>
          <div className="panel panel-default">
          <div id="collapseTwo" className="panel-collapse collapse">
              <div className="panel-body">
                  <div className="row">
                      <div className="col-md-12">
                          <div className="form-group">
                              <textarea className="form-control" placeholder="Keywords" required></textarea>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-12">
                          <div className="well well-sm well-primary">
                              <form className="form form-inline " role="form">
                              <div className="form-group">
                                  <a href="http://www.jquery2dotnet.com" className="btn btn-success post-btn"><span className="glyphicon glyphicon-floppy-disk">
                                  </span>Submit</a>
                              </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          </div> 
          <hr />
          <div className="media-body">
          <div className="media">
              <a className="pull-left" href="#">
                  <img className="media-object img-circle " src="https://app.teamsupport.com/dc/1078/UserAvatar/1839999/48/1470773165634" />
              </a>
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
          </div> 
      </div>   
      <div className="col-sm-3">
      <div className="popular_feed">    
            <div className="well">
            <h6 className="card-header text-center">Related Questions</h6>      
            <div className="media-body">
                <a href="" id="title-link">Donec sit amet ligula enim. Duis vel condimentum massa.</a>
                <br />
                  <p><small className="text-muted">Alex Deo | 23rd June at 5:00pm</small></p>
              </div>
            </div>
          </div>
        </div>    
      </div> 
    </div>
  );
}

export default Threads;

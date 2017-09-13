import React from 'react';

class RelatedQuestions extends React.Component {
    render() {
        return (
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
        );
    }
}
export default RelatedQuestions;

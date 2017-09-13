import React from 'react';

class AnswerForm extends React.Component {
    render() {
        return (
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
        );
    }
}

export default AnswerForm;

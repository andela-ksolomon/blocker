import React from 'react';

class AskQuestionModal extends React.Component {
  constructor() {
    super();
  }

  componentDidMount(){
    $(this.getDOMNode()).modal('show').bind(this);
    $(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal).bind(this);
  }
  
  render() {
    return (
      <div id="add_project" class="modal fade" role="dialog">
        <div class="modal-dialog">
  
          <div class="modal-content">
              <div class="modal-header login-header">
                  <button type="button" class="close" data-dismiss="modal">×</button>
                  <h4 class="modal-title">Add Project</h4>
              </div>
              <div class="modal-body">
                <input type="text" placeholder="Project Title" name="name" />
                <input type="text" placeholder="Post of Post" name="mail" />
                <input type="text" placeholder="Author" name="passsword" />
                <textarea placeholder="Desicrption"></textarea>
              </div>
              <div class="modal-footer">
                <button type="button" class="cancel" data-dismiss="modal">Close</button>
                <button type="button" class="add-project" data-dismiss="modal">Save</button>
              </div>
          </div>
                
        </div>
      </div>
    );
  }
}

AskQuestionModal.propTypes = {
  handleHideModal: React.PropTypes.func.isRequired
};

export default AskQuestionModal;

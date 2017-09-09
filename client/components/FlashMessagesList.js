import React from 'react';
import PropTypes from 'prop-types';
import FlashMessage from './FlashMessage';
import { connect } from 'react-redux';
import { deleteFlashMessage } from '../actions/flashMessages';

class FlashMessagesList extends React.Component {
  render() {
    const messages = this.props.messages.map(message =>
      <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage} />
    );
    return (
      <div>{messages}</div>
    );
  }
}

const stateToProps = (state) => {
  return {
    messages: state.flashMessages
  };
};

export default connect(stateToProps, { deleteFlashMessage })(FlashMessagesList);
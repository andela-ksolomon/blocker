import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { addFlashMessage } from '../actions/flashMessages';

/**
 * requireAuth function
 * @param {*} ComposedComponent
 * @return {*} void
 */
export default function (ComposedComponent) {
  /**
   * Authenticate
   */
  class Authenticate extends Component {
    /**
     * componentWillMount
     * @return {*} void
     */
    componentWillMount() {
      if (!this.props.authenticated) {
        browserHistory.push('/');
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page!'
        })
      }
    }
    /**
     * render
     * @return {*} void
     */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  /**
   * mapStateToProps(state)
   * @param {*} state
   * @return {*} void
   */
  const stateToProps = (state) => {
    return {
      authenticated: state.loginReducer.isAuthenticated,
    };
  };
  
  const dispatchToProps = (dispatch) => {
    return {
      addFlashMessage: (message) => {
        return dispatch(addFlashMessage(message));
      }
    };
  };

  return connect(stateToProps, dispatchToProps)(Authenticate);
}

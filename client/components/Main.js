import React, { Component } from 'react';

import NavBar from './NavBar';
import Feeds from './Feeds';
import Questions from './Questions';
import Popular from './Popular';

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      view: { showModal: false }
    };
  }

  render() {
    return (
      <div className="nav-margin">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Feeds />
            </div>
            <div className="col-md-6">
              <div className="questions">
                <Questions />
              </div>
            </div>  
            <div className="col-md-3">
              <Popular />
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

import React, { Component } from 'react';

import NavBar from './NavBar';
import Feeds from './Feeds';
import Questions from './Questions';
import Popular from './Popular';
import FlashMessagesList from './FlashMessagesList';

export default class Main extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="nav-margin">
        <div className="col-sm-5 justify-content-center">
          <FlashMessagesList />
        </div>
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

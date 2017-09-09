import React from 'react';

import NavBar from './NavBar';

class Home extends React.Component {
  render() {
    return (
      <div id="home">
      <div className="background-img">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
                <h1 className="text-white vertical-align">Welcome</h1>
            </div>
            <div className="col-sm-4 ">
              <div className="card my-signup">
                <h4 className="card-header text-center">Create An Account</h4>
                <div className="card-body">
                  <form className="form-inline my-2 my-lg-2 justify-content-center align-items-center">
                    <input className="form-control col-sm-10 signup-input" type="text" placeholder="First Name" aria-label="First Name" />
                    <input className="form-control col-sm-10 signup-input" type="text" placeholder="Last Name" aria-label="Last Name" />
                    <input className="form-control col-sm-10 signup-input" type="text" placeholder="Username" aria-label="Username" />
                    <input className="form-control col-sm-10 signup-input" type="text" placeholder="Email" aria-label="Email" />
                    <input className="form-control col-sm-10 signup-input" type="password" placeholder="Password" aria-label="Password" />
                    <button className="btn btn-primary col-sm-10" id="signup-btn" type="submit">Signup</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>  
    );
  }
}

export default Home;

// src/Home.jsx

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.authState.isPending) { 
      return <div>Loading...</div>;
    }

    const button = this.props.authState.isAuthenticated ?
      <button onClick={() => {this.props.authService.logout()}}>Logout</button> :
      <button onClick={() => {this.props.authService.login()}}>Login</button>;

    return (
      <div>
        <div>
          <Link to='/'>Home</Link><br/>
          <Link to='/protected'>Protected</Link><br/>
          {button}
        </div>
        <div>
          <iframe src="https://bandwidth-dev.sisense.com/app/main?host=http%3A%2F%2Flocalhost%3A8887#/dashboards/5e8fbc8035da9e002ebaebd6?h=false" id="sisense-iframe" name="sisense-iframe"></iframe>
        </div>
      </div>
    );
  }
});
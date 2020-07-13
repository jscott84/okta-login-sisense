import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';

export default withRouter(class AppWithRouterAccess extends Component {
  constructor(props) { 
    super(props);
    this.onAuthRequired = this.onAuthRequired.bind(this);
  }
  
  onAuthRequired() { 
    this.props.history.push('/login');
  }

  render() {
    return (
      <Security issuer='https://stage.login.bandwidth.com/oauth2/ausqxr6vbsMh6tmN30h7'
                clientId='0oarxepkkbAGuZysv0h7'
                redirectUri={window.location.origin + '/okta/callback'}
                onAuthRequired={this.onAuthRequired}
                pkce={true} >
        <Route path='/' exact={true} component={Home} />
        <SecureRoute path='/protected' component={Protected} />
        <Route path='/login' render={() => <Login issuer='https://stage.login.bandwidth.com/oauth2/ausqxr6vbsMh6tmN30h7' />} />
        <Route path='/okta/callback' component={LoginCallback} />
      </Security>
    );
  }
});
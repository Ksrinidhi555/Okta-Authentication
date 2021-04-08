// import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
// import Home from './Components/Home';
// import Dashboard from './Components/Dashboard';
// import Navbar from './Components/Navbar';
// import Login from './Components/Login';
// import StaffPortal from './Components/StaffPortal';
// import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
// import { useHistory } from 'react-router-dom';


// function onAuthRequired({ history }) {
//   history.push('/login');
// }

// const App = () => {
//   const history = useHistory();
//   const restoreOriginalUri = async (_oktaAuth, originalUri) => {
//     history.replace(toRelativeUrl(originalUri, window.location.origin));
// };

// return (

//     <Security
//       issuer='https://dev-30061468.okta.com/oauth2/default'
//       client_id='0oacga1lc2MHtgFJ75d6'
//       redirect_uri='http://localhost:3000/login/callback'
//       onAuthRequired={onAuthRequired}
//       restoreOriginalUri={restoreOriginalUri } >
//       <Navbar />
//       <Route path="/" exact={true} component={Home} />
//       <SecureRoute path="/dashboard" exact={true} component={Dashboard} />
//       <Route path="/staffportal" exact={true} component={StaffPortal} />
//       <Route path="/login" render={() => (<Login baseUrl='https://dev-30061468.okta.com' />)} />
//       <Route path="/login/callback" component={LoginCallback} />

//     </Security>
  

// );
// }
// export default App



import React from 'react';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Private from './Components/Private';
import {  Route } from 'react-router-dom';

import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { useHistory } from 'react-router-dom';
import Login from './Components/Login';


const oktaAuth = new OktaAuth({
  issuer: 'https://dev-30061468.okta.com/oauth2/default',
  clientId: '0oacga1lc2MHtgFJ75d6',
  redirectUri: window.location.origin + '/login/callback',  
});

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  const onAuthRequired = function() {
  history.push('/login')
}

  return (
    <div className="App">
      <div className="page">
        <div className="content">
            <Security oktaAuth={oktaAuth} 
                      restoreOriginalUri={restoreOriginalUri}
                      onAuthRequired = {onAuthRequired} 
                      >
            <Header/>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/login' exact={true} component={Login}/>
            <SecureRoute path='/private' exact={true} component={Private}/>
            <Route path='/login/callback' component={LoginCallback}/>
            </Security>
        </div>
      </div>
    </div>
  );
}

export default App;

// import withAuth from '@okta/okta-react/dist/withAuth';
// import React from 'react';
// import { Redirect } from 'react-router-dom';
// import SignInWidget from './OktaSignInWidget';

// export default withAuth(
//   class Login extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         authenticated: null
//       };
//       this.checkAuthentication();
//     }

//     async checkAuthentication() {
//       const authenticated = await this.props.auth.isAuthenticated();
//       if (authenticated !== this.state.authenticated) {
//         this.setState({ authenticated });
//       }
//     }

//     componentDidUpdate() {
//       this.checkAuthentication();
//     }

//     onSuccess = res => {
//       return this.props.auth.redirect({
//         sessionToken: res.session.token
//       });
//     };

//     onError = err => {
//       console.log('error logging in', err);
//     };

//     render() {
//       if (this.state.authenticated === null) return null;
//       return this.state.authenticated ? (
//         <Redirect to={{ pathname: '/ dashboard' }} />
//       ) : (
//         <SignInWidget
//           baseUrl={this.props.baseUrl}
//           onSuccess={this.onSuccess}
//           onError={this.onError}
//         />
//       );
//     }
//   }
// );

import React from 'react';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignInWidget from './OktaSignInWidget';

function Login() {
  const { oktaAuth, authState } = useOktaAuth();

  const onSuccess = function(res) {
    if (res.status === 'SUCCESS') {
      return oktaAuth.signInWithRedirect({
        sessionToken: res.session.token
      });
    }
  }

  const onError = function(err) {
    console.log('error logging in', err);
  }

  return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/' }}/> :
    <OktaSignInWidget
      baseUrl='https://dev-30061468.okta.com/'
      onSuccess={onSuccess}
      onError={onError}/>;
}

export default Login;
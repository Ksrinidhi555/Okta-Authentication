// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import OktaSignIn from '@okta/okta-signin-widget';
// import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

// class SignInWidget extends Component {
//   componentDidMount() {
//     const el = ReactDOM.findDOMNode(this);
//     this.widget = new OktaSignIn({
//       baseUrl: this.props.baseUrl,
//       // logo: 'okta-vector-logo.png'
//     });
//     this.widget.renderEl({ el }, this.props.onSuccess, this.props.onError);
//   }

//   componentWillUnmount  () {
//     this.widget.remove();
//   }

//   render() {
//     return <div />;
//   }
// }

// export default SignInWidget;


import React, { Component } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

export default class OktaSignInWidget extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }
  componentDidMount() {
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl
    });
    this.widget.renderEl({el: this.wrapper.current}, this.props.onSuccess, this.props.onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return <div ref={this.wrapper} />;
  }
};
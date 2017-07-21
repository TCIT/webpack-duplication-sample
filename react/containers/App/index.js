import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import 'better-dom/dist/better-dom.js';
import 'better-i18n-plugin/dist/better-i18n-plugin.js';
import 'better-time-element/dist/better-time-element.js';
import 'better-time-element/i18n/better-time-element.es.js';
import 'better-emmet-plugin/dist/better-emmet-plugin.js';
import 'better-dateinput-polyfill/dist/better-dateinput-polyfill.js';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';

import AuthGlobals from 'redux-auth/src/views/material-ui/AuthGlobals';

import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

import { SignOutButton } from 'redux-auth/material-ui-theme';
import EmailSignInForm from 'redux-auth/src/views/material-ui/EmailSignInForm.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import * as appActions from '../../redux/modules/app';
import { push } from 'react-router-redux';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class App extends React.Component {
  render() {
    return <div>
      <div>Hola</div>
      <div>{this.props.children}</div>
    </div>;
  }
}

App.propTypes = {
  children: React.PropTypes.node
};

// Wrap the component to inject dispatch and state into it
function select(state) {
  return Object.assign({}, {});
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, {}), dispatch),
    changeRoute: (url) => dispatch(push(url))
  };
}
export default connect(select, mapDispatchToProps)(App);

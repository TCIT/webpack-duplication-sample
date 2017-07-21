import connect from 'react-redux/lib/components/connect';
import React from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';

class CauseManager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <span>Hola!</span>;
  }
}

function select(state, routerProps) {
  return Object.assign({},
    { }
  );
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, {}), dispatch),
    changeRoute: (url) => dispatch(push(url))
  };
}

export default connect(select, mapDispatchToProps)(CauseManager);

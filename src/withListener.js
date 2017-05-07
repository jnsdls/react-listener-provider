// @flow

import React from 'react';
import PropTypes from 'prop-types';

const withListener = component => {
  return class extends React.Component {
    static displayName: string = `withListener(${component.displayName || component.name})`;

    static contextTypes = {
      listener: PropTypes.shape({
        add: PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired
      }).isRequired
    };

    render() {
      return React.createElement(component, {
        ...this.props,
        listener: this.context.listener
      });
    }
  };
};

export default withListener;

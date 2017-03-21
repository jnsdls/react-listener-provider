// @flow
import React, { Component, PropTypes } from 'react';
import invariant from 'invariant';

type subscription = () => void;
type subscriptionObj = {};

export default class ReactListenerProvider extends Component {
  subs: subscriptionObj = {};

  static propTypes = {
    children: PropTypes.node
  };

  static childContextTypes = {
    listener: PropTypes.shape({
      add: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired
    }).isRequired
  };

  getChildContext() {
    const { addListener: add, removeListener: remove } = this;
    return {
      listener: {
        add,
        remove
      }
    };
  }

  componentWillMount() {
    const { children } = this.props;
    invariant(children === null || React.Children.count(children) === 1, 'A <ReactListenerProvider> may have only one child element');
  }

  componentWillUnmount() {
    Object.keys(this.subs).forEach((key: string) => this.unRegisterListener(key));
  }

  addListener = (type: string, callback: subscription) => {
    if (!this.subs[type]) {
      this.subs[type] = [callback];
      this.registerListener(type);
    } else {
      this.subs[type] = this.subs[type].concat([callback]);
    }
  };

  removeListener = (type: string, callback: subscription) => {
    this.subs[type] = this.subs[type].filter(fn => fn !== callback);
    if (!this.subs[type].length) {
      this.unRegisterListener(type);
    }
  };

  registerListener = (type: string) => {
    const { handleEvent } = this;
    window.addEventListener(type, (e: Event) => handleEvent(e, type));
  };

  unRegisterListener = (type: string) => {
    const { handleEvent } = this;
    window.removeEventListener(type, (e: Event) => handleEvent(e, type));
  };

  handleEvent = (e: Event, type: string) => {
    if (this.subs && this.subs[type]) {
      this.subs[type].forEach(callback => callback(e));
    }
  };

  render() {
    const { children } = this.props;
    return children ? React.Children.only(children) : null;
  }
}

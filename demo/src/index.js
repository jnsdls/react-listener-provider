import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactListenerProvider, { withListener } from '../../src';

class MouseMove extends Component {
  state = { x: 0, y: 0 };

  componentDidMount() {
    const { add } = this.props.listener;
    add('mousemove', ({ clientX: x, clientY: y }) => this.setState({ x, y }));
  }

  componentWillUnmount() {
    const { remove } = this.props.listener;
    remove('mousemove', ({ clientX: x, clientY: y }) => this.setState({ x, y }));
  }

  render() {
    const { x, y } = this.state;
    return (
      <div>
        <span>x: {x}</span>
        <span> - </span>
        <span>y: {y}</span>
      </div>
    );
  }
}

class Resize extends Component {
  state = { w: 0, h: 0 };

  componentDidMount() {
    this.setState({ w: window.innerWidth, h: window.innerHeight });
    const { add } = this.props.listener;
    add('resize', ({ target }) => {
      const { innerWidth: w, innerHeight: h } = target;
      this.setState({ w, h });
    });
  }

  componentWillUnmount() {
    const { remove } = this.props.listener;
    remove('resize', ({ target }) => this.setState({ w, h }));
  }

  render() {
    const { w, h } = this.state;
    return (
      <div>
        <span>w: {w}</span>
        <span> - </span>
        <span>h: {h}</span>
      </div>
    );
  }
}

const WrappedComponentMouseMove = withListener(MouseMove);
const WrappedComponentResize = withListener(Resize);

class Wrapper extends Component {
  render() {
    return (
      <div>
        <h1>React Listener Provider</h1>
        <h4>3 "mousemove" components</h4>
        <WrappedComponentMouseMove />
        <WrappedComponentMouseMove />
        <WrappedComponentMouseMove />
        <h4>3 "resize" components</h4>
        <WrappedComponentResize />
        <WrappedComponentResize />
        <WrappedComponentResize />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <ReactListenerProvider>
        <Wrapper />
      </ReactListenerProvider>
    );
  }
}

render(<App />, document.getElementById('app'));

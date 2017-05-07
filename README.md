# react-listener-provider

Create a provider and use HOC (Higher Order Components) to listen for [Events](https://developer.mozilla.org/en-US/docs/Web/Events) in one place.


## Usage Example

`react-listener-provider` exports a `ReactListenerProvider` component as well as a `withListener()` wrapper function.

Components wrapped with `withListener()` will have an added prop `listener` which exposes `add()` and `remove()` methods.

`add()` and `remove()` work just like `window.addEventListener()` and `window.removeEventListener()`, they take a `type <string>` argument and a `callback <function>` argument.

```jsx
import React, { Component } from 'react';
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


const WrappedComponent = withListener(MouseMove);


class App extends Component {
  render() {
    return (
      <ReactListenerProvider>
        <WrappedComponent />
      </ReactListenerProvider>
    );
  }
}
```


## Installation

```
yarn add react-listener-provider
```
Since version 0.2.0 you'll also need "prop-types" as a peer dependency.
```
yarn add prop-types
```


## API

### Props

#### ReactListenerProvider

`none`

#### Component wrapped with `withListener()`
```jsx
listener: React.PropTypes.shape({
      add: React.PropTypes.func.isRequired,
      remove: React.PropTypes.func.isRequired
    }).isRequired
```


## Development

1) clone this repo
2) `yarn`
3) `cd demo`
4) `yarn && yarn start`


## Attribution

The repo structure as well as the inspiration to create this project come from [react-perimiter](https://github.com/aweary/react-perimeter).

Thanks to [@aweary](https://github.com/aweary) for the encouragement.

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// const Hello = (props) => {
//   return <h1>Hello, {props.name}</h1>;
// }
class Hello extends Component { // A stateful component needs to
  constructor(props) {
    // be promoted into a class
    super(props);
    this.state = { clicked: false }; // defines initial state
  }

  handleClick = () => {
    this.setState({ clicked: this.state.clicked === true ? false : true });
  }

  render() {
    return (
      <h1 className={this.state.clicked ? "clicked" : ""} onClick={this.handleClick}>
        Hello, {this.props.name}
      </h1>
    );
  }
}
const container = document.getElementById('root');
ReactDOM.render(<Hello name="Boris" />, container);

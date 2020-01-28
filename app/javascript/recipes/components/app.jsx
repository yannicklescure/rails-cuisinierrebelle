import React, { Component } from 'react';

import Navbar from './navbar';
import CardList from '../containers/card_list';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    };
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <CardList cards={this.state.cards} />
      </React.Fragment>
    );
  }
}

export default App;

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCards } from '../actions';

import Card from '../components/card';

class CardList extends Component {

  componentDidMount() {
    this.props.fetchCards();
  }

  render() {
    return (
      <div id="recipes-cards" className="row py-3">
        {this.props.cards.map(card => <Card card={card} key={card.id} />)}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchCards: fetchCards },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    cards: state.cards
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);


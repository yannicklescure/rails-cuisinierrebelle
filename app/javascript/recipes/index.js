import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createHistory as history } from 'history';
import { reducer as formReducer } from 'redux-form';

import App from './components/app';
// import CardsIndex from './containers/card_list';
// import CardsShow from './containers/cards_show';
// import CardsNew from './containers/cards_new';

// import '../assets/stylesheets/application.scss';
import cardsReducer from './reducers/cards_reducer';


const reducers = combineReducers({
  cards: cardsReducer
});

const middlewares = applyMiddleware(reduxPromise, logger);

const initialState = { cards: JSON.parse(root.dataset.recipes) };
const store = createStore(reducers, initialState, middlewares);

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

import { card } from "./card";
import { grid } from "./grid";
import { setCardsParams } from "../util";
import { cardHeart } from "./card-heart";

export const cards = (params, callback = () => {}) => {

  console.log(params)

  if(params.array) {
    if (params.type === 'card') {
      setCards(params);
    }
    if (params.type === 'grid') grid(params);
  }
  callback();
  return true;
}

const setCards = (params, callback = () => {}) => {

  const cardsParams = setCardsParams();

  params.count = cardsParams.count;
  params.width = cardsParams.width;
  console.log(params.array.length);
  console.log(params.array)

  const cards = params.array.map(item => card(params, item));
  console.log(cards);
  const root = document.querySelector('#root');
  root.insertAdjacentHTML('beforeEnd', cards.join(''));

  if(params.init.userSignedIn) cardHeart();
  callback();
}

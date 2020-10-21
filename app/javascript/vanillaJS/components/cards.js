import { card } from "./card";
import { grid } from "./grid";
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

const setCards = async (params, callback = () => {}) => {

  const { setCardsParams } = await import("../util");
  const cardsParams = await setCardsParams();

  params.count = cardsParams.count;
  params.width = cardsParams.width;
  console.log(params.array.length);
  console.log(params.array)

  const cards = params.array.map(item => card(params, item));
  console.log(cards);
  const data = JSON.parse(localStorage.getItem('cuisinier_rebelle'));
  let array = cards;
  console.log(data)
  console.log(data.getters)
  console.log(data.getters.cards)
  if (data.getters.cards) {
    array = data.getters.cards;
    let tmp = null;
    cards.forEach(card => {
      tmp = array.filter(el => el === card);
      if (tmp.length === 0) {
        array.push(card);
      };
    });
  }
  data.getters.cards = array;
  localStorage.setItem('cuisinier_rebelle', JSON.stringify(data));
  const root = document.querySelector('#root');
  root.insertAdjacentHTML('beforeEnd', cards.join(''));

  if(params.init.userSignedIn) cardHeart();
  callback();
}

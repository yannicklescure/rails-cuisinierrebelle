import { card } from "./card";
import { grid } from "./grid";

export const cards = (params, callback = () => {}) => {

  console.log(params)

  if(params.array) {
    if (params.type === 'card') {
      card(params);
    }
    if (params.type === 'grid') grid(params);
  }
  callback();
  return true;
}

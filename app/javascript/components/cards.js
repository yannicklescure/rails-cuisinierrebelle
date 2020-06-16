import { card } from "./card";
import { grid } from "./grid";

export const cards = (params, callback = () => {}) => {

  if(params.array) {
    if (params.type === 'card') card(params);
    if (params.type === 'grid') grid(params);
  }
  callback();
  return true;
}

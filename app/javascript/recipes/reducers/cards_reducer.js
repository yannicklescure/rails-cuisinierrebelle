export const FETCH_CARDS = 'FETCH_CARDS';

const cardsReducer = (state, action) => {
  if (state === undefined) {
    // Reducer initialisation
    return [];
  }

  switch (action.type) {
    case FETCH_CARDS:
      return action.payload;
    default:
      return state;
  }
};

export default cardsReducer;

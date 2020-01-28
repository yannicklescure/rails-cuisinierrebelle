export const FETCH_CARDS = 'FETCH_CARDS';

const ROOT_URL = '/api/v1/recipes';

export function fetchCards() {
  const promise = fetch(ROOT_URL)
  .then(response => response.json());
  return {
    type: FETCH_CARDS,
    payload: promise
  };
}

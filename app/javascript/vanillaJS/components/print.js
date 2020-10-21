import { googleAdsNoPrint } from "../components/google-ads";

export const print = () => {
  if(document.querySelector('#print')) {
    document.querySelector('#print').addEventListener('click', (event) => {
      event.preventDefault();
      googleAdsNoPrint();
      window.print();
    });
  }
}

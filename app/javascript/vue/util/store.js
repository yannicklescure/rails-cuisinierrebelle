// import * as api from '../api'
import VuexPersistence from 'vuex-persist';
import Crypto from 'crypto-js';
import Cookie from 'js-cookie';
// import uuid from 'uuid';
import { v4 as uuidv4 } from 'uuid';

const oldStore = [
  'cuisinier_rebelle',
  'vueStore',
  'storageKey',
  'cr_sk_20210216',
]
let oldStoreFlag = false
oldStore.forEach(store => {
  if (localStorage.getItem(store) != null) {
    localStorage.removeItem(store)
    oldStoreFlag = true
  }
})

if (oldStoreFlag) {
  location.reload()
}

const cookieName = 'cr_cn';

const storageKey = 'cr_sk_20210217';

// Get the encryption token from cookie or generate a new one.
const encryptionToken = Cookie.get(cookieName) || uuidv4();

// Store the encryption token in a secure cookie.
if ((/localhost|127\.0\.0\.1/).test(document.domain)) Cookie.set(cookieName, encryptionToken);
else Cookie.set(cookieName, encryptionToken, { secure: true, expires: 180 });

export const vuexLocal = new VuexPersistence({
  reducer: (state) => ({data: state.data}),
  storage: {
    getItem: () => {
      // Get the store from local storage.
      const store = window.localStorage.getItem(storageKey);

      if (store) {
        try {
          // Decrypt the store retrieved from local storage
          // using our encryption token stored in cookies.
          const bytes = Crypto.AES.decrypt(store, encryptionToken);

          return JSON.parse(bytes.toString(Crypto.enc.Utf8));
        } catch (e) {
          // The store will be reset if decryption fails.
          window.localStorage.removeItem(storageKey);
        }
      }

      return null;
    },
    setItem: (key, value) => {
      // Encrypt the store using our encryption token stored in cookies.
      const store = Crypto.AES.encrypt(value, encryptionToken).toString();

      // Save the encrypted store in local storage.
      return window.localStorage.setItem(storageKey, store);
    },
    removeItem: () => window.localStorage.removeItem(storageKey),
  },
});

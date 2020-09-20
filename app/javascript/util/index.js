import { cookiesToObject } from "../components/cookies";

export const smoothScrollToTop = (button) => {
  button.addEventListener('click', (event) => {
    if (window.scrollY > 0) {
      event.preventDefault();
      const scrollOptions = {
        top: 0,
        left: 0,
        behavior: 'smooth'
      };
      window.scrollTo(scrollOptions);
    }
  });
}

export const setInit = (location) => {

  const max = x => {
    if (x === 5) return 25
    else return 24
  }
  const body = document.querySelector('body');
  const userSignedIn = body.dataset.user === 'true';
  const cookies = cookiesToObject(document.cookie);
  const device = body.dataset.device;
  const cardsMaxCount = max(setCardsParams().count);
  // const cardsMax = square(setCardsCount(window.innerWidth))

  let options;
  if(userSignedIn) {
    options = {
      headers: {
        'X-User-Email': atob(decodeURIComponent(cookies.user_email)),
        'X-User-Token': atob(decodeURIComponent(cookies.user_token))
      }
    };
  } else {
    options = {};
  }

  const init = {
    // url: `/api/v1/recipes?cards=${document.querySelector('#root').dataset.recipes}`,
    url: `/api/v1/recipes?cards=${cardsMaxCount}`,
    userSignedIn: userSignedIn,
    currentController: location.currentController,
    currentPage: location.currentPage,
    user_email: cookies.user_email,
    user_token: cookies.user_token,
    locale: location.currentLang,
    device: device,
    cards: cardsMaxCount,
    options: options,
    query: false,
  };

  console.log(location.query);
  if (location.query) {
    init.url = `/api/v1/recipes?query=${location.query}`;
    init.query = true;
  }
  return init
}

export const localRecipes = (init) => {
  const dataStr = localStorage.getItem('cuisinier_rebelle')
  if (dataStr) {
    const data = JSON.parse(dataStr);
    if (!init.userSignedIn) {
      data.user = null;
      localStorage.setItem('cuisinier_rebelle', JSON.stringify(data));
    }
    return data
  }
  else return null
}

const setStoreState = (data) => {
  return {
    recipes: data.recipes,
  }
}

const setStoreGetters = (data) => {
  const arr = [];
  data.users.forEach(user => {
    user.recipes = user.recipes.sort((a, b) => (a.recipe.id > b.recipe.id) ? 1 : -1).reverse();
    arr.push(user);
  });
  data.users = arr;
  return {
    users: data.users,
  }
}

export const setStore = (data) => {
  console.log(data);
  // data.timestamp = (new Date).getTime()
  data.recipes = data.recipes.sort((a, b) => (a.recipe.id > b.recipe.id) ? 1 : -1).reverse()
  data.state = setStoreState(data);
  data.getters = setStoreGetters(data);
  localStorage.setItem('cuisinier_rebelle', JSON.stringify(data));
}

export const fetchRecipes = (init) => {
  return fetch(init.url, init.options)
    .then(response => response.json())
    .then(result => {
      const newData = result.data;
      console.log(newData);
      const data = localRecipes(init);
      if (data) {
        const recipes = data.recipes;
        console.log(recipes)
        // recipes.timestamp = new Date().getTime();
        const newRecipes = newData.recipes;
        console.log(newRecipes);
        newRecipes.forEach(newRecipe => {
          // const el = recipes.filter(recipe => recipe === newRecipe);
          // console.log(newRecipe)
          const el = recipes.filter(recipe => recipe.recipe.id === newRecipe.recipe.id)
          // console.log(el.length);
          // if (!recipes.includes(newRecipe)) {
          if (el.length === 0) {
            data.recipes.push(newRecipe)
          }
          else {
            console.log(newRecipe)
          }
        })
        data.search = newData.search;
        setStore(data)
      }
      else {
        setStore(newData)
      }
      return data ? data : newData;
    })
    .catch(ex => {
      console.log('parsing failed', ex);
    });
}

export const setCardsParams = () => {
  const width = window.innerWidth;
  console.log(width);
  if (width >= 1600) return {
    count: 6,
    width: "15%"
  };
  else if (width >= 1400) return {
    count: 5,
    width: "18%"
  };
  // Extra large screen / wide desktop
  // xl: 1200px
  else if (width >= 1200) return {
    count: 4,
    width: "23%"
  };
  // Large screen / desktop
  // lg: 992px,
  else if (width >= 992) return {
    count: 4,
    width: "23%"
  };
  // Medium screen / tablet
  // md: 768px,
  else if (width >= 768) return {
    count: 3,
    width: "31%"
  };
  // Small screen / phone
  // sm: 576px,
  else if (width >= 576) return {
    count: 2,
    width: "50%"
  };
  // Extra small screen / phone
  // xs: 0,
  else return {
    count: 1,
    width: "100%"
  };
}

export const capitalize_Words = (str) => {
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export const userParams = (checked, locale) => {
  let result = {
    verified: '',
    checked: ''
  };
  if (checked) {
    switch(locale) {
      case 'fr':
        result.verified = `Vérifié`;
        break;
      case 'es':
        result.verified = `Auditado`;
        break;
      default:
        result.verified = `Verified`;
    }
    result.checked = `<span data-toggle="tooltip" data-placement="top" title="${result.verified}" class="ml-1">
      <i class="material-icons md-16 d-flex" style="font-size: 90%">check_circle</i>
    </span>`;
  }
  return result
}

export const formattedTime = (unix_timestamp) => {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  console.log(formattedTime);
}

export const setPictureSize = (picture) => {
  const device = document.querySelector('body').dataset.device;
  if (picture) {
    let pictureWidth = '';
    if (device === 'desktop' || device === 'tablet') {
      pictureWidth = picture.offsetWidth || 260
    } else {
      pictureWidth = window.innerWidth - 30;
    }
    let pictureHeight = `${parseInt(pictureWidth * 9 / 16)}`;
    if ((/url.*/).test(picture.style.backgroundImage)) {
      picture.style.width = `${pictureWidth}px`;
      picture.style.height = `${pictureHeight}px`;
    } else {
      picture.width = pictureWidth;
      picture.height = pictureHeight;
    }
    // console.log(picture);
    // console.log(device);
    // console.log(pictureWidth);
    // console.log(pictureHeight);
    // console.log((/url.*/).test(picture.style.backgroundImage));
  }
}

export const mainbarFixedTop = (init) => {
  const title = document.querySelector(init.title);
  const mainbar = document.querySelector(init.mainbar);
  const content = document.querySelector(init.content);
  let lastScrollTop = 0;
  document.addEventListener('scroll', (event) => {
    const navbarHeight = parseInt(document.querySelector('#navbar-main').offsetHeight);
    // console.log(navbarHeight);
    // console.log(window.scrollY);
    let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop) {
      // downscroll code
      if (window.scrollY > mainbar.offsetTop - navbarHeight) {
        mainbar.classList.add('fixed-top');
        mainbar.style.top = `${navbarHeight}px`;
        title.style.paddingBottom = `${mainbar.clientHeight}px`;
      }
    } else {
      // upscroll code
      if ( window.scrollY < content.offsetTop - mainbar.clientHeight - navbarHeight) {
        title.style.paddingBottom = null;
        mainbar.style.top = null;
        mainbar.classList.remove('fixed-top');
      }
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }, false);
}

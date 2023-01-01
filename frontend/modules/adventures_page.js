import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
   console.log(search);
  const indexOfEq = search.indexOf("=");
  const res = search.slice(indexOfEq + 1);
  return res;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
   
  try {
    const url = `${config.backendEndpoint}/adventures?city=${city}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log(adventures);
  const dataDiv = document.querySelector("#data");

  adventures.forEach((item) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-sm-6");
    colDiv.classList.add("col-lg-3");
    colDiv.classList.add("card-container");
    colDiv.classList.add("mb-2");
    // <div class="category-banner">${item.category}</div>
    colDiv.innerHTML = `
    <a id=${item.id} href="detail/?adventure=${item.id}">
    <div class="category-banner">${item.category}</div>
  <div class="card activity-card">
  
    <img
      src=${item.image}
      class="card-img-top"
      alt="..."
    />
    <div class="card-body" style="width: 100%">
      <div class="d-flex mb-2 justify-content-between flex-wrap">
        <h5 class="">${item.name}</h5>
        <h5 class="">₹${item.costPerHead}</h5>
      </div>
      <div class="d-flex justify-content-between flex-wrap">
        <h5 class="">Duration</h5>
        <h5 class="">${item.duration} hours</h5>
      </div>
    </div>
  </div>
  </a>
  `;

    dataDiv.append(colDiv);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  console.log(low);
  console.log(high);
  let newList = [];
  newList = list.filter((ele) => {
       return ele.duration >=low && ele.duration <= high;
  });
  console.log(newList);

  return newList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let newList = [];
  console.log(categoryList);

  categoryList.forEach((item) => {
    let arr = [];
    arr = list.filter((ele) => {
      return ele.category === item;
    });

    arr.forEach((it) => {
      newList.push(it);
    });
  });
  return newList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  const duration = filters.duration;
  const durArr = duration.split('-');
  let low = durArr[0];
  let high = durArr[1];
  let newList = [];
  console.log(filters);


  if(filters.duration && filters.category.length){
    let firstList = filterByCategory(list, filters.category);
    let secondList = filterByDuration(list, low, high);
    console.log(firstList);
    console.log(secondList);
    newList = firstList.filter(value => secondList.includes(value));
    return newList;
  }
  else if (filters.category.length !== 0) {
    newList = filterByCategory(list, filters.category);
    return newList;
  }
  else if(filters.duration !== ''){
    newList = filterByDuration(list, low, high);
    return newList;
  }
  
  else{
   return list;
    }

  // Place holder for functionality to work in the Stubs
  // return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  let stringData = JSON.stringify(filters);
  localStorage.setItem('filters', stringData);

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let data = JSON.parse(localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  return data;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  const category = filters.category;

  const categoryList = document.querySelector("#category-list");

  category.forEach((item) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("category-filter");
    newDiv.setAttribute('id', `${item}`);
    newDiv.innerHTML = `
        <div>${item}</div>
        <div id="btn-${item}" class= "close-btn" onclick="closePill(event)" style="cursor:pointer">x</div>
    `;

    categoryList.append(newDiv);
  });
}



export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};

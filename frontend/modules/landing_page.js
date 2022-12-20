import config from "../conf/index.js";

async function init() {
  console.log("From init()");
  console.log(`${config.backendEndpoint}/cities`);
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

  try {
    const response = await fetch(`${config.backendEndpoint}/cities`);
    const jsonRes = await response.json();
    return jsonRes;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  const colDiv = document.createElement("div");
  colDiv.classList.add("col-sm-6");
  colDiv.classList.add("col-lg-3");
  colDiv.classList.add("mb-4");

  colDiv.innerHTML = `
       <a id=${id} href="pages/adventures/?city=${id}">
           <div class="tile text-white">
                <img class=img-fluid" src=${image} />
                <div class="tile-text text-center">
                   <h5>${city}</h5>
                    <div>${description}</div>
                </div>
           </div>
       </a>
  `;

  const cityData = document.querySelector('#data');
  cityData.append(colDiv);
}


export { init, fetchCities, addCityToDOM };

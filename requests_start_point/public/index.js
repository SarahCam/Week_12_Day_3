let beerArray = [];

// Create XHR to 'get' JSON data from API (url) & fire a callback function once the data is loaded:

const makeRequest = function(url, callback){
  console.log("MAKING REQUEST...");
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback)
  request.send();
};

// If the XHR is successful (200), convert the JSON string into an object & show object details:

const requestComplete = function(){
  console.log("REQUEST STARTED...");
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  console.log("REQUEST COMPLETE!...");
  displayBeerDropDown(beers);
  // displayBeerTable(beers);
  // displayBeerList(beers);
};

// Generate an HTML dropdown list:

const displayBeerDropDown = function(beers){
  const select = document.getElementById('beer-dropdown');
  for(let beer of beers){
    const option = document.createElement('option');
    option.value = beer;
    option.innerText = beer.name;
    select.appendChild(option);
    beerArray.push(beer);               // Add beer to our beerArray
  }
};

// Generate an HTML list:

const displayBeerList = function(beers){
  for(let beer of beers){
    showBeerDetails(beer);
  };
};

const showBeerDetails = function(beer){
  const beerList = document.getElementById('beer-list');
  showItem("NAME: " + beer.name, beerList);
  showItem("MALT: " + beer.ingredients.malt[0].name, beerList);
  showImage(beer.image_url, beerList);
};

const showItem = function(property, list){
  const item = document.createElement('li');
  item.innerText = property;
  list.appendChild(item);
};

const showImage = function(url, list){
  const item = document.createElement('li');
  const image = document.createElement('img');
  image.src = url;
  item.appendChild(image);
  list.appendChild(item);
};

// Generate an HTML table:

const displayBeerTable = function(beers){
  const beerTable = document.getElementById('beer-table');
  for(let beer of beers){
    showTable(beer, beerTable);
  };
};

const showTable = function(object, table){
  const row = document.createElement('tr');
  showRowImage(object.image_url, row);
  showRow(object.name, row);
  showRow(object.tagline, row);
  table.appendChild(row);
};

const showRow = function(property, row){
  const data = document.createElement('td');
  data.innerText = property;
  row.appendChild(data);
};

const showRowImage = function(url, row){
  const data = document.createElement('td');
  const image = document.createElement('img');
  image.src = url;
  data.appendChild(image);
  row.appendChild(data);
};

// Concatenate all malts into single string method:

const malts = function(maltArray){
  let maltString = "";
  for(let malt of maltArray){
    maltString += malt.name + "\n";
  };
  return maltString;
};

// Show beer method:

const showBeer = function(beer){
  const beerName = document.getElementById('beer-name');
  const beerIngredientsMalt = document.getElementById('beer-ingredients-malt');
  const beerImage = document.getElementById('beer-image');
  beerName.innerText = beer.name;
  beerIngredientsMalt.innerText = "MALTS:\n" + malts(beer.ingredients.malt);
  beerImage.src = beer.image_url;
};

// Main method:

const app = function(){
  const url = "https://api.punkapi.com/v2/beers";
  // const url = "https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json";
  makeRequest(url, requestComplete);

  const select = document.getElementById('beer-dropdown');
  select.addEventListener("change", function(event){
    console.log(event.target.selectedIndex);
    showBeer(beerArray[event.target.selectedIndex]);
  });
};

window.addEventListener('load', app);

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();           // XHR
  request.open("GET", url);                       // open URL
  request.addEventListener("load", callback)      // when it loads fire the callback function
  request.send();                                 // send request
};

const requestComplete = function(){
  if(this.status !== 200) return;         // this means there has been an error, 200 means good
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  console.log("REQUEST COMPLETE!...");
  displayBeers(beers);
};

const displayBeers = function(beers){
  const beerTable = document.getElementById('beer-table');
  for(let beer of beers){
    showTable(beer, beerTable);
  };
};

const showTable = function(object, table){
  console.log(object.name);
  const row = document.createElement('tr');
  showRow(object.name, row);
  showRow(object.tagline, row);
  table.appendChild(row);
};

const showRow = function(property, row){
  const data = document.createElement('td');
  data.innerText = property;
  row.append(data);
}

const app = function(){
  const url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);

};

window.addEventListener('load', app);

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
  for(let beer of beers){
    console.log(beer.name);
  };
};

const app = function(){
  const url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);
};

window.addEventListener('load', app);

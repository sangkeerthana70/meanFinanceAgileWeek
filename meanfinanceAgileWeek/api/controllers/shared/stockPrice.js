var https = require('https');
var _apiUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=P9S1BXDEXR8URAVL&outputsize=compact"

module.exports.getPrice = function(req, res, symbol) {
  
  var url = _apiUrl + "&symbol=" + symbol
  
  console.log(url);

  var request = https.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    var buffer = "", 
      data,
      route;

    response.on("data", function (chunk) {
      buffer += chunk;
    }); 

    response.on("end", function (err) {
      if (err) {
        res
          .status(500)
          .json(err)
      } else {
        // finished transferring data
        // dump the raw data
        data = JSON.parse(buffer);
        // console.log(data);
        var stockData = data['Time Series (Daily)']
        var keys = Object.keys(stockData);
        var price = parseFloat(stockData[keys[0]]['4. close']);
        res
          .status(200)
          .json({"price" : price});
      }
    }); 
  }); 
}

module.exports.returnPrice = function(symbol) {
  var url = _apiUrl + "&symbol=" + symbol
  console.log(url);
  var request = https.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    var buffer = "", 
      data,
      route;

    response.on("data", function (chunk) {
      buffer += chunk;
    }); 

    response.on("end", function (err) {
      if (err) {
        return err
      } else {
        // finished transferring data
        // dump the raw data
        data = JSON.parse(buffer);
        // console.log(data);
        var stockData = data['Time Series (Daily)']
        var keys = Object.keys(stockData);
        return parseFloat(stockData[keys[0]]['4. close']);
      }
    }); 
  }); 
}
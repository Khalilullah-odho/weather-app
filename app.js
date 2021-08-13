const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post('/', function(req, res){
  const city = req.body.cityName;
  const apiKey = "b9dab3e54acbd31765294ac35f4fec92";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const weatherTemp =  weatherData.main.temp;
      const weatherDiscription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<h1> The temperature in "+city+" is : " + weatherTemp + " degree celcius </h1>");
      res.write("<p> The weather is currently :" + weatherDiscription + "</p>" );
      res.write("<img src =" + imageURL + ">");
      res.send();

    });
  })

});


app.listen(3000,function(){
  console.log("express server is running on port 3000. ");
})

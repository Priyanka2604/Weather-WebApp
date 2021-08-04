const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req, res) {

  const query = req.body.cityName;
  const apikey = "84e7d80472502abe0f3d4e6a20196f00";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey +"&units="+ unit;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const icon = weatherData.weather[0].icon
      const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      console.log(weatherData);
      const wed = weatherData.weather[0].description
      res.write("<p>The weather description is "+wed+"</p>");
      res.write("<h2>The temparature in "+ query +" is"+temp+"/h2");
      res.write("<img src = "+imgurl+">");
      res.send();
    })
  })

})





app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})

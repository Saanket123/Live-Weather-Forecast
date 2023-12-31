const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}))


app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/",function (req,res) {
   const cityName  = req.body.cityName;
   const units = req.body.units;
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=f28d589ddff01064f5713be545b1e29a&units=" + units 
       https.get(url,function (response) {
        console.log(response.statusCode)
        response.on("data",function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>The temperature in  " + cityName + "  is "+ temp + " degree Celcius.</p>")
        res.write("<h1>The weather in " + cityName + " is " + weatherDescription + "</h1>")
        res.write("<img src=" + imageURL + ">")
      
        res.send()
     
        })
    })
})


app.listen(3000, function () {
    console.log("This server is running on local port 3000")
})
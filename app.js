//js

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apikey = "f9a4652c1e26b9ebea8181f0c2a642b5";
    const units = "metric";
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const WeatherDesc = weatherData.weather[0].description;
            console.log(WeatherDesc);
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1> The Temperature in "+query+" is "+temp+ " degrees celsuis.</h1>");
            res.write("<h1>The description is "+ WeatherDesc+"</h1>");
            res.write("<img src="+ imageURL +" >");
            res.send();
        });
    });
});


app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");

});
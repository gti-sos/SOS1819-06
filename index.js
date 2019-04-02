var express = require("express");
var bodyParser = require("body-parser");
var uefaCountryApi=require("./uefa-Country-Rankings");
var uefaClubApi = require("./uefa-club-rankings");
var transferAPI = require("./transfer-stats");

var app = express();
app.use(bodyParser.json());


var port = process.env.PORT || 8080;

app.use("/", express.static(__dirname + "/public"));

const MongoClient = require("mongodb").MongoClient;


//Recursos Javier Ezcurra

const urijeg = "mongodb+srv://test:test@sos1819-zkg7f.mongodb.net/test?retryWrites=true";
const clientjeg = new MongoClient(urijeg, { useNewUrlParser: true });

var uefaclubrankings;

clientjeg.connect(err => {
    if (err) {
        console.error("Error accesing DB " + err);
        process.exit(1);
    }
    uefaclubrankings = clientjeg.db("sos1819-jeg").collection("uefa-club-rankings");
    console.log("Connected!");
    uefaClubApi.register(app,uefaclubrankings);
});


//Recursos Alfonso Bravo

const uriabl = "mongodb+srv://alf:alf@cluster0-caxk9.mongodb.net/test?retryWrites=true";
const clientabl = new MongoClient(uriabl, { useNewUrlParser: true });
var transferstats;

clientabl.connect(err => {
    if (err) {
        console.error("Error accesing DB " + err);
        process.exit(1);
    }
    transferstats = clientabl.db("sos1819-abl").collection("transfer-stats");
    console.log("Connected!");
    transferAPI.register(app,transferstats);

});



//Recursos Jesús Herrera

const uri3 = "mongodb+srv://test:country@sos1819-a0beg.mongodb.net/test?retryWrites=true";
const client3 = new MongoClient(uri3, { useNewUrlParser: true });
var uefaCountryRankings;
client3.connect(err => {
    if (err) {
        console.error("Error accesing DB " + err);
        process.exit(1);
    }
    uefaCountryRankings = client3.db("sos1819").collection("uefaCountryRankings");
    console.log("Connected!");
    uefaCountryApi.register(app,uefaCountryRankings);
});



//Inicializar escucha por el puerto...
app.listen(port, () => {
    console.log("Magic is happening in port " + port);


});

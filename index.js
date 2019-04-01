var express = require("express");
var bodyParser = require("body-parser");
var uefaCountryApi=require("./uefa-Country-Rankings");
var uefaClubApi = require("./uefa-club-rankings");
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
});


//GET/api/v1/transfer-stats/docs

app.get("/api/v1/transfer-stats/docs", (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/6893874/S17tP7Vg');
    res.sendStatus(200);
});


// GET /api/v1/transfer-stats/loadInitialData

app.get("/api/v1/transfer-stats/loadInitialData", (req, res) => {
    //if (transferstats.length == 0) {


        var newtransferstats = [{
            country: "Italy",
            team: "Juventus",
            season: 2018,
            moneyspent: 261.5,
            moneyentered: 109.5,
            numberofsignings: 69,
            numberoffarewells: 48
        }, {
            country: "England",
            team: "Chelsea",
            season: 2018,
            moneyspent: 210.0,
            moneyentered: 54.75,
            numberofsignings: 38,
            numberoffarewells: 30
        }, {
            country: "Spain",
            team: "Madrid",
            season: 2018,
            moneyspent: 115.0,
            moneyentered: 98.75,
            numberofsignings: 23,
            numberoffarewells: 24
        }, {
            country: "Spain",
            team: "Barcelona",
            season: 2018,
            moneyspent: 340.0,
            moneyentered: 162.0,
            numberofsignings: 58,
            numberoffarewells: 21
        }, {
            country: "France",
            team: "PSG",
            season: 2018,
            moneyspent: 422.25,
            moneyentered: 273.75,
            numberofsignings: 63,
            numberoffarewells: 47
        }];

        transferstats.find({}).toArray((err, transferstatsArray) => {

        if (transferstatsArray.length == 0) {
            console.log("Empty DB");
            transferstats.insert(newtransferstats);
            res.sendStatus(200);
        }else {
            console.log("Error" + err);
            res.sendStatus(409);
        }
    });


});


// GET /api/v1/transfer-stats

app.get("/api/v1/transfer-stats", (req, res) => {
    transferstats.find({}).toArray((err, transferstatsArray) => {
        if (err)
            console.log("Error: " + err);
        res.send(transferstatsArray);
    });
});

// POST /api/v1/transfer-stats

app.post("/api/v1/transfer-stats", (req, res) => {

    var newtransferstat = req.body;
    
    if (newtransferstat.length > 7 || !newtransferstat.country || !newtransferstat.season || !newtransferstat.team ||
        !newtransferstat.moneyentered || !newtransferstat.moneyspent || !newtransferstat.numberoffarewells || !newtransferstat.numberofsignings) {

        res.sendStatus(400);
        return;
    }

    transferstats.find({ "country": newtransferstat["country"], "season": newtransferstat["season"] }).toArray((err, newtransferstatsArray) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }

        if (newtransferstatsArray.length > 0) {
            res.sendStatus(409);
            return;
        }
        else {
            transferstats.insert(newtransferstat);
            res.sendStatus(201);
        }

    });
});


// DELETE /api/v1/transfer-stats

app.delete("/api/v1/transfer-stats", (req, res) => {

    transferstats.remove({});

    res.sendStatus(200);
});


// GET /api/v1/transfer-stats/England/Chelsea/2018

app.get("/api/v1/transfer-stats/:country/:team/:season", (req, res) => {

    var country = req.params.country;
    var team = req.params.team;
    var season = req.params.season;

    transferstats.find({ "country": country , "team": team, "season":parseInt(season, 10)}).toArray((err, filteredtransferstats) => {
        if (err) {
            console.log("Error: " + err);
            res.sendStatus(500);
            return;
        }

    if (filteredtransferstats.length >= 1) {
        res.send(filteredtransferstats[0]);
    }
    else {
        res.sendStatus(404);
    }

});
});


// PUT /api/v1/transfer-stats/England

app.put("/api/v1/transfer-stats/:country", (req, res) => {

    var country = req.params.country;
    var updatedtransferstats = req.body;

    if (updatedtransferstats.country != country || !updatedtransferstats.season || !updatedtransferstats.moneyentered ||
        !updatedtransferstats.moneyspent || !updatedtransferstats.numberoffarewells || !updatedtransferstats.numberofsignings || !updatedtransferstats.team ||
        updatedtransferstats["country"] == null || updatedtransferstats["season"] == null || updatedtransferstats["numberoffarewells"] == null ||
        updatedtransferstats["moneyentered"] == null || updatedtransferstats["moneyspent"] == null || updatedtransferstats["team"] == null
        || updatedtransferstats["numberofsignings"] == null) {
            res.sendStatus(400);
            return;
    }    
    
    transferstats.find({ "country": country }).toArray((error, filteredtransferstats) => {
        if (error) {
            console.log("Error: " + error);
            res.sendStatus(500);
            return;
        }
        if (filteredtransferstats.length >= 1) {
            transferstats.update({"country": updatedtransferstats.country, "season": updatedtransferstats.season }, updatedtransferstats);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    });

});


// DELETE /api/v1/transfer-stats/England/Liverpool/2018

app.delete("/api/v1/transfer-stats/:country/:team/:season", (req, res) => {

    var country = req.params.country;
    var team = req.params.team;
    var season = req.params.season;
    transferstats.find({ "country": country , "team" : team , "season" : parseInt(season, 10) }).toArray((error, filteredtransferstats) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredtransferstats.length == 0) {
            res.sendStatus(404);
        }
        else {
            transferstats.remove({"country":country,"team": team, "season":parseInt(season, 10)});
            res.sendStatus(200);
        }
    });

});


// POST /api/v1/transfer-stats/England

app.post("/api/v1/transfer-stats/:country", (req, res) => {

    res.sendStatus(405);
});

// PUT /api/v1/transfer-stats

app.put("/api/v1/transfer-stats", (req, res) => {

    res.sendStatus(409);
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

app.listen(port, () => {
    console.log("Magic is happening in port " + port);


});

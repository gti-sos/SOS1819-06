var express = require("express");
var bodyParser = require("body-parser");

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
});

//Get /api/v1/uefa-club-rankings/docs

app.get("/api/v1/uefa-club-rankings/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/7060168/S17tRntb");
});

// GET /api/v1/uefa-club-rankings/loadInitialData

app.get("/api/v1/uefa-club-rankings/loadInitialData", (req, res) => {

    var newuefaclubrankings = [{
        country: "ESP",
        season: 2018,
        points: 146000,
        ptsseason: 19000,
        ptsbeforeseason: 32000,
        team: "Madrid"
    }, {
        country: "GER",
        season: 2018,
        points: 128000,
        ptsseason: 20000,
        ptsbeforeseason: 29000,
        team: "Bayern"
    }, {
        country: "ESP",
        season: 2018,
        points: 128000,
        ptsseason: 20000,
        ptsbeforeseason: 25000,
        team: "FC Barcelona"
    }, {
        country: "ESP",
        season: 2018,
        points: 127000,
        ptsseason: 20000,
        ptsbeforeseason: 28000,
        team: "Atlético"
    }, {
        country: "ITA",
        season: 2018,
        points: 120000,
        ptsseason: 17000,
        ptsbeforeseason: 23000,
        team: "Juventus"
    }];

    uefaclubrankings.find({}).toArray((err, uefaclubrankingsArray) => {

        if (uefaclubrankingsArray.length == 0) {
            console.log("Empty DB");
            uefaclubrankings.insert(newuefaclubrankings);
            res.sendStatus(200);
        }
        else {
            console.log("Error" + err);
            res.sendStatus(409);
        }
    });

});


// GET /api/v1/uefa-club-rankings

app.get("/api/v1/uefa-club-rankings", (req, res) => {
    uefaclubrankings.find({}).toArray((err, uefaclubrankingsArray) => {
        if (err)
            console.log("Error: " + err);
        res.send(uefaclubrankingsArray);
    });
});


// POST /api/v1/uefa-club-rankings

app.post("/api/v1/uefa-club-rankings", (req, res) => {

    var newuefaclubrankings = req.body;

    if (newuefaclubrankings.length > 6 || !newuefaclubrankings.country || !newuefaclubrankings.season || !newuefaclubrankings.ptsseason ||
        !newuefaclubrankings.points || !newuefaclubrankings.team || !newuefaclubrankings.ptsbeforeseason) {

        res.sendStatus(400);
        return;
    }

    uefaclubrankings.find({ "country": newuefaclubrankings["country"], "season": newuefaclubrankings["season"] }).toArray((err, newuefaclubrankingsArray) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }

        if (newuefaclubrankingsArray.length > 0) {
            res.sendStatus(409);
            return;
        }
        else {
            uefaCountryRankings.insert(newuefaclubrankings);
            res.sendStatus(201);
        }

    });

});


// DELETE /api/v1/uefa-club-rankings

app.delete("/api/v1/uefa-club-rankings", (req, res) => {

    uefaclubrankings.remove({});

    res.sendStatus(200);
});


// GET /api/v1/uefa-club-rankings/ESP

app.get("/api/v1/uefa-club-rankings/:country", (req, res) => {

    var country = req.params.country;

    uefaclubrankings.find({ "country": country }).toArray((err, filtereduefaclubrankings) => {
        if (err) {
            console.log("Error: " + err);
            res.sendStatus(500);
            return;
        }
        if (filtereduefaclubrankings.length >= 1) {
            res.send(filtereduefaclubrankings);
        }
        else {
            res.sendStatus(404);
        }
    });

});

// GET /api/v1/uefa-club-rankings/team/2018

app.get("/api/v1/uefa-club-rankings/:team/:season", (req, res) => {

    var team = req.params.team;
    var season = req.params.season;

    uefaclubrankings.find({ "team": team, "season": season }).toArray((err, filtereduefaclubrankings) => {
        if (err) {
            console.log("Error: " + err);
            res.sendStatus(500);
            return;
        }
        if (filtereduefaclubrankings.length >= 1) {
            res.send(filtereduefaclubrankings[0]);
        }
        else {
            res.sendStatus(404);
        }
    });

});

// PUT /api/v1/uefa-club-rankings/ESP

app.put("/api/v1/uefa-club-rankings/:country", (req, res) => {
    var updateduefaclubrankings = req.body;
    var country = req.params.country;
    
    if (updateduefaclubrankings.country != country || !updateduefaclubrankings.season || !updateduefaclubrankings.points ||
        !updateduefaclubrankings.ptsseason || !updateduefaclubrankings.ptsbeforeseason || !updateduefaclubrankings.team ||
        updateduefaclubrankings["country"] == null || updateduefaclubrankings["season"] == null ||
        updateduefaclubrankings["ptsseason"] == null || updateduefaclubrankings["points"] == null || updateduefaclubrankings["team"] == null
        || updateduefaclubrankings["ptsbeforeseason"] == null) {
            res.sendStatus(400);
            return;
    }    
    
    uefaclubrankings.find({ "country": country }).toArray((error, filtereduefaclubrankings) => {
        if (error) {
            console.log("Error: " + error);
            res.sendStatus(500);
            return;
        }
        if (filtereduefaclubrankings.length >= 1) {
            uefaclubrankings.update({"country": updateduefaclubrankings.country, "season": updateduefaclubrankings.season }, updateduefaclubrankings);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    });
    
});


// DELETE /api/v1/uefa-club-rankings/ESP

app.delete("/api/v1/uefa-club-rankings/:country", (req, res) => {
    var country = req.params.country;
    uefaclubrankings.find({ "country": country }).toArray((error, filtereduefaclubrankings) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filtereduefaclubrankings.length == 0) {
            res.sendStatus(404);
        }
        else {
            uefaclubrankings.deleteOne({ "country": country });
            res.sendStatus(200);
        }
    });
});

// POST /api/v1/uefa-club-rankings/ESP

app.post("/api/v1/uefa-club-rankings/:country", (req, res) => {

    res.sendStatus(409);
});

// PUT /api/v1/uefa-club-rankings

app.put("/api/v1/uefa-club-rankings", (req, res) => {

    res.sendStatus(409);
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

    transferstats.find({ "country": country , "team": team, "season":season}).toArray((err, filteredtransferstats) => {
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


// DELETE /api/v1/transfer-stats/England

app.delete("/api/v1/transfer-stats/:country", (req, res) => {

    var country = req.params.country;
    transferstats.find({ "country": country }).toArray((error, filteredtransferstats) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredtransferstats.length == 0) {
            res.sendStatus(404);
        }
        else {
            transferstats.deleteOne({ "country": country });
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
});

// GET REDIRECT

app.get("/api/v1/uefa-country-rankings/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/7044495/S17tPSu7");
});

// GET /api/v1/uefa-country-rankings/loadInitialData

app.get("/api/v1/uefa-country-rankings/loadInitialData", (req, res) => {

    var newUefaCountryRankings = [{
        country: "Spain",
        season: "17-18",
        rankingPosition: 1,
        points: 106998,
        teams: 7
    }, {
        country: "Spain",
        season: "16-17",
        rankingPosition: 1,
        points: 104998,
        teams: 7
    }, {
        country: "England",
        season: "17-18",
        rankingPosition: 2,
        points: 79605,
        teams: 7
    }, {
        country: "Portugal",
        season: "17-18",
        rankingPosition: 7,
        points: 47248,
        teams: 6
    }, {
        country: "France",
        season: "17-18",
        rankingPosition: 5,
        points: 56415,
        teams: 6
    }, {
        country: "Germany",
        season: "16-17",
        rankingPosition: 2,
        points: 79498,
        teams: 7
    }];
    uefaCountryRankings.find({}).toArray((err, uefaCountryRankingsArray) => {

        if (uefaCountryRankingsArray.length == 0) {
            console.log("Empty DB");
            uefaCountryRankings.insert(newUefaCountryRankings);
            res.sendStatus(200);
        }
        else {
            console.log("Error" + err);
            res.sendStatus(409);
        }
    });
});


// GET /api/v1/uefa-country-rankings

app.get("/api/v1/uefa-country-rankings", (req, res) => {
    uefaCountryRankings.find({}).toArray((err, uefaCountryRankingsArray) => {
        if (err)
            console.log("Error: " + err);
        res.send(uefaCountryRankingsArray);
    });
});


// POST /api/v1/uefa-country-rankings

app.post("/api/v1/uefa-country-rankings", (req, res) => {

    var newUefaCountryRankings = req.body;

    if (newUefaCountryRankings.length > 5 || !newUefaCountryRankings.country || !newUefaCountryRankings.season || !newUefaCountryRankings.rankingPosition ||
        !newUefaCountryRankings.points || !newUefaCountryRankings.teams) {

        res.sendStatus(400);
        return;
    }

    uefaCountryRankings.find({ "country": newUefaCountryRankings["country"], "season": newUefaCountryRankings["season"] }).toArray((err, newUefaCountryRankingsArray) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }

        if (newUefaCountryRankingsArray.length > 0) {
            res.sendStatus(409);
            return;
        }
        else {
            uefaCountryRankings.insert(newUefaCountryRankings);
            res.sendStatus(201);
        }

    });

});


// DELETE /api/v1/uefa-country-rankings

app.delete("/api/v1/uefa-country-rankings", (req, res) => {

    uefaCountryRankings.remove({});

    res.sendStatus(200);
});


// GET /api/v1/uefa-country-rankings/Spain

app.get("/api/v1/uefa-country-rankings/:country", (req, res) => {

    var country = req.params.country;

    uefaCountryRankings.find({ "country": country }).toArray((err, filteredUefaCountryRankings) => {
        if (err) {
            console.log("Error: " + err);
            res.sendStatus(500);
            return;
        }
        if (filteredUefaCountryRankings.length >= 1) {
            res.send(filteredUefaCountryRankings);
        }
        else {
            res.sendStatus(404);
        }
    });

});

// GET /api/v1/uefa-country-rankings/Spain/17-18

app.get("/api/v1/uefa-country-rankings/:country/:season", (req, res) => {

    var country = req.params.country;
    var season = req.params.season;

    uefaCountryRankings.find({ "country": country, "season": season }).toArray((err, filteredUefaCountryRankings) => {
        if (err) {
            console.log("Error: " + err);
            res.sendStatus(500);
            return;
        }
        if (filteredUefaCountryRankings.length >= 1) {
            res.send(filteredUefaCountryRankings[0]);
        }
        else {
            res.sendStatus(404);
        }
    });

});




// PUT /api/v1/uefa-country-rankings/Spain/17-18

app.put("/api/v1/uefa-country-rankings/:country/:season", (req, res) => {

    var country = req.params.country;
    var season = req.params.season;
    var updatedUefaCountry = req.body;

    if (updatedUefaCountry.country != country || updatedUefaCountry.season != season || !updatedUefaCountry.rankingPosition || !updatedUefaCountry.points || !updatedUefaCountry.teams ||
        updatedUefaCountry["country"] == null || updatedUefaCountry["season"] == null || updatedUefaCountry["rankingPosition"] == null || updatedUefaCountry["points"] == null || updatedUefaCountry["teams"] == null) {
        res.sendStatus(400);
        return;
    }
    
    uefaCountryRankings.find({"country": country, "season": season }).toArray((err, filteredUefaCountryRankings) => {
        if (err) {
            console.log("Error: " + err);
            res.sendStatus(500);
            return;
        }
        if (filteredUefaCountryRankings.length >= 1) {
            uefaCountryRankings.update({"country": updatedUefaCountry.country, "season": updatedUefaCountry.season }, updatedUefaCountry);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    });
    
});



// DELETE /api/v1/uefa-country-rankings/Spain

app.delete("/api/v1/uefa-country-rankings/:country", (req, res) => {
    var country = req.params.country;
    //var season = req.params.season;
    uefaCountryRankings.remove({"country":country});

    res.sendStatus(200);

});

// POST /api/v1/uefa-country-rankings/Spain

app.post("/api/v1/uefa-country-rankings/:country", (req, res) => {
    res.sendStatus(405);
});

// PUT /api/v1/uefa-country-rankings

app.put("/api/v1/uefa-country-rankings", (req, res) => {

    res.sendStatus(405);
});

app.listen(port, () => {
    console.log("Magic is happening in port " + port);


});

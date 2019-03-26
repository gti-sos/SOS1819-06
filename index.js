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
    uefaclubrankings = clientjeg.db("sos1819").collection("uefa-club-rankings");
    console.log("Connected!");
});

//Get /api/v1/uefa-club-rankings/docs

app.get("/api/v1/uefa-club-rankings/docs", (req, res) => {
    res.redirect("");
});

// GET /api/v1/uefa-club-rankings/loadInitialData

app.get("/api/v1/uefa-club-rankings/loadInitialData", (req, res) => {

    var newuefaclubrankings = [{
        country: "ESP",
        season: "2018/19",
        points: "146000",
        ptsseason: "19000",
        ptsbeforeseason: "32000",
        team: "Real Madrid"
    }, {
        country: "GER",
        season: "2018/19",
        points: "128000",
        ptsseason: "20000",
        ptsbeforeseason: "29000",
        team: "FC Bayern München"
    }, {
        country: "ESP",
        season: "2018/19",
        points: "128000",
        ptsseason: "20000",
        ptsbeforeseason: "25000",
        team: "FC Barcelona"
    }, {
        country: "ESP",
        season: "2018/19",
        points: "127000",
        ptsseason: "20000",
        ptsbeforeseason: "28000",
        team: "Club Atlético de Madrid"
    }, {
        country: "ITA",
        season: "2018/19",
        points: "120000",
        ptsseason: "17000",
        ptsbeforeseason: "23000",
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
    uefaclubrankings.find({}).toArray((err, uefaclubrankingsArray) => {
        if (err)
            console.log("Error: " + err);
        if(uefaclubrankingsArray.country==newuefaclubrankings.country ||uefaclubrankingsArray.season==newuefaclubrankings.season
        || uefaclubrankingsArray.team==newuefaclubrankings.team ){
            res.sendStatus(409);
            return;
        }
    });
    if (!newuefaclubrankings.country || !newuefaclubrankings.season || !newuefaclubrankings.points ||
        !newuefaclubrankings.ptsseason || !newuefaclubrankings.ptsbeforeseason || !newuefaclubrankings.team || newuefaclubrankings.length <= 6) {
        uefaclubrankings.insert(newuefaclubrankings);
        res.sendStatus(201);
    }
    else {
        res.sendStatus(400);
    }

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

// PUT /api/v1/uefa-club-rankings/ESP

app.put("/api/v1/uefa-club-rankings/:country", (req, res) => {
    var updateduefaclubrankings = req.body;
    if (!updateduefaclubrankings.country || !updateduefaclubrankings.season || !updateduefaclubrankings.points ||
        !updateduefaclubrankings.ptsseason || !updateduefaclubrankings.ptsbeforeseason || !updateduefaclubrankings.team 
        || updateduefaclubrankings.length <= 6) {
        var country = req.params.country;
        uefaclubrankings.find({ "country": country }).toArray((error, filtereduefaclubrankings) => {
            if (error) {
                console.log("Error: " + error);
            }
            if (filtereduefaclubrankings.length == 0) {
                res.sendStatus(400);
            }
            else {
                uefaclubrankings.updateOne({ "country": country }, { $set: updateduefaclubrankings });
                res.sendStatus(200);
            }
        });
    }else{
        res.sendStatus(400);
    }

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
    })
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

//GET/api/v1/transfer-stats/docs

app.get("/api/v1/transfer-stats/docs", (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/6893874/S17tP7Vg');
    res.sendStatus(200);
});


var transferstats = [];

// GET /api/v1/transfer-stats/loadInitialData

app.get("/api/v1/transfer-stats/loadInitialData", (req, res) => {
    if (transferstats.length == 0) {


        transferstats = [{
            country: "Italy",
            team: "Juventus",
            season: 2018 - 2019,
            moneyspent: 261.5,
            moneyentered: 109.5,
            numberofsignings: 69,
            numberoffarewells: 48
        }, {
            country: "England",
            team: "Chelsea",
            season: 2018 - 2019,
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


        res.sendStatus(200);
    }
    else {
        res.sendStatus(409);
    }

});


// GET /api/v1/transfer-stats

app.get("/api/v1/transfer-stats", (req, res) => {
    res.send(transferstats);
});


// POST /api/v1/transfer-stats

app.post("/api/v1/transfer-stats", (req, res) => {

    var newtransferstat = req.body;

    transferstats.push(newtransferstat);

    res.sendStatus(201);
});


// DELETE /api/v1/transfer-stats

app.delete("/api/v1/transfer-stats", (req, res) => {

    transferstats = [];

    res.sendStatus(200);
});


// GET /api/v1/transfer-stats/England

app.get("/api/v1/transfer-stats/:country", (req, res) => {

    var country = req.params.country;

    var filteredtransferstats = transferstats.filter((c) => {
        return c.country == country;
    });

    if (filteredtransferstats.length >= 1) {
        res.send(filteredtransferstats);
    }
    else {
        res.sendStatus(404);
    }

});


// PUT /api/v1/transfer-stats/England

app.put("/api/v1/transfer-stats/:country", (req, res) => {

    var country = req.params.country;
    var updatedtransferstats = req.body;
    var found = false;

    var updatedtransferstats2 = transferstats.map((c) => {

        if (c.country == country) {
            found = true;
            return updatedtransferstats;
        }
        else {
            return c;
        }

    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        transferstats = updatedtransferstats2;
        res.sendStatus(200);
    }

});


// DELETE /api/v1/transfer-stats/England

app.delete("/api/v1/transfer-stats/:country", (req, res) => {

    var country = req.params.country;
    var found = false;

    var updatedCountry = transferstats.filter((c) => {

        if (c.country == country)
            found = true;

        return c.country != country;
    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        transferstats = updatedCountry;
        res.sendStatus(200);
    }

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
    uefaCountryRankings.insert(newUefaCountryRankings);

    res.sendStatus(201);
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
            res.send(filteredUefaCountryRankings);
        }
        else {
            res.sendStatus(404);
        }
    });

});


// PUT /api/v1/uefa-country-rankings/Spain

app.put("/api/v1/uefa-country-rankings/:country/:season", (req, res) => {

    var country = req.params.country;
    var season = req.params.season;
    var updatedUefaCountryRankings = req.body;
    var found = false;

    var updatedUefaCountryRankings2 = uefaCountryRankings.map((c) => {

        if (c.country == country && c.season == season) {
            found = true;
            return updatedUefaCountryRankings;
        }
        else {
            return c;
        }

    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        uefaCountryRankings = updatedUefaCountryRankings2;
        res.sendStatus(200);
    }

});


// DELETE /api/v1/uefa-country-rankings/Spain

app.delete("/api/v1/uefa-country-rankings/:country", (req, res) => {

    var country = req.params.country;
    var found = false;

    var updatedCountry = uefaCountryRankings.filter((c) => {

        if (c.country == country)
            found = true;

        return c.country != country;
    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        uefaCountryRankings = updatedCountry;
        res.sendStatus(200);
    }

});

// POST /api/v1/uefa-country-rankings/Spain

app.post("/api/v1/uefa-country-rankings/:country", (req, res) => {
    res.sendStatus(409);
});

// PUT /api/v1/uefa-country-rankings

app.put("/api/v1/uefa-country-rankings", (req, res) => {

    res.sendStatus(409);
});

app.listen(port, () => {
    console.log("Magic is happening in port " + port);


});

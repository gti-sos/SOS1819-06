var BASE_PATH = "/api/v1";

module.exports = {
    register: function(app, transferstats) {

        //Get /api/v1/transfer-stats/docs

        app.get(BASE_PATH + "/transfer-stats/docs", (req, res) => {
            res.redirect("https://documenter.getpostman.com/view/6893874/S17tP7Vg");
            res.sendStatus(200);
        });

        // GET /api/v1/transfer-stats/loadInitialData

        app.get(BASE_PATH + "/transfer-stats/loadInitialData", (req, res) => {

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

        app.get(BASE_PATH + "/transfer-stats", (req, res) => {
            var limit = parseInt(req.query.limit);
            var offSet = parseInt(req.query.offset);
            var fromSeason = parseInt(req.query.from);
            var toSeason = parseInt(req.query.to);
            var season = parseInt(req.query.season);
            var team = req.query.team;
            var frommoneyspent = parseInt(req.query.frommoneyspent);
            var tomoneyspent = parseInt(req.query.tomoneyspent);
            var frommoneyentered = parseInt(req.query.frommoneyentered);
            var tomoneyentered = parseInt(req.query.tomoneyentered);
            var fromnumberofsignings = parseInt(req.query.fromnumberofsignings);
            var tonumberofsignings = parseInt(req.query.tonumberofsignings);
            var fromnumberoffarewells = parseInt(req.query.fromnumberoffarewells);
            var tonumberoffarewells = parseInt(req.query.tonumberoffarewells);

            if (Number.isInteger(fromSeason) && Number.isInteger(toSeason)) {
                transferstats.find({ season: { $gte: fromSeason, $lte: toSeason } }).skip(offSet).limit(limit).toArray((err, transferstatsArray) => {
                    if (err)
                        console.log("Error: " + err);
                    if (transferstatsArray.length == 0) {
                        res.sendStatus(404);
                        return;
                    }
                    else {
                        res.send(transferstatsArray.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    }
                });
            }
            else if (Number.isInteger(season)) {
                transferstats.find({ season: season }).skip(offSet).limit(limit).toArray((err, transferstatsArray) => {
                    if (err)
                        console.log("Error: " + err);
                    if (transferstatsArray.length == 0) {
                        res.sendStatus(404);
                        return;
                    }

                    else {
                        res.send(transferstatsArray.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    }
                });

            }
            else if (team) {
                transferstats.find({ team: team }).skip(offSet).limit(limit).toArray((err, transferstatsArray) => {
                    if (err)
                        console.log("Error: " + err);
                    if (transferstatsArray.length == 0) {
                        res.sendStatus(404);
                        return;
                    }

                    else {
                        res.send(transferstatsArray.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    }
                });

            }
            else if (Number.isInteger(frommoneyspent) && Number.isInteger(tomoneyspent)) {
                transferstats.find({ moneyspent: { $gte: frommoneyspent, $lte: tomoneyspent } }).skip(offSet).limit(limit).toArray((err, transferstatsArray) => {
                    if (err)
                        console.log("Error: " + err);
                    if (transferstatsArray.length == 0) {
                        res.sendStatus(404);
                        return;
                    }

                    else {
                        res.send(transferstatsArray.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    }
                });

            }
            else if (Number.isInteger(frommoneyentered) && Number.isInteger(tomoneyentered)) {
                transferstats.find({ moneyentered: { $gte: frommoneyentered, $lte: tomoneyentered } }).skip(offSet).limit(limit).toArray((err, transferstatsArray) => {
                    if (err)
                        console.log("Error: " + err);
                    if (transferstatsArray.length == 0) {
                        res.sendStatus(404);
                        return;
                    }

                    else {
                        res.send(transferstatsArray.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    }
                });

            }
            else if (Number.isInteger(fromnumberofsignings) && Number.isInteger(tonumberofsignings)) {
                transferstats.find({ numberofsignings: { $gte: fromnumberofsignings, $lte: tonumberofsignings } }).skip(offSet).limit(limit).toArray((err, transferstatsArray) => {
                    if (err)
                        console.log("Error: " + err);
                    if (transferstatsArray.length == 0) {
                        res.sendStatus(404);
                        return;
                    }

                    else {
                        res.send(transferstatsArray.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    }
                });

            }
            else if (Number.isInteger(fromnumberoffarewells) && Number.isInteger(tonumberoffarewells)) {
                transferstats.find({ numberoffarewells: { $gte: fromnumberoffarewells, $lte: tonumberoffarewells } }).skip(offSet).limit(limit).toArray((err, transferstatsArray) => {
                    if (err)
                        console.log("Error: " + err);
                    if (transferstatsArray.length == 0) {
                        res.sendStatus(404);
                        return;
                    }

                    else {
                        res.send(transferstatsArray.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    }
                });

            }
            else {
                transferstats.find({}).skip(offSet).limit(limit).toArray((err, transferstatsArray) => {
                    if (err)
                        console.log("Error: " + err);
                    if (transferstatsArray.length == 0) {
                        res.sendStatus(404);
                        return;
                    }

                    else {
                        res.send(transferstatsArray.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    }

                });
            }
        });


        // POST /api/v1/transfer-stats

        app.post(BASE_PATH + "/transfer-stats", (req, res) => {

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

        app.delete(BASE_PATH + "/transfer-stats", (req, res) => {
            transferstats.remove({});
            res.sendStatus(200);
        });


        // GET /api/v1/transfer-stats/England/Chelsea/2018

        app.get(BASE_PATH + "/transfer-stats/:country/:team/:season", (req, res) => {

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


        // PUT /api/v1/transfer-stats/England/Chelsea/2018
        
        app.put(BASE_PATH + "/transfer-stats/:country/:season", (req, res) => {
            var season = req.params.season;
            var country = req.params.country;
            var team = req.params.team;
            var updatedtransferstats = req.body;
        
            if (updatedtransferstats.country != country || !updatedtransferstats.season || !updatedtransferstats.moneyentered ||
                !updatedtransferstats.moneyspent || !updatedtransferstats.numberoffarewells || !updatedtransferstats.numberofsignings || !updatedtransferstats.team ||
                updatedtransferstats["country"] == null || updatedtransferstats["season"] == null || updatedtransferstats["numberoffarewells"] == null ||
                updatedtransferstats["moneyentered"] == null || updatedtransferstats["moneyspent"] == null || updatedtransferstats["team"] == null
                || updatedtransferstats["numberofsignings"] == null) {
                    res.sendStatus(400);
                    return;
            }    
            
            transferstats.find({ "country": country, "season": parseInt(season, 10), "team": team}).toArray((error, filteredtransferstats) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                    return;
                }
                if (filteredtransferstats.length >= 1) {
                    transferstats.update({"country": updatedtransferstats.country, "season": updatedtransferstats.season, "team":updatedtransferstats.team}, updatedtransferstats);
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            });
        
        });
        

        // DELETE /api/v1/transfer-stats/England/Liverpool/2018

        app.delete(BASE_PATH + "/transfer-stats/:country/:team/:season", (req, res) => {
        
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

        // POST /api/v1/transfer-stats/England/Chelsea/2018

        app.post("/api/v1/transfer-stats/:country/:team/:season", (req, res) => {
        
            res.sendStatus(405);
        });
        
        // PUT /api/v1/transfer-stats
        
        app.put("/api/v1/transfer-stats", (req, res) => {
        
            res.sendStatus(409);
        });

    
}};
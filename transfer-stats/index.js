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
            moneyspent: 261,
            moneyentered: 109,
            numberofsignings: 69,
            numberoffarewells: 48
        }, {
            country: "Germany",
            team: "Bayern",
            season: 2018,
            moneyspent: 270,
            moneyentered: 24,
            numberofsignings: 48,
            numberoffarewells: 31
        }, {
            country: "Japan",
            team: "Kobe",
            season: 2018,
            moneyspent: 240,
            moneyentered: 163,
            numberofsignings: 37,
            numberoffarewells: 29
        }, {
            country: "Ukraine",
            team: "Shaktar",
            season: 2018,
            moneyspent: 122,
            moneyentered: 188,
            numberofsignings: 28,
            numberoffarewells: 34
        }, {
            country: "USA",
            team: "Galaxy",
            season: 2018,
            moneyspent: 244,
            moneyentered: 182,
            numberofsignings: 42,
            numberoffarewells: 36
        }, {
            country: "England",
            team: "Chelsea",
            season: 2018,
            moneyspent: 210,
            moneyentered: 54,
            numberofsignings: 38,
            numberoffarewells: 30
        }, {
            country: "Spain",
            team: "Madrid",
            season: 2018,
            moneyspent: 115,
            moneyentered: 98,
            numberofsignings: 23,
            numberoffarewells: 24
        }, {
            country: "Portugal",
            team: "Benfica",
            season: 2018,
            moneyspent: 340,
            moneyentered: 162,
            numberofsignings: 58,
            numberoffarewells: 21
        }, {
            country: "France",
            team: "PSG",
            season: 2018,
            moneyspent: 422,
            moneyentered: 273,
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
            var country = req.query.country;
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
            else if (country) {
                transferstats.find({ country: country }).skip(offSet).limit(limit).toArray((err, transferstatsArray) => {
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
                    /*if (transferstatsArray.length == 0) {
                        //res.sendStatus(404);
                        return;
                    }

                    else {*/
                        res.send(transferstatsArray.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    //}

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
        else{
        transferstats.find({ "country": newtransferstat["country"], "team": newtransferstat["team"], "season": newtransferstat["season"] }).toArray((err, newtransferstatsArray) => {
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
        }
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
                res.send(filteredtransferstats.map((o)=>{
                    delete o._id;
                    return o;
                })[0]);
            }
            else {
                res.sendStatus(404);
            }
    
        });
});


        // PUT /api/v1/transfer-stats/England/Chelsea/2018
        
        app.put(BASE_PATH + "/transfer-stats/:country/:team/:season", (req, res) => {
            var season = req.params.season;
            var country = req.params.country;
            var team = req.params.team;
            var updatedtransferstats = req.body;
        
        
            if (Object.keys(updatedtransferstats).length > 7 || updatedtransferstats.country != country || updatedtransferstats.season != season || !updatedtransferstats.moneyentered ||
                !updatedtransferstats.moneyspent || !updatedtransferstats.numberoffarewells || !updatedtransferstats.numberofsignings || updatedtransferstats.team != team||
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
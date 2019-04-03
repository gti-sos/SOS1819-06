var BASE_PATH = "/api/v1";

module.exports = {
    register: function(app, uefaclubrankings) {

        //Get /api/v1/uefa-club-rankings/docs

        app.get(BASE_PATH + "/uefa-club-rankings/docs", (req, res) => {
            res.redirect("https://documenter.getpostman.com/view/7060168/S17tRntb");
        });

        // GET /api/v1/uefa-club-rankings/loadInitialData

        app.get(BASE_PATH + "/uefa-club-rankings/loadInitialData", (req, res) => {

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

        app.get(BASE_PATH + "/uefa-club-rankings", (req, res) => {
            var limit = parseInt(req.query.limit);
            var offSet = parseInt(req.query.offset);
            var fromSeason = parseInt(req.query.from);
            var toSeason = parseInt(req.query.to);
            var season = parseInt(req.query.season);
            var team = req.query.team;
            var fromptsseason = parseInt(req.query.fromptsseason);
            var toptsseason = parseInt(req.query.toptsseason);
            var fromptsbeforeseason = parseInt(req.query.fromptsbeforeseason);
            var toptsbeforeseason = parseInt(req.query.toptsbeforeseason);
            var fromPoints = parseInt(req.query.fromPoints);
            var toPoints = parseInt(req.query.toPoints);

            if (Number.isInteger(fromSeason) && Number.isInteger(toSeason)) {
                uefaclubrankings.find({ season: { $gte: fromSeason, $lte: toSeason } }).skip(offSet).limit(limit).toArray((err, uefaclubrankingsArray) => {
                    if (err)
                        console.log("Error: " + err);
                    if (uefaclubrankingsArray.length == 0) {
                        res.sendStatus(404);
                        return;
                    }
                    else {
                        res.send(uefaclubrankingsArray.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    }
                });
            }
            else if (Number.isInteger(season)) {
                uefaclubrankings.find({ season: season }).skip(offSet).limit(limit).toArray((err, uefaclubrankingsArray) => {
                    if (err)
                        console.log("Error: " + err);
                    if (uefaclubrankingsArray.length == 0) {
                        res.sendStatus(404);
                        return;
                    }

                    else {
                        res.send(uefaclubrankingsArray.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    }
                });

            }
            else if (team) {
                uefaclubrankings.find({ team: team }).skip(offSet).limit(limit).toArray((err, uefaclubrankingsArray) => {
                    if (err)
                        console.log("Error: " + err);
                    if (uefaclubrankingsArray.length == 0) {
                        res.sendStatus(404);
                        return;
                    }

                    else {
                        res.send(uefaclubrankingsArray.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    }
                });

            }
            else if (Number.isInteger(fromptsseason) && Number.isInteger(toptsseason)) {
                uefaclubrankings.find({ ptsseason: { $gte: fromptsseason, $lte: toptsseason } }).skip(offSet).limit(limit).toArray((err, uefaclubrankingsArray) => {
                    if (err)
                        console.log("Error: " + err);
                    if (uefaclubrankingsArray.length == 0) {
                        res.sendStatus(404);
                        return;
                    }

                    else {
                        res.send(uefaclubrankingsArray.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    }
                });

            }
            else if (Number.isInteger(fromptsbeforeseason) && Number.isInteger(toptsbeforeseason)) {
                uefaclubrankings.find({ ptsbeforeseason: { $gte: fromptsbeforeseason, $lte: toptsbeforeseason } }).skip(offSet).limit(limit).toArray((err, uefaclubrankingsArray) => {
                    if (err)
                        console.log("Error: " + err);
                    if (uefaclubrankingsArray.length == 0) {
                        res.sendStatus(404);
                        return;
                    }

                    else {
                        res.send(uefaclubrankingsArray.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    }
                });

            }
            else if (Number.isInteger(fromPoints) && Number.isInteger(toPoints)) {
                uefaclubrankings.find({ points: { $gte: fromPoints, $lte: toPoints } }).skip(offSet).limit(limit).toArray((err, uefaclubrankingsArray) => {
                    if (err)
                        console.log("Error: " + err);
                    if (uefaclubrankingsArray.length == 0) {
                        res.sendStatus(404);
                        return;
                    }

                    else {
                        res.send(uefaclubrankingsArray.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    }
                });

            }
            else {
                uefaclubrankings.find({}).skip(offSet).limit(limit).toArray((err, uefaclubrankingsArray) => {
                    if (err)
                        console.log("Error: " + err);
                  //  if (uefaclubrankingsArray.length == 0) {
                    //    res.sendStatus(404);
                    //    return;
                  //  }

                    //else {
                        res.send(uefaclubrankingsArray.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    //}

               });
            }
        });


        // POST /api/v1/uefa-club-rankings

        app.post(BASE_PATH + "/uefa-club-rankings", (req, res) => {

            var newuefaclubrankings = req.body;

            if (newuefaclubrankings.length > 6 || !newuefaclubrankings.country || !newuefaclubrankings.season || !newuefaclubrankings.ptsseason ||
                !newuefaclubrankings.points || !newuefaclubrankings.team || !newuefaclubrankings.ptsbeforeseason) {

                res.sendStatus(400);
                return;
            }
            else {

                uefaclubrankings.find({ "team": newuefaclubrankings["team"], "season": parseInt(newuefaclubrankings["season"], 10) }).toArray((err, newuefaclubrankingsArray) => {
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
                        uefaclubrankings.insert(newuefaclubrankings);
                        res.sendStatus(201);
                    }
                });
            }
        });


        // DELETE /api/v1/uefa-club-rankings

        app.delete(BASE_PATH + "/uefa-club-rankings", (req, res) => {

            uefaclubrankings.remove({});

            res.sendStatus(200);
        });


        // GET /api/v1/uefa-club-rankings/ESP

        app.get(BASE_PATH + "/uefa-club-rankings/:country", (req, res) => {

            var country = req.params.country;
            var fromSeason = parseInt(req.query.from);
            var toSeason = parseInt(req.query.to);
            var limit = parseInt(req.query.limit);
            var offSet = parseInt(req.query.offset);

            if (Number.isInteger(fromSeason) && Number.isInteger(toSeason)) {
                uefaclubrankings.find({ "country": country, "season": { $gte: fromSeason, $lte: toSeason } }).skip(offSet).limit(limit).toArray((err, filtereduefaclubrankings) => {
                    if (err) {
                        console.log("Error: " + err);
                        res.sendStatus(500);
                        return;
                    }
                    if (filtereduefaclubrankings.length >= 1) {
                        res.send(filtereduefaclubrankings.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    }
                    else {
                        res.sendStatus(404);
                    }
                });
            }
            else {
                uefaclubrankings.find({ "country": country }).skip(offSet).limit(limit).toArray((err, filtereduefaclubrankings) => {
                    if (err) {
                        console.log("Error: " + err);
                        res.sendStatus(500);
                        return;
                    }
                    //if (filtereduefaclubrankings.length >= 1) {
                        res.send(filtereduefaclubrankings.map((o) => {
                            delete o._id;
                            return o;
                        }));
                    //}
                    //else {
                     //   res.sendStatus(404);
                   // }
                });
            }
        });

        // GET /api/v1/uefa-club-rankings/Madrid/2018

        app.get(BASE_PATH + "/uefa-club-rankings/:team/:season", (req, res) => {

            var team = req.params.team;
            var season = parseInt(req.params.season, 10);

            uefaclubrankings.find({ "team": team, "season": season }).toArray((err, filtereduefaclubrankings) => {
                if (err) {
                    console.log("Error: " + err);
                    res.sendStatus(500);
                    return;
                }
                if (filtereduefaclubrankings.length >= 1) {
                    res.send(filtereduefaclubrankings.map((o) => {
                        delete o._id;
                        return o;
                    })[0]);
                }
                else {
                    res.sendStatus(404);
                }
            });

        });

        // PUT /api/v1/uefa-club-rankings/Madrid/2018

        app.put(BASE_PATH + "/uefa-club-rankings/:team/:season", (req, res) => {
            var updateduefaclubrankings = req.body;
            var team = req.params.team;
            var season = req.params.season;

            if (updateduefaclubrankings.team != team || updateduefaclubrankings.season != parseInt(season, 10) || !updateduefaclubrankings.season || !updateduefaclubrankings.points ||
                !updateduefaclubrankings.ptsseason || !updateduefaclubrankings.ptsbeforeseason || !updateduefaclubrankings.team ||
                updateduefaclubrankings["team"] == null || updateduefaclubrankings["season"] == null ||
                updateduefaclubrankings["ptsseason"] == null || updateduefaclubrankings["points"] == null || updateduefaclubrankings["country"] == null ||
                updateduefaclubrankings["ptsbeforeseason"] == null) {
                res.sendStatus(400);
                return;
            }

            uefaclubrankings.find({ "team": team, "season": parseInt(season, 10) }).toArray((error, filtereduefaclubrankings) => {
                if (error) {
                    console.log("Error: " + error);
                    res.sendStatus(500);
                    return;
                }
                if (filtereduefaclubrankings.length >= 1) {
                    uefaclubrankings.update({ "country": updateduefaclubrankings.country, "season": updateduefaclubrankings.season }, updateduefaclubrankings);
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            });

        });


        // DELETE /api/v1/uefa-club-rankings/Madrid/2018

        app.delete(BASE_PATH + "/uefa-club-rankings/:team/:season", (req, res) => {
            var team = req.params.team;
            var season = req.params.season;
            uefaclubrankings.find({ "team": team, "season": parseInt(season, 10) }).toArray((error, filtereduefaclubrankings) => {
                if (error) {
                    console.log("Error: " + error);
                }
                if (filtereduefaclubrankings.length == 0) {
                    res.sendStatus(404);
                }
                else {
                    uefaclubrankings.remove({ "team": team, "season": parseInt(season, 10) });
                    res.sendStatus(200);
                }
            });
        });

        // POST /api/v1/uefa-club-rankings/ESP

        app.post(BASE_PATH + "/uefa-club-rankings/:country", (req, res) => {

            res.sendStatus(405);
        });

        // PUT /api/v1/uefa-club-rankings

        app.put(BASE_PATH + "/uefa-club-rankings", (req, res) => {

            res.sendStatus(405);
        });

    }
};

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
            uefaclubrankings.find({}).toArray((err, uefaclubrankingsArray) => {
                if (err)
                    console.log("Error: " + err);
                res.send(uefaclubrankingsArray);
            });
        });


        // POST /api/v1/uefa-club-rankings

        app.post(BASE_PATH + "/uefa-club-rankings", (req, res) => {

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
                    uefaclubrankings.insert(newuefaclubrankings);
                    res.sendStatus(201);
                }

            });

        });


        // DELETE /api/v1/uefa-club-rankings

        app.delete(BASE_PATH + "/uefa-club-rankings", (req, res) => {

            uefaclubrankings.remove({});

            res.sendStatus(200);
        });


        // GET /api/v1/uefa-club-rankings/ESP

        app.get(BASE_PATH + "/uefa-club-rankings/:country", (req, res) => {

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

        // GET /api/v1/uefa-club-rankings/Madrid/2018

        app.get(BASE_PATH + "/uefa-club-rankings/:team/:season", (req, res) => {

            var team = req.params.team;
            var season = req.params.season;

            uefaclubrankings.find({ "team": team, "season": parseInt(season, 10) }).toArray((err, filtereduefaclubrankings) => {
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

            res.sendStatus(409);
        });

        // PUT /api/v1/uefa-club-rankings

        app.put(BASE_PATH + "/uefa-club-rankings", (req, res) => {

            res.sendStatus(409);
        });

    }
};

var BASE_PATH = "/api/v1";

module.exports = {
    register: function(app, uefaCountryRankings) {

        // GET REDIRECT 

        app.get(BASE_PATH + "/uefa-country-rankings/docs", (req, res) => {
            res.redirect("https://documenter.getpostman.com/view/7044495/S17tPSu7");
        });

        // GET /api/v1/uefa-country-rankings/loadInitialData

        app.get(BASE_PATH + "/uefa-country-rankings/loadInitialData", (req, res) => {

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

        app.get(BASE_PATH + "/uefa-country-rankings", (req, res) => {
            uefaCountryRankings.find({}).toArray((err, uefaCountryRankingsArray) => {
                if (err)
                    console.log("Error: " + err);
                res.send(uefaCountryRankingsArray);
            });
        });


        // POST /api/v1/uefa-country-rankings

        app.post(BASE_PATH + "/uefa-country-rankings", (req, res) => {

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

        app.delete(BASE_PATH + "/uefa-country-rankings", (req, res) => {

            uefaCountryRankings.remove({});

            res.sendStatus(200);
        });


        // GET /api/v1/uefa-country-rankings/Spain

        app.get(BASE_PATH + "/uefa-country-rankings/:country", (req, res) => {

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

        app.get(BASE_PATH + "/uefa-country-rankings/:country/:season", (req, res) => {

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

        app.put(BASE_PATH + "/uefa-country-rankings/:country/:season", (req, res) => {

            var country = req.params.country;
            var season = req.params.season;
            var updatedUefaCountry = req.body;

            if (updatedUefaCountry.country != country || updatedUefaCountry.season != season || !updatedUefaCountry.rankingPosition || !updatedUefaCountry.points || !updatedUefaCountry.teams ||
                updatedUefaCountry["country"] == null || updatedUefaCountry["season"] == null || updatedUefaCountry["rankingPosition"] == null || updatedUefaCountry["points"] == null || updatedUefaCountry["teams"] == null) {
                res.sendStatus(400);
                return;
            }

            uefaCountryRankings.find({ "country": country, "season": season }).toArray((err, filteredUefaCountryRankings) => {
                if (err) {
                    console.log("Error: " + err);
                    res.sendStatus(500);
                    return;
                }
                if (filteredUefaCountryRankings.length >= 1) {
                    uefaCountryRankings.update({ "country": updatedUefaCountry.country, "season": updatedUefaCountry.season }, updatedUefaCountry);
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            });

        });



        // DELETE /api/v1/uefa-country-rankings/Spain/17-18

        app.delete(BASE_PATH + "/uefa-country-rankings/:country/:season", (req, res) => {
            var country = req.params.country;
            var season = req.params.season;
            uefaCountryRankings.remove({ "country": country, "season": season });

            res.sendStatus(200);

        });

        // POST /api/v1/uefa-country-rankings/Spain

        app.post(BASE_PATH + "/uefa-country-rankings/:country", (req, res) => {
            res.sendStatus(405);
        });

        // PUT /api/v1/uefa-country-rankings

        app.put(BASE_PATH + "/uefa-country-rankings", (req, res) => {

            res.sendStatus(405);
        });

    }
};

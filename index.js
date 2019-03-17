var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use("/",express.static(__dirname+"/public"));

//Recursos Javier Ezcurra

var uefaclubranking = [];

// GET /api/v1/uefa-club-rankings/loadInitialData

app.get("/api/v1/uefa-club-rankings/loadInitialData", (req,res)=>{
    
    uefaclubranking =  [{
    country: "ESP",
    season: "2018/19",
    points : "146000",
    ptsseason : "19000",
    ptsbeforeseason: "32000",
    team : "Real Madrid"
}, {
    country: "GER",
    season: "2018/19",
    points : "128000",
    ptsseason : "20000",
    ptsbeforeseason: "29000",
    team : "FC Bayern München"
}];

    res.sendStatus(200);
});


// GET /api/v1/uefa-club-rankings

app.get("/api/v1/uefa-club-rankings", (req,res)=>{
    res.send(uefaclubranking);
});


// POST /api/v1/uefa-club-rankings

app.post("/api/v1/uefa-club-rankings", (req,res)=>{
    
    var newuefaclubranking = req.body;
    
    uefaclubranking.push(newuefaclubranking);
    
    res.sendStatus(201);
});


// DELETE /api/v1/uefa-club-rankings

app.delete("/api/v1/uefa-club-rankings", (req,res)=>{
    
    uefaclubranking =  [];

    res.sendStatus(200);
});


// GET /api/v1/uefa-club-rankings/Real Madrid

app.get("/api/v1/uefa-club-rankings:team", (req,res)=>{

    var team = req.params.team;

    var filtereduefaclubranking = uefaclubranking.filter((c) =>{
       return c.team == team; 
    })
    
    if (filtereduefaclubranking.length >= 1){
        res.send(uefaclubranking[0]);
    }else{
        res.sendStatus(404);
    }

});


// PUT /api/v1/uefa-club-rankings/Real Madrid

app.put("/api/v1/uefa-club-rankings:team", (req,res)=>{

    var team = req.params.team;
    var updateduefaclubranking = req.body;
    var found = false;

    var updateduefaclubranking = uefaclubranking.map((c) =>{
    
        if(c.team == team){
            found = true;
            return updateduefaclubranking;
        }else{
            return c;            
        }
 
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        uefaclubsranking = updateduefaclubsranking;
        res.sendStatus(200);
    }

});


// DELETE /api/v1/uefa-club-rankings/Real Madrid

app.delete("/api/v1/uefa-club-rankings:team", (req,res)=>{

    var team = req.params.team;
    var found = false;

    var updateduefaclubranking = uefaclubranking.filter((c) =>{
        
            if(c.team == team)  
                found = true;
        
            return c.team != team;
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        uefaclubranking = updateduefaclubranking;
        res.sendStatus(200);
    }

});

// POST /api/v1/uefa-club-rankings/Real Madrid

app.post("/api/v1/uefa-club-rankings:team", (req,res)=>{

    res.sendStatus(404);
});

// PUT /api/v1/uefa-club-rankings

app.put("/api/v1/uefa-club-rankings", (req,res)=>{

    res.sendStatus(404);
});


app.listen(port,()=>{
    console.log("Magic is happening in port "+port);
});
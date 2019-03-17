var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use("/",express.static(__dirname+"/public"));

//Recursos Javier Ezcurra

var uefaclubsranking = [{
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

// GET /uefaclubsranking/

app.get("/api/v1/uefa-clubs-rankings", (req,res)=>{
    res.send(uefaclubsranking);
});


// POST /uefaclubsranking/

app.post("/api/v1/uefa-clubs-rankings", (req,res)=>{
    
    var newuefaclubsranking = req.body;
    
    uefaclubsranking.push(newuefaclubsranking)
    
    res.sendStatus(201);
});


// DELETE /uefaclubsranking/

app.delete("/api/v1/uefa-clubs-rankings", (req,res)=>{
    
    uefaclubsranking =  [];

    res.sendStatus(200);
});


// GET /uefaclubsranking/Real Madrid

app.get("/api/v1/uefa-clubs-rankings:team", (req,res)=>{

    var team = req.params.team;

    var filtereduefaclubsranking = uefaclubsranking.filter((c) =>{
       return c.team == team; 
    })
    
    if (filtereduefaclubsranking.length >= 1){
        res.send(uefaclubsranking[0]);
    }else{
        res.sendStatus(404);
    }

});


// PUT /uefaclubsranking/Real Madrid

app.put("/api/v1/uefa-clubs-rankings:team", (req,res)=>{

    var team = req.params.team;
    var updateduefaclubsranking = req.body;
    var found = false;

    var updateduefaclubsranking = uefaclubsranking.map((c) =>{
    
        if(c.team == team){
            found = true;
            return updateduefaclubsranking;
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


// DELETE /uefaclubsranking/Real Madrid

app.delete("/api/v1/uefa-clubs-rankings:team", (req,res)=>{

    var team = req.params.team;
    var found = false;

    var updateduefaclubsranking = uefaclubsranking.filter((c) =>{
        
            if(c.team == team)  
                found = true;
        
            return c.team != team;
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        uefaclubsranking = updateduefaclubsranking;
        res.sendStatus(200);
    }

});



app.listen(port,()=>{
    console.log("Magic is happening in port "+port);
});
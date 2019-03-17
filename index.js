var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use("/",express.static(__dirname+"/public"));

//Recursos Javier Ezcurra

var uefaclubrankings = [];

// GET /api/v1/uefa-club-rankings/loadInitialData

app.get("/api/v1/uefa-club-rankings/loadInitialData", (req,res)=>{
    
    uefaclubrankings =  [{
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
    res.send(uefaclubrankings);
});


// POST /api/v1/uefa-club-rankings

app.post("/api/v1/uefa-club-rankings", (req,res)=>{
    
    var newuefaclubrankings = req.body;
    
    uefaclubrankings.push(newuefaclubrankings);
    
    res.sendStatus(201);
});


// DELETE /api/v1/uefa-club-rankings

app.delete("/api/v1/uefa-club-rankings", (req,res)=>{
    
    uefaclubrankings =  [];

    res.sendStatus(200);
});


// GET /api/v1/uefa-club-rankings/ESP

app.get("/api/v1/uefa-club-rankings/:country", (req,res)=>{

    var country = req.params.country;

    var filtereduefaclubrankings = uefaclubrankings.filter((c) =>{
       return c.country == country; 
    })
    
    if (filtereduefaclubrankings.length >= 1){
        res.send(uefaclubrankings[0]);
    }else{
        res.sendStatus(404);
    }

});


// PUT /api/v1/uefa-club-rankings/ESP

app.put("/api/v1/uefa-club-rankings/:country", (req,res)=>{

    var country = req.params.country;
    var updateduefaclubrankings = req.body;
    var found = false;

    var updateduefaclubrankings = uefaclubrankings.map((c) =>{
    
        if(c.country == country){
            found = true;
            return updateduefaclubrankings;
        }else{
            return c;            
        }
 
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        uefaclubrankings = updateduefaclubrankings;
        res.sendStatus(200);
    }

});


// DELETE /api/v1/uefa-club-rankings/ESP

app.delete("/api/v1/uefa-club-rankings/:country", (req,res)=>{

    var country = req.params.team;
    var found = false;

    var updateduefaclubrankings = uefaclubrankings.filter((c) =>{
        
            if(c.country == country)  
                found = true;
        
            return c.country != country;
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        uefaclubrankings = updateduefaclubrankings;
        res.sendStatus(200);
    }

});

// POST /api/v1/uefa-club-rankings/ESP

app.post("/api/v1/uefa-club-rankings/:country", (req,res)=>{

    res.sendStatus(404);
});

// PUT /api/v1/uefa-club-rankings

app.put("/api/v1/uefa-club-rankings", (req,res)=>{

    res.sendStatus(404);
});


app.listen(port,()=>{
    console.log("Magic is happening in port "+port);
});
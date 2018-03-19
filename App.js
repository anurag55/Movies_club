var express=require("express"),
    bodyParser=require("body-parser"),
    request=require("request");

var app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));


app.get("/form",function(req,res){
    res.render("form");
});

app.post("/results",function(req,res){
    var search=req.body.name;

    var link=`http://www.omdbapi.com/?s=${search}&apikey=51793209`;
    request(link,function(error,response,body){
      if(!error&&response.statusCode==200){
        var data=JSON.parse(body);
        //console.log(body);
        res.render("results", {data:data});
      }
    });
});


app.listen(3000,function(){
  console.log("server started");
});

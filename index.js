var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))


mongoose.connect("mongodb+srv://dye123:dye%40123@cluster0.wljotdu.mongodb.net/data?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var db=mongoose.connection;

db.on('error',()=>console.log("Error in connecting to database"));
db.once('open',()=>console.group("Connected to database"));

app.post("/signup",(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var phno=req.body.phno;
    var password=req.body.password;

    var data={
        "name":name,
        "email":email,
        "phno":phno,
        "password":password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted Successfully");
    });

    return res.redirect('signup_success.html')
})

app.get("/",(req,res)=>{
    res.set({
        "ALLow-access-ALLow-Origin":'*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on port 3000");
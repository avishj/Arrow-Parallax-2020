var express=require('express');
var app=express();
var mongoose=require('mongoose');
var passport=require('passport');
var bodyParser=require('body-parser');
var LocalStrategy=require('passport-local');
var passportLocalMongoose=require('passport-local-mongoose');
var User=require('./models/user');
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/auth_demo_app");
app.use(passport.initialize());   
app.use(require('express-session')({
        secret:"maru naam shivam che",
        resave:false,
        saveUninitialized:false

}));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine','ejs');
//=============================================
//                ROUTES
//=============================================

app.get("/secret",isLoggedIn,function(req,res){
    res.render("secret"); 
});

app.get("/",function(req,res){
    res.render("home");
});
// Auth Routes
app.get("/register",function(req,res){
    res.render("register");

});

app.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        else{
                passport.authenticate("local")(req,res,function(){      //change local to facebook
                    res.redirect("/secret");   
                })
        }
    })
});
//LOGIN ROUTES 

app.get("/login",function(req,res){
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect: "/secret",
    failiureRedirect: "/login"  
}),function(req,res){
     
});

app.listen(3000,function(){
    console.log("server is running!!");
});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
} )

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

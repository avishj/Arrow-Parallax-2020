 var express=require('express');
 var mongoose=require('mongoose');
var app=express();
var passport=require('passport');
var LocalStrategy=require('passport-local');
var mongoose=require('mongoose');
var Stock=require('./models/stock');
var User=require('./models/user');
var seedDB=require('./seeds');
app.use(require('express-session')({
    secret:"maru naam shivam che",
    resave:false,
    saveUninitialized:false
}));
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
}); 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


seedDB();
 var Comment=require('./models/comment');
mongoose.connect("mongodb://localhost/stocks");

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.use(express.static("public"))
app.get("/",function(req,res){
    res.render("landing");
}); 

var stocks= [
    {name:"State Bank of India",image:"https://stylewhack.com/wp-content/uploads/2019/09/SBI-Logo-Over-The-Years.png"},
    {name:"ICICI",image:"https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0020/6049/brand.gif?itok=LmM7oeru"},
    {name:"Airtel",image:"https://s3-ap-southeast-1.amazonaws.com/bsy/iportal/images/airtel-logo-white-text-vertical.jpg"},
    {name:"Punjab National Bank",image:"https://pbs.twimg.com/profile_images/1152523435664240640/6msYaXvT_400x400.png"},
    {name:"Transformers and Rectifiersl",image:"https://www.dsij.in/Portals/0/EasyDNNnews/681/Transformers_and_Rectifiers_(India).gif"}

]
app.get("/stocks",function(req,res){
    Stock.find({},function(err,allStocks){
        if(err)
        {
            console.log(err);
        }
        else{
              res.render("stocks/index",{stocks:allStocks,currentUser:req.user});
        }
    })
   

});
app.get("/stocks/new",function(req,res){
    res.render("stocks/new");
    

});
app.post("/stocks",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var newStock={name:name,image:image,description:desc};
    
   Stock.create(newStock,function(err,newlyCreated){
        if(err)
        {
            console.log(err);
        }
        else{
            res.redirect("/stocks");
        }
   }) ;
   
})
app.get("/stocks/:id",function(req,res){
    Stock.findById(req.params.id).populate("comments").exec(function(err,foundStock){
        if(err){
            console.log(err);
        }
        else{
            res.render("stocks/show",{stocks:foundStock});
        }

    });
    
    

});

//===============================
//       COMMENTS ROUTES
//===============================

app.get("/stocks/:id/comments/new",isLoggedIn,function(req,res){
    Stock.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{stock:stock});
        }
    })
  
});

app.post("/stocks/:id/comments",isLoggedIn,function(req,res){
    //lookup campground using ID
    Stock.findById(req.params.id,function(err,stock){
        if(err){
            console.log(err);
            res.redirect("/stocks");
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    stock.comments.push(comment);
                    stock.save();
                    res.redirect("/stocks/"+campground._id);
                }
            });
    
            
}
        
    });
    //create new comment

    
            //connect new comment to campground
           //redirect campground show page
});
    
//     AUTH ROUTES

// show register form

app.get("/register",function(req,res){
    res.render("register"); 
});

app.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
                console.log(err);
               return res.render("register");
        }
        else{
                passport.authenticate("local")(req,res,function(){
                    res.redirect("/stocks");
                });
        }

    });   
});

//Show login form

app.get("/login",function(req,res){
    res.render("login");
});

app.post("/login",passport.authenticate("local",
{successRedirect:"/stocks",
    failureRedirect:"/login"

}),function(req,res){

});

app.get("/logout",function(req,res){
    req.logout();   
    res.redirect("/stocks");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

app.listen(3000,function(){
    console.log("server is running");
});
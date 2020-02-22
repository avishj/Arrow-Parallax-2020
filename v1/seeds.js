var mongoose=require('mongoose');
var Stock=require('./models/stock');
var Comment=require('./models/comment');
var data=[
    {
            name:"SBI",
            image:"https://stylewhack.com/wp-content/uploads/2019/09/SBI-Logo-Over-The-Years.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed porttitor eros. Sed tempor risus quis tellus volutpat lacinia nec quis sem. Aliquam fermentum enim mauris, eu pulvinar felis vulputate in. Sed non ante sed magna ornare fermentum eget vel mi. Donec fringilla orci sed aliquet maximus. Aliquam augue risus, volutpat ac tempus egestas, dictum in lorem. Suspendisse ut massa sagittis lectus luctus egestas id id ipsum. Nam iaculis dui sed massa efficitur vulputate. Curabitur porttitor eros vitae mauris tempus, eu fringilla sem consectetur. Mauris sed neque turpis. Pellentesque tincidunt tristique elementum. Quisque condimentum dolor ullamcorper leo molestie venenatis. Praesent sodales placerat odio, ac tristique magna fermentum et. Sed ac mauris ut risus porta accumsan dapibus et arcu. Duis hendrerit, urna non gravida iaculis, ex dolor euismod neque, sed pulvinar enim elit eu dolor. Aenean sollicitudin nisi id laoreet varius."
    },
    {
        name:"ICICI",
        image:"https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0020/6049/brand.gif?itok=LmM7oeru",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed porttitor eros. Sed tempor risus quis tellus volutpat lacinia nec quis sem. Aliquam fermentum enim mauris, eu pulvinar felis vulputate in. Sed non ante sed magna ornare fermentum eget vel mi. Donec fringilla orci sed aliquet maximus. Aliquam augue risus, volutpat ac tempus egestas, dictum in lorem. Suspendisse ut massa sagittis lectus luctus egestas id id ipsum. Nam iaculis dui sed massa efficitur vulputate. Curabitur porttitor eros vitae mauris tempus, eu fringilla sem consectetur. Mauris sed neque turpis. Pellentesque tincidunt tristique elementum. Quisque condimentum dolor ullamcorper leo molestie venenatis. Praesent sodales placerat odio, ac tristique magna fermentum et. Sed ac mauris ut risus porta accumsan dapibus et arcu. Duis hendrerit, urna non gravida iaculis, ex dolor euismod neque, sed pulvinar enim elit eu dolor. Aenean sollicitudin nisi id laoreet varius."
},
{
    name:"Airtel",
    image:"https://s3-ap-southeast-1.amazonaws.com/bsy/iportal/images/airtel-logo-white-text-vertical.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed porttitor eros. Sed tempor risus quis tellus volutpat lacinia nec quis sem. Aliquam fermentum enim mauris, eu pulvinar felis vulputate in. Sed non ante sed magna ornare fermentum eget vel mi. Donec fringilla orci sed aliquet maximus. Aliquam augue risus, volutpat ac tempus egestas, dictum in lorem. Suspendisse ut massa sagittis lectus luctus egestas id id ipsum. Nam iaculis dui sed massa efficitur vulputate. Curabitur porttitor eros vitae mauris tempus, eu fringilla sem consectetur. Mauris sed neque turpis. Pellentesque tincidunt tristique elementum. Quisque condimentum dolor ullamcorper leo molestie venenatis. Praesent sodales placerat odio, ac tristique magna fermentum et. Sed ac mauris ut risus porta accumsan dapibus et arcu. Duis hendrerit, urna non gravida iaculis, ex dolor euismod neque, sed pulvinar enim elit eu dolor. Aenean sollicitudin nisi id laoreet varius."
}
]
function seedDB(){
    //Remove all Campgrounds
    Stock.remove({},function(err){
        if(err){
            console.log(err);
        }
        else{
        console.log("sell stocks!");
            //Add a few campgrounds  
     
       data.forEach(function(seed){
        Stock.create(seed,function(err,stock){
            if(err){
                console.log(err);
            }
            else{
                console.log("added a stock");
                //add few comments 
                    Comment.create(
                        {text:"Don't Buy this stock!",
                         author:"Homer"
                    },function(err,comment){
                        if(err){
                            console.log(err);
                        }
                        else{
                        stock.comments.push(comment);
                        stock.save();
                        console.log("created new comment")
                    }
                    });
            }

        });
     })
    }
    });
 
     

     

}

module.exports= seedDB;

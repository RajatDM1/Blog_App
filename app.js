var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/blog_rest");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var blogSchema = new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type:Date, dafaut:Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);


// Blog.create({
// 	title : "Test",
// 	image : "https://contentmart.com/blog/wp-content/uploads/2016/09/why-seo-and-content-marketing-must-go-hand-in-hand-and-how-to-make-it-happen.png",
// 	body : "Hello this is a BlogPost"
// });

app.get('/',function(req,res){
	res.redirect('/blogs');
});

app.get('/blogs',function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log(err);
		}
		else{
			res.render("index",{blogs:blogs});
		}
	});
});

app.listen(3000,function(){
	console.log('Server is running');
});
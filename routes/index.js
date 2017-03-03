var express = require('express');
var router = express.Router();
var localStorage = require('localStorage');
var bodyParser = require('body-parser');
var Course = require('../model/course');
var User = require('../model/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(!req.user) {
		//console.log('hi iam stranger');
		res.render('index');
	}
  	else {
  		//console.log('hi iam user');
  		res.render('index', {
  			username: req.user.username
  		})
  	}
});

/* GET error page. */
router.get('/error', function(req, res, next) {
	if(!req.user) {
		//console.log('hi iam stranger');
		res.render('error');
	}
  	else {
  		//console.log('hi iam user');
  		res.render('error', {
  			username: req.user.username
  		})
  	}
});


router.get('/course', function(req,res,next) {
      //console.log('index course');
      var json = JSON.parse(localStorage.getItem('Course'));
<<<<<<< HEAD
      console.log('local Storage' + json.Title);
      res.render('course', {Title : json.Title+'', CH : json.CreditHours+'', DC : json.Description+'', CI : json.CourseId});

=======
      if(!req.user) {
	      res.render('course', {
	      	Title : json.Title+'', 
	      	CH : json.CreditHours+'', 
	      	DC : json.Description+'',
		CI : json.CourseId+ ''
	      });
      } else {
      	  res.render('course', {
	      	Title : json.Title+'', 
	      	CH : json.CreditHours+'', 
	      	DC : json.Description+'',
		CI : json.CourseId+'',
	      	username:req.user.username
	      });
      }
>>>>>>> 21d9b95a2f797b49f203af6ea047c3a50c812bc4
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/users/login');
	}
}

/* Search courses */
router.post('/', function(req, res, next){
	console.log('search course');
	//console.log(req.body.coursename);
	Course.searchCourse(req.body.coursename, function(err, course) {
		if (err) {
			res.redirect('/error');
		}
		else {
			localStorage.setItem('Course',JSON.stringify(course));
			res.redirect('/course');
		}

	});
});

module.exports = router;

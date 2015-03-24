module.exports = function(app){

	app.get('/about', function(req, res){
		res.render('about');
	})

	app.get('/help', function(req, res){
		res.render('help');
	})

	app.get('/terms-of-service', function(req, res){
		res.render('terms-of-service');
	})

	app.get('/privacy-policy', function(req, res){
		res.render('privacy-policy');
	})
	
	// chat room
	app.get('/:id', function(req, res){
		var roomID = req.params.id.toLowerCase();
		res.render('pad', { id: roomID });
	});

	// home page
	app.get('/', function(req, res) {
	  res.render('index', {});
	});

}


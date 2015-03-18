module.exports = function(app){
	
	// code pad
	app.get('/:id', function(req, res){
		var roomID = req.params.id.toLowerCase();
		res.render('pad', { id: roomID });
	});

	// home page
	app.get('/', function(req, res) {
	  res.render('index', {});
	});

}


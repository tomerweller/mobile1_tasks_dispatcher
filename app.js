var express = require('express')
	, app = express()
	, port = process.env.PORT || 5000;

app.get('/random_task', function(req, res){
  var o = {a: "a", b: "b"}
  res.send(o);
});

app.listen(port);
console.log('Listening on port', port);
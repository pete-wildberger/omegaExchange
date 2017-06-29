var express = require('express');
var app =express();
var path= require('path');


app.use(express.static('public'));

var port = 3000;

app.listen(port, function(){
});

app.get('/', function(req, res){
res.sendFile(path.resolve('public/views/index.html'));
});

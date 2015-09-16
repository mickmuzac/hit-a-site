var fs = require('fs');
var request = require('request');
var arr;

var reqIndex = 0;
var batchSize = 7;
var restrictTo = "adlnet.gov";

fs.readFile('sites.csv', function(err, file){
	arr = file.toString().split(',');
	fireRequestBatch();
});

function fireRequestBatch(){
	for(var iter = 0; iter < batchSize - 1 && reqIndex < arr.length; reqIndex++){
		if(!restrictTo || arr[reqIndex].indexOf(restrictTo) > -1){
			hitSite(reqIndex);
			iter++;
		}
	}

	if(reqIndex < arr.length) setTimeout(fireRequestBatch, 5000);
}

function hitSite(i){
	var url = arr[i];

	if(url.indexOf("://") == -1){
		url = "http://" + url;
	}

	request(url, function(err, response, body){
		if(!err) console.log(url, response.statusCode);
	});
}

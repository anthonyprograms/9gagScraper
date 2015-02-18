var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs'),
	site = "http://www.9gag.com",
	urls = [];

request(site, function(err, resp, body){
	if(!err && resp.statusCode == 200){
		var $ = cheerio.load(body);

		$('img.badge-item-img', '.main-wrap').each(function(){
			var url = $(this).attr('src');
			urls.push(url);
		});

		console.log(urls);
		for (var i = 0; i < urls.length; i++){
			request(urls[i]).pipe(fs.createWriteStream('img/' + i + '.jpg'));
		}
	}
});
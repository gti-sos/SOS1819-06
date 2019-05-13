exports.config = {
	seleniumAddress: 'http://localhost:8080/wd/hub',
	chromeOnly: true,
	specs: [
		'TC01-loadDatauefacountry.js',
		'TC04-loadDatatransferstats.js',
		'TC07-loadDatauefaclub.js'
	]

};
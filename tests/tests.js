exports.config = {
	seleniumAddress: 'http://localhost:9515/wd/hub',
	chromeOnly: true,
	specs: [
		'TC01-loadDatauefacountry.js',
		'TC01-loadDatatransferstats.js',
		'TC01-loadDatauefaclub.js'
	]

};
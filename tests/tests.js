exports.config = {
	seleniumAddress: 'http://localhost:2222/wd/hub',
	chromeOnly: true,
	specs: [
		'TC01-loadDatauefacountry.js',
		'TC02-createDatauefacountry.js',
		'TC03-removeDatauefacountry.js',
		'TC04-loadDatatransferstats.js',
		'TC05-createDatatransferstats.js',
		'TC06-removeDatatransferstats.js',
		'TC07-loadDatauefaclub.js',
		'TC08-createDatauefaclub.js',
		'TC09-removeDatauefaclub.js'
	]

};
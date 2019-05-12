describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('http://localhost:8080');
		var transferstats= element.all(by.repeater('transferstat in transferstats'));
		expect(transferstats.count()).toBeGreaterThan(0);
	});
});
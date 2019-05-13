describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('http://localhost:8080/#!/uefa-country-rankings');
		var uefacountries= element.all(by.repeater('uefacountry in uefacountries'));
		expect(uefacountries.count()).toBeGreaterThan(0);
	});
});
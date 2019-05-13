describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('http://localhost:8080/#!/uefa-club-rankings');
		var uefaclubs= element.all(by.repeater('uefaclub in uefaclubrankings'));
		expect(uefaclubs.count()).toBeGreaterThan(0);
	});
});
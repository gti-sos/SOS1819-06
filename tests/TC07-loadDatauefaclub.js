describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('http://localhost:8080');
		var uefaclubs= element.all(by.repeater('uefaclub in uefaclubrankigs'));
		expect(uefaclub.count()).toBeGreaterThan(0);
	});
});
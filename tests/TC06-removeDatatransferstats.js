describe('Data are removed', function() {
  it('should remove all the registers of the database', function() {
    browser.get('http://localhost:8080');
    

    element(by.id('remove')).click();

    var transferstats= element.all(by.repeater('transferstat in transferstats'));
	var n = transferstats.count();
	
	expect(n).toBeEqual(0);
  });
});
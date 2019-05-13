describe('Data is created', function() {
  it('should add one register to the database', function() {
    browser.get('http://localhost:8080');
    
    var transferstats= element.all(by.repeater('transferstat in transferstats'));
	var n = transferstats.count();
		
    element(by.model('newTransferStat.country')).sendKeys("a");
    element(by.model('newTransferStat.team')).sendKeys("a");
    element(by.model('newTransferStat.season')).sendKeys(1);
    element(by.model('newTransferStat.moneyentered')).sendKeys(1);
    element(by.model('newTransferStat.moneyspent')).sendKeys(1);
    element(by.model('newTransferStat.numberoffarewells')).sendKeys(1);
    element(by.model('newTransferStat.numberofsignings')).sendKeys(1);



    element(by.id('add')).click();

    var transferstats2= element.all(by.repeater('transferstat in transferstats'));
	var m = transferstats2.count();
	
	expect(m-n).toBeEqual(1);
  });
});
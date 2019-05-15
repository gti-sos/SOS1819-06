describe("Check if a new transferstat can be created",function () {
    it("List should grow after the transferstat creation", function (){
        browser.get("http://localhost:8080/#!/transfer-stats");
        element
            .all(by.repeater("transferstat in transferstats"))
            .then( function (initialStats) {
                
                element(by.model('newTransferStat.country')).sendKeys('zzz');
                element(by.model('newTransferStat.team')).sendKeys('zzz');
                element(by.model('newTransferStat.season')).sendKeys(2018);
                element(by.model('newTransferStat.moneyspent')).sendKeys(1);
                element(by.model('newTransferStat.moneyentered')).sendKeys(1);
                element(by.model('newTransferStat.numberofsignings')).sendKeys(1);
                element(by.model('newTransferStat.numberoffarewells')).sendKeys(1);

                element(by.css('[value="addStat"]')).click();
                browser.sleep(1000).then(function(){
                
                element
                    .all(by.repeater("transferstat in transferstats"))
                    .then( function (finalStats) {
                        expect(finalStats.length).toEqual(initialStats.length+1);
                    })});
            });
    });
});
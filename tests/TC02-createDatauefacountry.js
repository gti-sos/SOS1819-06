describe("Check if a new uefa country can be created",function () {
    it("List should grow after the uefa country creation", function (){
        browser.get("http://localhost:8080/#!/uefa-country-rankings");
        element
            .all(by.repeater("uefacountry in uefacountries"))
            .then( function (initialCountry) {
                
                element(by.model('newUefaCountry.country')).sendKeys('Ukranie');
                element(by.model('newUefaCountry.season')).sendKeys(2016);
                element(by.model('newUefaCountry.rankingPosition')).sendKeys(20);
                element(by.model('newUefaCountry.points')).sendKeys(12342);
                element(by.model('newUefaCountry.teams')).sendKeys(3);
                
                element(by.css('[value="addCountry"]')).click().then(function(){
                
                element
                    .all(by.repeater("uefacountry in uefacountries"))
                    .then( function (finalCountry) {
                        expect(finalCountry.length).toEqual(initialCountry.length+1);
                    })});
            });
    });
});
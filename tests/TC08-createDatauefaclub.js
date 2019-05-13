describe("Check if a new uefa club can be created",function () {
    it("List should grow after the uefa club creation", function (){
        browser.get("http://localhost:8080/#!/uefa-club-rankings");
        element
            .all(by.repeater("uefaclub in uefaclubrankings"))
            .then( function (initialClub) {
                
                element(by.model('newUefaClub.team')).sendKeys('Malaga');
                element(by.model('newUefaClub.season')).sendKeys(2017);
                element(by.model('newUefaClub.country')).sendKeys('ESP');
                element(by.model('newUefaClub.points')).sendKeys(1111);
                element(by.model('newUefaClub.ptsseason')).sendKeys(1000);
                element(by.model('newUefaClub.ptsbeforeseason')).sendKeys(15000);
                
                element(by.css('[value="addClub"]')).click().then(function(){
                
                element
                    .all(by.repeater("uefaclub in uefaclubrankings"))
                    .then( function (finalClub) {
                        expect(finalClub.length).toEqual(initialClub.length+1);
                    })});
            });
    });
});
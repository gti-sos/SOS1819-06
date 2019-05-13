describe("Check if a transfer stat can be deleted", function() {
    it("List decrease after the stat deletion", function() {
        browser.get("http://localhost:8080/#!/transfer-stats");
        var initialCountry = element.all(by.repeater("transferstat in transferstats"))
            .then(function(initialStat) {
                element.all(by.css('[value="deleteStat"]')).last().click().then(function(){

                element.all(by.repeater("transferstat in transferstats"))
                    .then(function(finalStat) {
                        expect(finalStat.length).toEqual(initialStat.length - 1);
                    });
            })});
    });
});
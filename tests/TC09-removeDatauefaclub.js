describe("Check if a club can be deleted", function() {
    it("List decrease after the club deletion", function() {
        browser.get("http://localhost:8080/#!/uefa-club-rankings");
        var initialClub = element.all(by.repeater("uefaclub in uefaclubrankings"))
            .then(function(initialClub) {
                element.all(by.css('[value="deleteClub"]')).last().click();
                browser.sleep(1000).then(function(){

                element.all(by.repeater("uefaclub in uefaclubrankings"))
                    .then(function(finalClub) {
                        expect(finalClub.length).toEqual(initialClub.length - 1);
                    });
            })});
    });
});
    
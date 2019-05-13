describe("Check if a country can be deleted", function() {
    it("List decrease after the country deletion", function() {
        browser.get("http://localhost:8080/#!/uefa-country-rankings");
        var initialCountry = element.all(by.repeater("uefacountry in uefacountries"))
            .then(function(initialCountry) {
                element.all(by.css('[value="deleteCountry"]')).last().click().then(function(){

                element.all(by.repeater("uefacountry in uefacountries"))
                    .then(function(finalCountry) {
                        expect(finalCountry.length).toEqual(initialCountry.length - 1);
                    });
            })});
    });
});
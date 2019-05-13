describe("Check if a new transferstat can be created",function () {
    it("List should grow after the transferstat creation", function (){
        browser.get("http://localhost:8080/#!/uefa-transfer-stat");
        element
            .all(by.repeater("transferstat in transferstats"))
            .then( function (initialContacts) {
                
                element(by.model('newContact.name')).sendKeys('pepe');
                element(by.model('newContact.phone')).sendKeys('1111');
                
                element(by.css('[value="add"]')).click();
                
                element
                    .all(by.repeater("contact in contacts"))
                    .then( function (finalContacts) {
                        expect(finalContacts.length).toEqual(initialContacts.length+1);
                    });
            });
    });
});
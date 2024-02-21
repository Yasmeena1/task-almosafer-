Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
describe('', () => {
    it.skip('to check the language,currency and contact', () => {

        cy.visit("https://global.almosafer.com/en")
        //to check the languge 
        cy.get('[data-testid="Header__LanguageSwitch"]').should("contain", "العربية")
        // to check the currency 
        cy.get('[data-testid="Header__CurrencySelector"]').should("contain", "SAR")
        // to check the contact 
        cy.get('.sc-hUfwpO').should("contain", "+966554400000")

    });
    it.skip('verfiy "world travel award 2023 logo" is desplay', () => {
        cy.visit("https://global.almosafer.com/en")
        cy.get('.sc-kNBZmU').should("be.visible")

    });
    it.skip('to check the hotel tab is not selected by default', () => {
        cy.visit("https://global.almosafer.com/en")
        cy.get('#uncontrolled-tab-example-tab-hotels').should("have.attr", "aria-selected").and("contain", "false")
    });
    it.skip('flight departure  and return ', () => {
        cy.visit("https://global.almosafer.com/en")
        const currentdate = new Date()
        const day = currentdate.getDate()
        const expectedfordeparture = day + 1
        cy.get('div[data-testid="FlightSearchBox__FromDateButton"]').should("contain", expectedfordeparture)

        const expectedforreturn = day + 2
        cy.get('[data-testid="FlightSearchBox__ToDateButton"]').should("contain", expectedforreturn)
    });
    it.skip('change the language sometime keep "EN", sometime change to the "AR"', () => {
        const website = ["https://global.almosafer.com/en", "https://global.almosafer.com/ar"]
        const randomwesite = Math.floor(Math.random() * website.length)
        cy.visit(website[randomwesite])

        cy.url().then((url) => {

            if (url.includes("en")) {
                cy.get('[data-testid="Header__LanguageSwitch"]').should("contain", "العربية")
            } else if (url.includes("ar")) {
                cy.get('[data-testid="Header__LanguageSwitch"]').should("contain", "English")
            }

        })
    });
    it.skip('switch to hotel tab and type random value', () => {

        const website = ["https://global.almosafer.com/en", "https://global.almosafer.com/ar"]
        const randomwesite = Math.floor(Math.random() * website.length)
        cy.visit(website[randomwesite])

        const englishcities = ["dubai", "jeddah", "riyadh"]
        const randomenglishcities = Math.floor(Math.random() * englishcities.length)

        const arabiccities = ["دبي", "جده"]
        const randomarabiccities = Math.floor(Math.random() * arabiccities.length)


        cy.url().then((url) => {

            if (url.includes("en")) {
                cy.get('#uncontrolled-tab-example-tab-hotels').click()

                cy.get('[data-testid="AutoCompleteInput"]').type(englishcities[randomenglishcities])
                cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()


            } else if (url.includes("ar")) {
                cy.get('#uncontrolled-tab-example-tab-hotels').click()

                cy.get('[data-testid="AutoCompleteInput"]').type(arabiccities[randomarabiccities])
                cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()
            }
        })
    });
    it.skip('randomly select rooms', () => {
        const value = ["A", "B"]
        const randomvalue = Math.floor(Math.random() * value.length)

        cy.visit("https://global.almosafer.com/en")
        cy.get('#uncontrolled-tab-example-tab-hotels').click()
        cy.get('[data-testid="AutoCompleteInput"]').type("dubai")
        cy.get('[data-testid="HotelSearchBox__ReservationSelect_Select"]').select(value[randomvalue])
        cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()

    });
    it.skip('some assertion', () => {
        cy.visit("https://global.almosafer.com/en")
        cy.get('#uncontrolled-tab-example-tab-hotels').click()
        cy.get('[data-testid="AutoCompleteInput"]').type("amman")
        cy.get('[data-testid="HotelSearchBox__ReservationSelect_Select"]').select("B")
        cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()
        cy.get('[data-testid="HotelSearchResult__resultsFoundCount"]', {
            timeout: 10000
        }).should("exist").should("be.visible").should("contain", "found")

    });
    it('sorting option by "lowest price"', () => {
        cy.visit("https://global.almosafer.com/en")

        let prices = []
        let lowerprice, highestprice;

        cy.get('#uncontrolled-tab-example-tab-hotels').click()
        cy.get('[data-testid="AutoCompleteInput"]').type("jeddah")
        cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()

        cy.wait(6000)
        cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click()
        cy.get('.Price__Value').each((ele) => {
                prices.push(parseInt(ele.text()))
            })
            .then(() => {
                lowerprice = prices[0]
                highestprice = prices[prices.length - 1]
                expect(highestprice).to.be.greaterThan(lowerprice)

            })



    });
});
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{

        // Add test steps for filling in only mandatory fields
        cy.get('#username').type('Sergei123')
        cy.get('#email').type('sergei@mail.com')
        cy.get('[data-cy="name"]').type('Sergei')
        cy.get('#lastName').type('Bobolev')
        cy.get('[data-testid="phoneNumberTestId"]').type('4958732098987')

        // Type confirmation password which is different from first password
        cy.get('#password').type('password_password')
        cy.get('#confirm').type('pswrd')
        cy.get('h2').contains('Password').click()
        
        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that error message is visible
        cy.get('#password_error_message').should('be.visible')
        cy.get('p').contains('NB! Passwords should match')


        //Change the test so, that now there are the same values in the password and confirmation password input fields.
        cy.get('#confirm').type('pswrd').clear().type('password_password')
        cy.get('h2').contains('Password').click()
        cy.get('#username').click()

        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
    })
    
    it('User can submit form with all fields added', ()=>{

        // Add test steps for filling in ALL fields
        cy.get('#username').type('123Sergei123')
        cy.get('#email').type('sergei@mail.com')
        cy.get('[data-cy="name"]').type('Sergei')
        cy.get('#lastName').type('Bobolev')
        cy.get('[data-testid="phoneNumberTestId"]').type('4958732098987')

        // Assert that submit button is enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that after submitting the form system show successful message
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message
        // example, how to use function
        inputValidData('SergeiB')
        cy.get('#email').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible')
    })

    // Add at least 1 test for checking some mandatory field's absence

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178).and('be.greaterThan', 100)   
    })

    it('My test for second picture', () => {

        cy.log('Will check logo source and size')
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo.png')
        // get element and check its parameter height, to less than 89 and greater than 86
        cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 90)
            .and('be.greaterThan', 87)   
        cy.get('img[data-cy="cypress_logo"]').invoke('width').should('be.lessThan', 125)
            .and('be.greaterThan', 110)  
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking the second link 

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes
    it('Check that the list of checkboxes is correct', ()=>{
        cy.get('input[type=checkbox]').should('have.length', 3)

        cy.get('input[type=checkbox]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type=checkbox]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type=checkbox]').next().eq(2).should('have.text', 'I have a boat')

        cy.get('input[type=checkbox]').eq(0).should('not.be.checked')
        cy.get('input[type=checkbox]').eq(1).should('not.be.checked')
        cy.get('input[type=checkbox]').eq(2).should('not.be.checked')

        cy.get('input[type=checkbox]').eq(0).check().should('be.checked')
        cy.get('input[type=checkbox]').eq(1).check().should('be.checked')
        cy.get('input[type=checkbox]').eq(2).check().should('be.checked')
        cy.get('input[type=checkbox]').eq(0).should('be.checked')
        cy.get('input[type=checkbox]').eq(1).should('be.checked')
        cy.get('input[type=checkbox]').eq(2).should('be.checked')


    })

    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


    // Create test similar to previous one

    it('Favorit animal dropdown is correct', ()=>{
        cy.get('#animal').select(1).screenshot('Animals drop-down')
        cy.screenshot('Full page screenshot')

        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)

        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')

        cy.get('#animal').find('option').then(options =>{
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })
    })

})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('Sergei')
    cy.get('#lastName').type('Bobolev')
    cy.get('[data-testid="phoneNumberTestId"]').type('4958732098987')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('password_password')
    cy.get('#confirm').type('password_password')
    cy.get('h2').contains('Password').click()
}
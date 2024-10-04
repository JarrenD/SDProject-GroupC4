describe('Sign up flow', () => {
    beforeEach(() => {
        cy.visit('/signup');
    });
    it('should load the signup page', () => {
        cy.contains('Sign Up').should('be.visible');
    });

    it('should sign up successfully if all credentials are corrected', () => {
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alertStub');
        });
        const uniqueEmail = `${Date.now()}@example.com`;
        cy.get('input[id="username"]').type('testUserDate');
        cy.get('input[id="email"]').type(uniqueEmail);
        cy.get('input[id="password"]').type('testUserPassword');
        cy.get('button[type="submit"]').click();
        cy.get('@alertStub').should('be.calledWith', 'SignUp Successful!');
        cy.url().should('include', '/LogIn');
    });

    it('should alert that email is taken', () => {
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alertStub');
        });
        const uniqueEmail = `${Date.now()}@example.com`;
        cy.get('input[id="username"]').type('testUser2');
        cy.get('input[id="email"]').type('testUser2@gmail.com');
        cy.get('input[id="password"]').type('testUser2Password');
        cy.get('button[type="submit"]').click();
        cy.get('@alertStub').should('be.calledWith', 'email is already registered. Please LogIn or try again.');
    });



});
describe('Log out', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input[type="email"]').type('testUser1@gmail.com');
        cy.get('input[type="password"]').type('testUser1Password');
        cy.get('button[type="submit"]').click();
    });

    it('log out the user', () => {
        cy.contains('Logout').click();
        cy.contains('Yes').click();
        cy.url().should('include', 'login');
    });

    it('clicked no button when logging out', () => {
        cy.contains('Logout').click();
        cy.contains('button', 'No').click();
        cy.url().should('include', 'dashboard');
    });
});
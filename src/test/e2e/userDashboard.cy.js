describe('User Dashboard', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input[type="email"]').type('testUser1@gmail.com');
        cy.get('input[type="password"]').type('testUser1Password');
        cy.get('button[type="submit"]').click();
    });

    it('should display the dashboard layout with sidebar, navbar and content', () => {
        // check if the sidebar is visible
        cy.get('.sidebar').should('be.visible');

        // check if the main content is visible
        cy.get('.main-content').should('be.visible');
    });

    it('should allow navigation through the sidebar', () => {
        cy.get('.sidebar').contains('Notifications').click();
        cy.url().should('include', '/notification-centre');

        cy.get('.sidebar').contains('Emergency Contacts').click();
        cy.url().should('include', '/emergency-contacts');

        cy.get('.sidebar').contains('Campus Resources').click();
        cy.url().should('include', 'safety-resources');

        cy.get('.sidebar').contains('Incident Reports').click();
        cy.url().should('include', 'incident-reporting');
    });
});
describe("Notification Center", () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input[type="email"]').type('testUser1@gmail.com');
        cy.get('input[type="password"]').type('testUser1Password');
        cy.get('button[type="submit"]').click();
        cy.get('.sidebar').should('be.visible'); 
        cy.get('.sidebar').contains('Notifications').click();
    });

    it('displays the header and notification center title', () => {
        // cy.contains('Notifications').should('be.visible');
        cy.contains('NOTIFICATION CENTER').should('be.visible');
    });
    
    it('renders inbox tab and filters messages by category', () => {
        // Simulate a click on the Inbox tab
        cy.get('.tab').contains('Inbox').click();
        
        // Check if the inbox content area is visible
        cy.get('#inbox-content').should('be.visible');
    
        // Check for the category dropdown and select 'All'
        cy.get('#category-select').select('All');

        // Check for messages displayed when 'All' is selected
        cy.get('.inbox-message').should('exist'); // Check if messages exist
        cy.get('.inbox-message').should('have.length.greaterThan', 0); // Ensure there are messages
    });
    

});

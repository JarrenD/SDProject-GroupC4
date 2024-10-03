// cypress/e2e/emergencyContacts.spec.js
describe('Emergency Contacts', () => {
    beforeEach(() => {
    cy.visit('/login');
    cy.get('input[type="email"]').type('testUser1@gmail.com');
    cy.get('input[type="password"]').type('testUser1Password');
    cy.get('button[type="submit"]').click();
      // Set up a mock API endpoint to return dummy contacts
    cy.get('.sidebar').contains("Emergency Contacts").click();
    });
  
    it('should display loading message initially', () => {
      // Check if the loading message is displayed initially
      cy.get('div').contains('Loading...').should('be.visible');
    });
  
    it('should display contacts after loading', () => {
      cy.get('h2').contains("Emergency Contacts");
    });
  
    it('should display an error message if fetching contacts fails', () => {
      // Mock the API to return an error response
      cy.intercept('GET', '/api/contacts', {
        statusCode: 500,
        body: { error: 'Failed to fetch contacts' },
      }).as('getContactsError');
  
      // Visit the page again
      cy.visit('/emergency-contacts');
  
      // Wait for the API call
      cy.wait('@getContactsError');
  
      // Check if the error message is displayed
      cy.get('div').contains('Error: Failed to fetch contacts').should('be.visible');
    });
  });
  
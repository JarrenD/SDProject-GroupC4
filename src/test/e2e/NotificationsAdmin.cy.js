describe('Admin Notifications Page', () => {
    beforeEach(() => {
        cy.visit('/admin-login');
        cy.get('input[type="email"]').type('admin@wits.com');
        cy.get('input[type="password"]').type('pass');
        cy.get('button[type="submit"]').click();
        cy.contains('Notifications').click();
    });
  
    it('should allow the user to send a notification', () => {
      // Fill in the notification type
      cy.get('select#title').select('Emergency Alert');
  
      // Fill in the message
      cy.get('textarea#message').type('This is a test emergency alert message.');
  
      // Fill in the recipient type
      cy.get('select#recipientType').select('all');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Assert that the success toast notification appears
      cy.get('div').contains('Notification sent successfully!').should('be.visible');
  
      // Optionally, you can also check if the form inputs are cleared after submission
      cy.get('select#title').should('have.value', '');
      cy.get('textarea#message').should('have.value', '');
      cy.get('select#recipientType').should('have.value', 'all');
    });
  });
  
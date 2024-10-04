describe('IncidentAlert Component', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input[type="email"]').type('testUser1@gmail.com');
        cy.get('input[type="password"]').type('testUser1Password');
        cy.get('button[type="submit"]').click();
        cy.contains("Report Now").click();
  
    });
  
    it('should display the incident alert form', () => {
      // Check that the form is visible and contains the necessary inputs
      cy.get('h2').contains('Report an Incident');
      cy.get('select#incidentType').should('exist');
      cy.get('textarea#incidentDescription').should('exist');
      cy.get('input#uploadPhoto').should('exist');
      cy.get('button.submit-button').should('exist');
    });

    it('should submit an incident with photo', () => {
        // Mock Firebase Storage and Database APIs
        cy.intercept('POST', '**/incident_photos/**', {
          statusCode: 200,
          body: { downloadURL: 'https://mock-download-url.com/photo.jpg' }
        }).as('uploadPhoto');
    
        cy.intercept('POST', '**/Incident_Alerts/**', {
          statusCode: 200,
          body: { success: true }
        }).as('saveIncidentData');
    
        // Select incident type
        cy.get('select#incidentType').select('Theft');
        // Type a description
        cy.get('textarea#incidentDescription').type('Test description of the theft incident.');
        // Upload a mock photo file
        cy.get('input#uploadPhoto').selectFile('cypress/fixtures/test-photo.jpg');
    
        // Submit the form
        cy.get('button.submit-button').click();
    
        // Check for loading state
        cy.get('.loading-indicator').should('contain', 'Submitting your incident, please wait...');
    
        // Ensure the success message is displayed
        cy.on('window:alert', (text) => {
          expect(text).to.contains('Incident reported successfully!');
        });
      });

      it('should show error when no photo is uploaded', () => {
        // Select incident type
        cy.get('select#incidentType').select('Theft');
        // Type a description
        cy.get('textarea#incidentDescription').type('Test description of the theft incident.');
    
        // Submit the form without uploading a photo
        cy.get('button.submit-button').click();
    
        // Expect an error alert for missing photo
        cy.on('window:alert', (text) => {
          expect(text).to.contains('Please upload a photo.');
        });
      });
  
    
  });
  
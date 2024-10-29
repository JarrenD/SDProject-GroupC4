describe("Incident Alert for admins", () => {
    beforeEach(() => {
        cy.visit('/admin-login');
        cy.get('input[type="email"]').type('admin@wits.com');
        cy.get('input[type="password"]').type('pass');
        cy.get('button[type="submit"]').click();
        cy.contains('Incident Management').click();

        cy.intercept('GET', '/api/incidents', {
            statusCode: 200,
            body: [
              {
                id: '1',
                type: 'Fire',
                description: 'Fire incident at the park.',
                photoURL: 'https://example.com/photo1.jpg',
                timestamp: '2024-10-01T10:00:00Z',
              },
              {
                id: '2',
                type: 'Flood',
                description: 'Flooding in the downtown area.',
                photoURL: 'https://example.com/photo2.jpg',
                timestamp: '2024-10-02T12:00:00Z',
              },
            ],
          }).as('getIncidents');
    });

    it('displays loading indicator initially', () => {
      cy.get('.loading').should('contain', 'Loading...');
    });
  
    it('displays incidents data correctly after loading', () => {
      // Wait for the incidents API call
      cy.wait('@getIncidents');
  
      // Check that the table header and sample data are rendered correctly
      cy.get('table.incident-table').should('be.visible');
      cy.get('table.incident-table thead').within(() => {
        cy.contains('Incident Type');
        cy.contains('Description');
        cy.contains('Photo');
        cy.contains('Timestamp');
      });
  
      cy.get('table.incident-table tbody tr').should('have.length', 2); // Adjust based on your mock data
      cy.get('table.incident-table tbody tr').first().within(() => {
        cy.contains('Fire'); // Check sample data, update based on your mock data
        cy.contains('Fire incident at the park.');
      });
    });
  
    it('displays error message if API fails', () => {
      // Simulate a failed request
      cy.intercept('GET', '/api/incidents', {
        statusCode: 500,
        body: {},
      }).as('getIncidentsError');
  
      cy.reload(); // Reload the page to trigger the failed request
      cy.wait('@getIncidentsError');
  
      cy.get('.error').should('contain', 'Error fetching incidents');
    });
      
});
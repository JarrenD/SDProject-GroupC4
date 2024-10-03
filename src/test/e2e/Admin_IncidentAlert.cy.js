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
          }).as('fetchIncidents');
    });

    it('should show the incident reports in detail', () => {
        cy.get('h1').contains('Recent Incident Reports');

        cy.wait('@fetchIncidents');

        // Check if the loading message is gone
        cy.get('.loading').should('not.exist');

        // Check if the incidents are displayed correctly
        cy.get('.incident-table tbody tr').should('have.length', 2);
        cy.get('.incident-table tbody tr').first().within(() => {
            cy.get('td').eq(0).should('contain', 'Fire'); // Incident Type
            cy.get('td').eq(1).should('contain', 'Fire incident at the park.'); // Description
            cy.get('td img').should('have.attr', 'src', 'https://example.com/photo1.jpg'); // Photo
            cy.get('td').eq(3).should('contain', new Date("2024-10-01T10:00:00Z").toLocaleString()); // Timestamp
        });
    });

    it('displays error message on failed fetch', () => {
        // Intercept the API call to simulate an error response
        cy.intercept('GET', '/api/incidents', {
          statusCode: 500,
          body: { message: 'Internal Server Error' },
        }).as('fetchIncidentsError');
      
        cy.wait('@fetchIncidentsError');

        // Check if the error message is displayed
        cy.get('.error').should('contain', 'Error fetching incidents: Failed to fetch incidents');
      });
      
});
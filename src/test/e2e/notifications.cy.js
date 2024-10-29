describe("Notification Center", () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/incidents', { fixture: 'admin-incident.json' });
        cy.intercept('GET', 'https://virtserver.swaggerhub.com/WendyMaboa/GPSTracking/1.0.0/routes', { fixture: 'routes.json' });
        cy.intercept('https://maps.googleapis.com/maps/api/geocode/json*', { fixture: 'geocode.json' });
        cy.visit('/login');
        cy.get('input[type="email"]').type('testUser1@gmail.com');
        cy.get('input[type="password"]').type('testUser1Password');
        cy.get('button[type="submit"]').click();
        cy.get('.sidebar').should('be.visible'); 
        cy.get('.sidebar').contains('Notifications').click();
        
    });

    it('displays Inbox, Announcements, and Alerts correctly', () => {
        cy.contains('Notifications');
        cy.contains('NOTIFICATION CENTER');
        
        cy.get('.tab').contains('Inbox').click();
        cy.contains('Available Routes').should('be.visible');
    
        cy.get('.tab').contains('Announcements').click();
        cy.contains('Yale Road is closed please use other entrances').should('exist');
      });
    
      it('displays notifications with correct data', () => {
        cy.get('.inbox-message').first().within(() => {
          cy.contains('New route available: Route 1');
        });
      });
    
      it('fetches and displays route data correctly', () => {
        cy.get('.tab').contains('Inbox').click();
        cy.get('.inbox-message').contains('Route 1');
      });
    

});

describe('LocationSharingComponent E2E testing', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input[type="email"]').type('testUser1@gmail.com');
        cy.get('input[type="password"]').type('testUser1Password');
        cy.get('button[type="submit"]').click();
        cy.contains("Alert Campus Security").click();
    });

    it('should share user location and display the status', () => {
        cy.window().then((win) => {
            cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((success) => {
              return success({
                coords: {
                  latitude: 12.34,
                  longitude: 56.78
                }
              });
            });
        });

        cy.get('button').contains("Share My Location").click();

        cy.contains("Sharing location...");

        cy.contains('Latitude: 12.34');
        cy.contains('Longitude: 56.78');
        cy.contains('Location shared successfully.');

    });

});
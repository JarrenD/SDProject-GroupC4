describe('Campus Resources', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input[type="email"]').type('testUser1@gmail.com');
        cy.get('input[type="password"]').type('testUser1Password');
        cy.get('button[type="submit"]').click();
        cy.get('.sidebar').contains("Campus Resources").click();
    });

    it('should contain campus safety tips', () => {
        cy.get('h2').contains("Safety Tips");
        cy.contains("Campus Safety Policies").click();
        cy.get('h2').contains("Campus Safety Policies");
    });
})
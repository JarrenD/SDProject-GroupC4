describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should load the login page', () => {
    cy.contains('Login').should('be.visible');
  });

  it('should display error for invalid login', () => {
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });
    cy.get('input[type="email"]').type('invalid-email@test.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.get('@alertStub').should('be.calledWith', 'No account found with this email or the password is wrong. Please sign up first.');
   
  });

  it('should direct to sign up page', () => {
    cy.get('a[href="/signup"]').click();
    cy.url().should('include', '/signup');
  });

  it('should alert password is invalid', () => {
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });
    cy.get('input[type="email"]').type('testUser2@gmail.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.get('@alertStub').should('be.calledWith', 'No account found with this email or the password is wrong. Please sign up first.');
  });

  it('if correct credential is provided, should show login successfully', () => {
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });
    cy.get('input[type="email"]').type('testUser1@gmail.com');
    cy.get('input[type="password"]').type('testUser1Password');
    cy.get('button[type="submit"]').click();
    cy.get('@alertStub').should('be.calledWith', 'Login Successful!');
    cy.url().should('include', 'dashboard');
  });


});

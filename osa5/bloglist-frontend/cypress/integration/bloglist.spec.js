describe ('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'Rata-Marjatta',
      username: 'ratis',
      password: 'password123'
    }, )
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in')
    cy.get('#username')
    cy.get('#password')
    cy.get('#loginButton')
  })

  describe('Login', function() {

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ratis')
      cy.get('#password').type('password123')
      cy.get('#loginButton').click()

      cy.contains('Rata-Marjatta logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('ratis')
      cy.get('#password').type('topsecret')
      cy.get('#loginButton').click()

      cy.contains('login failed')
    })

  })

})

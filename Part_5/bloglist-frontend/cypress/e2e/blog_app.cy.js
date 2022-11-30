describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jantar Man',
      username: 'Jantar',
      password: '12345'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  it('user can login In', function() {
    cy.get('#username').type('Jantar')
    cy.get('#password').type('12345')
    cy.get('#loginBtn').click()

    cy.contains('blogs')
    cy.contains('Jantar Man logged In')
  })

})
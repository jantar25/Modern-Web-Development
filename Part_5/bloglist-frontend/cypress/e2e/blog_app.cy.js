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


  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Jantar')
      cy.get('#password').type('12345')
      cy.get('#loginBtn').click()

      cy.contains('blogs')
      cy.contains('Jantar Man logged In')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Jantar')
      cy.get('#password').type('wrong')
      cy.get('#loginBtn').click()

      cy.contains('invalid username or password')
      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Jantar Man logged In')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Jantar')
      cy.get('#password').type('12345')
      cy.get('#loginBtn').click()
    })

    it('a new blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('A Blog created by cypress')
      cy.get('#author').type('Jantar Boss')
      cy.get('#url').type('https://localhost:3000/createBlog')
      cy.get('#create').click()

      cy.contains('A Blog created by cypress Jantar Boss')
    })
  })

})
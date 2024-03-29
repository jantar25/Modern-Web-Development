Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login/', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

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
      cy.login({ username: 'Jantar', password: '12345' })
    },100000)

    it('a new blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('A Blog created by cypress')
      cy.get('#author').type('Jantar Boss')
      cy.get('#url').type('https://localhost:3000/createBlog')
      cy.get('#create').click()

      cy.contains('A Blog created by cypress Jantar Boss')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('create new blog').click()
        cy.get('#title').type('Another Blog created by cypress')
        cy.get('#author').type('Le grand')
        cy.get('#url').type('https://localhost:3000/anotherCreateBlog')
        cy.get('#create').click()

        cy.contains('create new blog').click()
        cy.get('#title').type('A Blog created by cypress')
        cy.get('#author').type('Jantar Boss')
        cy.get('#url').type('https://localhost:3000/createBlog')
        cy.get('#create').click()
      },200000)

      it('it can be liked', function () {
        cy.contains('A Blog created by cypress Jantar Boss')
          .parent().find('#view').click()

        cy.contains('A Blog created by cypress Jantar Boss')
          .parent().find('#like').click()

        cy.contains('A Blog created by cypress Jantar Boss')
          .parent().find('#blogLike')
          .should('contain', 'likes 1')
      })

      it('it can be deleted', function () {
        cy.contains('A Blog created by cypress Jantar Boss')
          .parent().find('#view').click()

        cy.contains('A Blog created by cypress Jantar Boss')
          .parent().find('#delete').click()

        cy.get('.blog').should('not.contain', 'A Blog created by cypress Jantar Boss')
      })

      it('the most liked blog being first', function () {
        cy.contains('A Blog created by cypress Jantar Boss')
          .parent().find('#view').click()

        cy.contains('A Blog created by cypress Jantar Boss')
          .parent().find('#like').click()

        cy.get('.blog').eq(1).should('contain', 'A Blog created by cypress Jantar Boss')
        cy.get('.blog').eq(0).should('contain', 'Another Blog created by cypress Le grand')
      })
    })
  })
})
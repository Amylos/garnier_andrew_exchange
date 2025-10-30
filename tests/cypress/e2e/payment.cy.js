describe('Payment Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/payment')
  })

  it('should display the payment form', () => {
    cy.get('form#paymentForm').should('be.visible')
    cy.contains("Product's Total Amount (€)").should('exist')
    cy.get('input[name=amount]').should('exist')
    cy.get('input[name=bigBills]').should('exist')
    cy.get('button[type=submit]').should('exist')
  })

  it('should allow typing amounts in fields', () => {
    cy.get('input[name=amount]').type('50').should('have.value', '50')
    cy.get('input[name="exchange[0.01]"]').clear().type('2').should('have.value', '2')
    cy.get('input[name="exchange[5]"]').clear().type('3').should('have.value', '3')
    cy.get('input[name=bigBills]').check().should('be.checked')
  })

  it('should alert if payment amount is insufficient', () => {
    cy.get('input[name=amount]').type('100')
    cy.get('input[name="exchange[1]"]').type('1')

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert')
    })

    cy.get('button[type=submit]').click()
    cy.get('@alert').should('have.been.calledWith', 'Insufficient payment amount.')
  })

  it('should redirect to change page if payment is sufficient', () => {
    cy.intercept('POST', '/api/payment', {
      statusCode: 200,
      body: { success: true, changeToGive: { '1': 1, '0.5': 2 } }
    }).as('paymentRequest')

    cy.get('input[name=amount]').type('5')
    cy.get('input[name="exchange[5]"]').type('1')

    cy.get('button[type=submit]').click()
    cy.wait('@paymentRequest')

    cy.url().should('include', '/change?data=')
  })
})

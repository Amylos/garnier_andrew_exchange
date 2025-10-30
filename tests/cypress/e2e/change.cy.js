describe('Change Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/change')
  })

  it('should display back to payment button', () => {
    cy.get('a[name=backToPayment]').should('exist')
  })

})
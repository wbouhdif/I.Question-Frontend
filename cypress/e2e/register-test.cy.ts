import { environment } from "../../src/environments/environment";

describe('Register Test', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:4200/register');

    cy.get('[formcontrolname="firstName"]').type('Test')
    cy.get('[formcontrolname="lastName"]').type('Test')
    cy.get('[formcontrolname="email"]').type('testemail@test.nl')
    cy.get('[formcontrolname="password"]').type('Testwachtwoord123!')
    cy.get('[formcontrolname="confirmPassword"]').type('Testwachtwoord123!')
    cy.get('Select').select(1)
  })

  it('Should give passwords do not match error.', function () {
    cy.get('[formcontrolname="confirmPassword"]').type('Testwachtwoord1234!')
    cy.get('button[type=submit]').click();
    cy.wait(500);
    cy.get('.toast-message').should('have.text',' Wachtwoorden komen niet overeen. ')
  })

  it('Should give field are not all filled in error.', function () {
    cy.get('[formcontrolname="confirmPassword"]').clear()
    cy.get('button[type=submit]').click();
    cy.wait(500);
    cy.get('.toast-message').should('have.text',' Niet alle velden zijn ingevuld. ')
  })


  it('Should register correctly.', function () {
    cy.intercept(environment.apiUrl + '/account/*', {
      statusCode: 200
    });
    cy.get('button[type=submit]').click();
    cy.wait(500);
    cy.get('.swal2-confirm').click();
    cy.url().should('contain', '/login')
  })
});


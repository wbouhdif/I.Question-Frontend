import {environment} from "../../src/environments/environment";
beforeEach(() => {
  cy.viewport(1920, 1080);

  cy.intercept(environment.apiUrl + '**', {
    statusCode: 200
  });

  sessionStorage.setItem('active-account', '{"type":{"name":"Admin"}}');
  sessionStorage.setItem('token', 'Fake Token');

  cy.visit('http://localhost:4200/questionnaires');
})

it('Should go back to the questionnaire list', function () {
  cy.get('#questionnairesButton').click();

  cy.wait(500);
  cy.location('pathname').should('eq','/questionnaires')
});

it('Should go back to the account management screen', function () {
  cy.get('#manageAccountButton').click();

  cy.wait(500);
  cy.location('pathname').should('eq','/account-management')
});

it('Should log out when button is pressed', function () {
  cy.get('#logOutButton').click();

  cy.wait(500);
  cy.location('pathname').should('eq','/login')
  // @ts-ignore
});

import { environment } from "../../src/environments/environment";
import {Account} from "../../src/app/models/account.model";
import {AccountType} from "../../src/app/models/account-type.model";

describe('Login Test', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);

    cy.intercept(environment.apiUrl + '**', {
      statusCode: 200
    });

    cy.visit('http://localhost:4200/login');

    cy.get('input').first().type('admin@gmail.com')
    cy.get('input').last().type('admin')
  })

  it('Should give account unauthorised error.', function () {
    cy.intercept(environment.apiUrl + '/auth/*', {
      statusCode: 401
    });

    cy.get('#logInButton').click();

    cy.wait(500);
    cy.get('.toast-message').should('have.text',' Het account waarop u probeert in te loggen is niet geautoriseerd. ')
  });

  it('Should log in correctly.', function () {
    cy.intercept(environment.apiUrl + '/auth/*', {
      body: {'token': 'Fake Token', 'account':  new Account(undefined, undefined, undefined, undefined, undefined, true, new AccountType(undefined, 'Admin'))}
    });

    cy.get('#logInButton').click();

    cy.url().should('contain', '/questionnaires')
  });
});

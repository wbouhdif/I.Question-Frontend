import { environment } from "../../src/environments/environment";

describe('Create Question Test', () => {
  beforeEach( () => {
    cy.viewport(1920, 1080);

    cy.intercept(environment.apiUrl + '**', {
      statusCode: 200
    });

    cy.intercept(environment.apiUrl +  'questionnaire', {
      statusCode: 200
    });

    sessionStorage.setItem('active-account', '{"type":{"name":"Admin"}}');
    sessionStorage.setItem('token', 'Fake Token');

    cy.visit('http://localhost:4200/create-questionnaire');
    cy.get('#createQuestionButton').click();
  })

  it('should create a multiple choice question with 2 options.', function () {
    cy.get('td').first().click();
    cy.get('questionNameField').type('TestQuestion');
    cy.get('option1').type('TestAnswer1');
    cy.get('option2').type('TestAnswer2');
    cy.get('#saveButton').click();
  });

  it('should create an open question', function () {
    cy.get('td').first().click();
    cy.get('questionNameField').type('TestQuestion');
    cy.get('#open').click();
    cy.get('#saveButton').click();
  });

  it('should cancel the creation of a new question', function () {
    cy.get('#cancelButton').click();
  });

  afterEach(() => {
    cy.url().should('contain', '/create-questionnaire')
  })
});

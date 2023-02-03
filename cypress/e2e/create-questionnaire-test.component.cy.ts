import { Question } from "../../src/app/models/question.model";
import {environment} from "../../src/environments/environment";

describe('Create Questionnaire Test', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);

    cy.intercept(environment.apiUrl + '**', {
      statusCode: 200
    });

    cy.intercept(environment.apiUrl +  'questionnaire', {
      statusCode: 200
    });

    cy.intercept(environment.apiUrl + 'question', {
      statusCode: 200,
      body: [new Question(undefined, 'OPEN', 'Open vraag?'), new Question(undefined, 'MULTIPLE_CHOICE', 'Meerkeuze vraag?')]
    });

    sessionStorage.setItem('active-account', '{"type":{"name":"Admin"}}');
    sessionStorage.setItem('token', 'Fake Token');

    cy.visit('http://localhost:4200/questionnaires');
    cy.get('#createQuestionnaireButton').click();
  })

  it('Should create a questionnaire with 2 questions.', function () {
    cy.get('td').first().click();
    cy.get('#addEmployedQuestion').click();

    cy.get('td').last().click();
    cy.get('#addEmployedQuestion').click();

    cy.get('#saveButton').click();
  });

  it('Should add 5, then remove 5 questions and save.', function () {
    cy.get('td').first().click();
    for (let i = 0; i <5; i++) {
      cy.get('#addEmployedQuestion').click();
    }

    for (let i = 0; i < 5; i++) {
      cy.get('td').first().click();
      cy.get('#removeEmployedQuestion').click();
    }

    cy.get('#saveButton').click();

  })

  it('Should cancel questionnaire creation.', function () {
    cy.get('#cancelButton').click();
  });

  afterEach(() => {
    cy.url().should('contain', '/questionnaires')
  })
});

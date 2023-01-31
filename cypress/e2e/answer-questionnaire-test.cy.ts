import { environment } from "../../src/environments/environment";
import { Questionnaire } from "../../src/app/models/questionnaire.model";
import { EmployedQuestion } from "../../src/app/models/employed-question.model";
import { Question } from "../../src/app/models/question.model";

describe('Answer Questionnaire Test', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);

    cy.intercept(environment.apiUrl + '**', {
      statusCode: 200
    });

    cy.intercept(environment.apiUrl +  'questionnaire', {
      body: [new Questionnaire('id', 'Test Vragenlijst')]
    });

    cy.intercept(environment.apiUrl +  'questionnaire/id', {
      body: new Questionnaire('id', 'Test Vragenlijst')
    });

    cy.intercept(environment.apiUrl +  'employed_question/*', {
      body: [new EmployedQuestion(undefined, new Question(undefined, 'OPEN', 'Test vraag?'), undefined, 1, true)]
    });

    sessionStorage.setItem('active-account', '{"type":{"name":"Caregiver"}}');
    sessionStorage.setItem('token', 'Fake Token');

    cy.visit('http://localhost:4200/questionnaires');

    cy.get('td').first().click();
    cy.get('#answerQuestionnaireButton').click();
  })

  it('Should give mandatory questions unanswered error.', function () {
    cy.get('#submitButton').click();

    cy.wait(500);
    cy.get('.toast-message').should('have.text',' Verplichte vraag 1 is nog niet beantwoord. ')
  });

  it('Should give name field empty error.', function () {
    cy.get('textarea').type('Test Antwoord')

    cy.get('#submitButton').click();

    cy.wait(500);
    cy.get('.toast-message').should('have.text',' Er is nog geen naam ingevoerd. ')
  });

  it('Should answer questionnaire and save answered questionnaire.', function () {
    cy.get('textarea').type('Test Antwoord');
    cy.get('input').type('Naam');

    cy.get('#submitButton').click();

    cy.url().should('contain', '/questionnaires');
  });

  it('Should cancel answering questionnaire.', function () {
    cy.get('#cancelButton').click();

    cy.url().should('contain', '/questionnaires');
  });
});

import {environment} from "../../src/environments/environment";
import {Questionnaire} from "../../src/app/models/questionnaire.model";
import {EmployedQuestion} from "../../src/app/models/employed-question.model";
import {Question} from "../../src/app/models/question.model";

describe('Inzien Anonieme Data Test', () => {
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
      body: [new EmployedQuestion(undefined, new Question(undefined, 'OPEN', 'Open Test vraag'), undefined, 1, true)
        ,new EmployedQuestion(undefined, new Question(undefined, 'MULTIPLE_CHOICE', 'MC Test vraag'), undefined, 2, false)]
    });

    sessionStorage.setItem('active-account', '{"type":{"name":"Admin"}}');
    sessionStorage.setItem('token', 'Fake Token');

    cy.visit('http://localhost:4200/questionnaires');

    cy.get('td').first().click();
    cy.get('#inspectQuestionnaireButton').click();

  })

  it('Should see all the questions in the questionnaire', function () {
    cy.contains('Open Test vraag');
    cy.contains('MC Test vraag');
  });

  it('Should see all the data of the questions in the questionnaire', function () {
    cy.contains('Type vraag: OPEN');
    cy.contains('Type vraag: MULTIPLE_CHOICE');

    cy.contains('Verplicht: true');
    cy.contains('Verplicht: false');
  });

  it('Should go back to the questionnaires list', function () {
    cy.get('#returnButton').click();

    cy.wait(500);
    cy.location('pathname').should('eq','/questionnaires')
  });

});

/// <reference types="cypress" />

describe('Login', () => {
    it('Campos obrigatórios Login', () => {
        cy.logout();
        cy.visit('/');
        cy.contains('Entrar').click();
        cy.contains('Preencha este campo');
    });
    it('Logar e Deslogar Menu Aberto', () => {
        cy.intercept('POST', '/v1/oauth/token').as('pegarToken');
        cy.intercept('GET', '/v1/users/*').as('dadosUsuarioLogado');
        cy.intercept('GET', '/v1/units?page=1&per_page=30&search=').as('unidadesUsuarioLogado');
        cy.login();
        cy.selecionarHospitaisInicio();
        cy.wait('@pegarToken').its('response.statusCode').should('eq', 200);
        cy.wait('@dadosUsuarioLogado').its('response.statusCode').should('eq', 200);
        cy.wait('@unidadesUsuarioLogado').its('response.statusCode').should('eq', 200);
    });
})
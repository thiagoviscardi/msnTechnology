/// <reference types="cypress" />
const hospitais_permitidos = "A Hospital de testes ALTERADO"

describe('Visão Geral', () => {
    beforeEach(() => {
        cy.login();
    });

    it('Acesso a tela Visão Geral', () => {
        cy.intercept('GET', `**/bi?date=*`).as('bi');
        cy.intercept('GET', `**/v1/dashboard/bi/total_month?date=*`).as('totalMtonth');
        cy.get('[data-cy="btn_visao_geral"]').click();
        cy.wait('@bi').its('response.statusCode').should('eq', 200);
        cy.wait('@totalMtonth').its('response.statusCode').should('eq', 200);
        cy.get('body').should('contain','Visão geral de plantões')
    });
});
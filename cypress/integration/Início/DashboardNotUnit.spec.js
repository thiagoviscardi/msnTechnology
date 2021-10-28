/// <reference types="cypress" />

describe('Dashboard Validar sem unidade selecionada', () => {
    beforeEach(() => {
        cy.login();
        cy.limparUnidadesLocalStorage();
    });    

    it('DASHBOARD | V2', () => {
        
    cy.visit('/');
    cy.waiting('#myInput')
    cy.get('body').should('not.contain','Escala do dia');
    cy.get('body').should('not.contain','Agenda')
    cy.get('body').should('not.contain','Relatórios')
    cy.get('body').should('not.contain','Trocas')
    cy.get('body').should('not.contain','Cadastros')

    });

});

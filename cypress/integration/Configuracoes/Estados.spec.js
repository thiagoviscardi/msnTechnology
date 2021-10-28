/// <reference types="cypress" />
var faker = require('faker-br');

const nome_estado = `Teste ${faker.name.firstName()}`;
const nome_estado2 = `Teste ${faker.name.firstName()}`;
const uc_estado = "GO";


describe('Estados', () => {
    beforeEach(() => {
        cy.login();
    })

    it('Incluir', () => {
        cy.waiting('[data-cy="img_configuracoes"]');
        cy.get('[data-cy="img_configuracoes"]').click();
        cy.get('[data-cy="container_configuracoes"]').contains('Estados').click();

        cy.get('[data-cy="btn_register"]').click();
        cy.get('[data-cy="inputContainer"] input').eq(0).type(nome_estado);
        cy.get('[data-cy="inputContainer"] input').eq(1).type(uc_estado);
        
        cy.intercept('POST', '/v2/admin/states').as('states');
        cy.get('[data-cy="btns_footerButton"] button').last().click();
        cy.wait('@states').its('response.statusCode').should('eq', 201);

        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_estado);
        cy.waiting('[data-cy="dataTable"] table tbody tr');
        cy.get('[data-cy="dataTable"] table tbody tr', {timeout: 5000}).eq(0).contains(nome_estado);
    });

    it('Editar', () => {
        cy.visit('/settings/estados');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_estado);
        cy.waiting('[title="Editar"]');
        cy.get('[title="Editar"]').eq(0).click({force: true});
        cy.get('[data-cy="inputContainer"] input').eq(0).clear().type(nome_estado2);
        cy.get('[data-cy="btns_footerButton"] button').last().click();


        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_estado2);
        cy.waiting('[data-cy="dataTable"] table tbody tr');
        cy.get('[data-cy="dataTable"] table tbody tr', {timeout: 5000}).eq(0).contains(nome_estado2);     

    });

    it('Excluir', () => {
        cy.visit('/settings/estados');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_estado2);
        cy.waiting('[title="Deletar"]');
        cy.get('[title="Deletar"]').eq(0).click({force: true});
        cy.waiting("alert-dialog-title");
        cy.get('[type="button"]').contains('Confirmar').click();
        cy.waiting('[data-cy="search"] input');
        cy.reload();
        
        cy.waiting('[data-cy="img_configuracoes"]');
        cy.get('[data-cy="img_configuracoes"]').click();
        cy.get('[data-cy="container_configuracoes"]').contains('Estados').click();
        cy.get('[data-cy="search"] input').clear().type(nome_estado2);
        cy.waiting('[data-cy="dataTable_support"]');
        cy.get('[data-cy="dataTable_support"]', {timeout: 6000}).should('not.contain', nome_estado2);

    });

});
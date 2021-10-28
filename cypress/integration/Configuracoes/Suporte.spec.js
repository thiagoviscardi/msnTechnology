/// <reference types="cypress" />
var faker = require('faker-br');

const titulo_suporte = faker.company.companyName();
const titulo_suporte2 = faker.company.companyName();
const descricao_suporte = "Descrição teste";

var id_suporte_editar = "";

describe('Suporte', () => {
    beforeEach(() => {
        cy.login();
    })

    it('Incluir Suporte', () => {
        cy.waiting('[data-cy="img_configuracoes"]');
        cy.get('[data-cy="img_configuracoes"]').click();
        cy.get('[data-cy="container_configuracoes"]').contains('Suporte').click();

        cy.get('[data-cy="btn_register"]').click();
        cy.get('[data-cy="input_nome_hospital"]').eq(0).type(titulo_suporte);
        cy.get('[data-cy="input_description_hospital"]').type(descricao_suporte);
        
        cy.intercept('POST', '/v1/helps').as('helps');
        cy.get('[data-cy="container_btn_form"] button').last().click();
        cy.wait('@helps').its('response.statusCode').should('eq', 201);
        
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(titulo_suporte);
        cy.waiting('[data-cy="dataTable_support"] table tbody tr');
        cy.get('[data-cy="dataTable_support"] table tbody tr', {timeout: 5000}).eq(0).contains(titulo_suporte);
    });

    it('Editar Suporte', () => {
        cy.visit('/settings/suporte');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(titulo_suporte);
        cy.waiting('[title="Editar"]');

        cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
            id_suporte_editar = $td.text();
            let urlEditar = `/v1/helps/${id_suporte_editar}`;
            cy.get('[title="Editar"]').eq(0).click({force: true});
            cy.get('[data-cy="input_nome_hospital"] div input').eq(0).clear().type(titulo_suporte2);
            cy.intercept('PUT', urlEditar).as('helps');
            cy.get('[data-cy="container_btn_form"] button').last().click();
            cy.wait('@helps').its('response.statusCode').should('eq', 200);
            
            cy.waiting('[data-cy="search"] input');
            cy.get('[data-cy="search"] input').clear().type(titulo_suporte2);
            cy.waiting('[data-cy="dataTable_support"] table tbody tr');
            cy.get('[data-cy="dataTable_support"] table tbody tr', {timeout: 5000}).eq(0).contains(titulo_suporte2);       
        });
    });

    it('Excluir Suporte', () => {
        cy.visit('/settings/suporte');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(titulo_suporte2);
        cy.waiting('[title="Deletar"]');
        cy.get('[title="Deletar"]').click({force: true});
        cy.waiting("alert-dialog-title");
        cy.get('[type="button"]').contains('Confirmar').click();
        cy.waiting('[data-cy="search"] input');
        cy.reload();
        
        cy.waiting('[data-cy="img_configuracoes"]');
        cy.get('[data-cy="img_configuracoes"]').click();
        cy.get('[data-cy="container_configuracoes"]').contains('Suporte').click();
        cy.get('[data-cy="search"] input').clear().type(titulo_suporte2);
        cy.waiting('[data-cy="dataTable_support"] table tbody tr');
        cy.get('[data-cy="dataTable_support"] table tbody', {timeout: 5000}).should('not.contain', titulo_suporte2);
    });
});
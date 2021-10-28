/// <reference types="cypress" />
var faker = require('faker-br');

const nome_banco = faker.company.companyName();
const nome_banco2 = faker.company.companyName();
const codigo_banco = 100;

var id_banco_editar = "";

describe('Bancos', () => {
    beforeEach(() => {
        cy.login();
        cy.waiting('[data-cy="img_configuracoes"]');
        cy.get('[data-cy="img_configuracoes"]').click();
        cy.get('[data-cy="container_configuracoes"]').contains('Bancos').click();
    })

    it('Incluir Banco', () => {
        cy.get('[data-cy="btn_register_bank"]').click();
        cy.get('[name="name"]').type(nome_banco);
        cy.get('[name="code"]').type(codigo_banco);
        cy.intercept('POST', '/v2/admin/banks').as('banks');
        cy.get('[data-cy="contained_btn_register"]').click();
        cy.wait('@banks').its('response.statusCode').should('eq', 201);

        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').type(nome_banco);
        cy.waiting('[data-cy="dataTable_support"]');
        cy.get('[data-cy="dataTable_support"] tr', {timeout: 5000}).eq(0).contains(nome_banco);
    });

    it('Editar Banco', () => {
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_banco);
        cy.waiting('[title="Editar"]');

        cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
            id_banco_editar = $td.text();
            let urlEditar = `/v2/admin/banks/${id_banco_editar}`;
            cy.get('[title="Editar"]').eq(0).click({force: true});
            cy.get('[name="name"]').clear().type(nome_banco2);
            cy.intercept('PUT', urlEditar).as('banks');
            cy.get('[data-cy="btn_salvar_modal_editar_banco"]').click();
            cy.wait('@banks').its('response.statusCode').should('eq', 200);
            
            cy.waiting('[data-cy="search"] input');
            cy.get('[data-cy="search"] input').clear().type(nome_banco2);
            cy.waiting('[data-cy="dataTable_support"]');
            cy.get('[data-cy="dataTable_support"] tr', {timeout: 5000}).eq(0).contains(nome_banco2);        
        });
    });

    it('Excluir Banco', () => {
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_banco2);
        cy.waiting('[title="Deletar"]');
        cy.get('[title="Deletar"]').click({force: true});
        cy.waiting("alert-dialog-title");
        cy.get('[type="button"]').contains('Confirmar').click();
        cy.waiting('[data-cy="search"] input');
        cy.reload();
        
        cy.waiting('[data-cy="img_configuracoes"]');
        cy.get('[data-cy="img_configuracoes"]').click();
        cy.get('[data-cy="container_configuracoes"]').contains('Bancos').click();
        cy.get('[data-cy="search"] input').clear().type(nome_banco2);
        cy.waiting('[data-cy="dataTable_support"]');
        cy.get('[data-cy="dataTable_support"]', {timeout: 5000}).should('not.contain', nome_banco2);
    });

});
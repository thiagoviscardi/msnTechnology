/// <reference types="cypress" />
var faker = require('faker-br');

const nome_pais = `Teste ${faker.name.firstName()}`;
const nome_pais2 = `Teste ${faker.name.firstName()}`;

var id_pais_editar = "";

describe('Paises', () => {
    beforeEach(() => {
        cy.login();
    })

    it('Incluir', () => {
        cy.waiting('[data-cy="img_configuracoes"]');
        cy.get('[data-cy="img_configuracoes"]').click();
        cy.get('[data-cy="container_configuracoes"]').contains('Países').click();

        cy.get('[data-cy="btn_register"]').click();
        cy.get('[data-cy="input_name"] input').type(nome_pais);
        cy.intercept('POST', '/v2/admin/countries').as('countries');
        cy.get('[data-cy="btns_footerButton"] button').last().click();
        cy.wait('@countries').its('response.statusCode').should('eq', 201);

        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_pais);
        cy.waiting('[data-cy="dataTable_countrie"] table tbody tr');
        cy.get('[data-cy="dataTable_countrie"] table tbody tr', {timeout: 5000}).eq(0).contains(nome_pais);
    });

    it('Editar', () => {
        cy.visit('/settings/paises');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_pais);
        cy.waiting('[title="Editar"]');

        cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
            id_pais_editar = $td.text();
            let urlEditar = `/v2/admin/countries/${id_pais_editar}`;
            cy.get('[title="Editar"]').eq(0).click({force: true});
            cy.get('[data-cy="input_name"] input').clear().type(nome_pais2);
            cy.intercept('PUT', urlEditar).as('countries');
            cy.get('[data-cy="btns_footerButton"] button').last().click();
            cy.wait('@countries').its('response.statusCode').should('eq', 200);

            cy.waiting('[data-cy="search"] input');
            cy.get('[data-cy="search"] input').clear().type(nome_pais2);
            cy.waiting('[data-cy="dataTable_countrie"] table tbody tr');
            cy.get('[data-cy="dataTable_countrie"] table tbody tr', {timeout: 6000}).eq(0).contains(nome_pais2);     
        });
    });

    it('Excluir', () => {
        cy.visit('/settings/paises');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_pais2);
        cy.waiting('[title="Deletar"]');
        cy.get('[title="Deletar"]').eq(0).click({force: true});
        cy.waiting("alert-dialog-title");
        cy.get('[type="button"]').contains('Confirmar').click();
        cy.waiting('[data-cy="search"] input');
        cy.reload();
        
        cy.waiting('[data-cy="img_configuracoes"]');
        cy.get('[data-cy="img_configuracoes"]').click();
        cy.get('[data-cy="container_configuracoes"]').contains('Países').click();
        cy.get('[data-cy="search"] input').clear().type(nome_pais2);
        cy.waiting('[data-cy="dataTable_countrie"] table tbody tr');
        cy.get('[data-cy="dataTable_countrie"] table tbody', {timeout: 5000}).should('not.contain', nome_pais2);
    });

});
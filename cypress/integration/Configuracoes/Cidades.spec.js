/// <reference types="cypress" />
var faker = require('faker-br');

const nome_cidade = `Teste ${faker.company.companyName()}`;
const nome_cidade2 = `Teste ${faker.company.companyName()} Editado`;
const uf_cidade = "Goiás";
var id_cidade_editar = "";

describe('Cidades', () => {
    beforeEach(() => {
        cy.login();
    })

    it('Incluir', () => {
        cy.waiting('[data-cy="img_configuracoes"]');
        cy.get('[data-cy="img_configuracoes"]').click();
        cy.get('[data-cy="container_configuracoes"]').contains('Cidades').click();

        cy.get('[data-cy="btn_register"]').click();
        cy.get('[data-cy="inputContainer"]').children().eq(0).type(nome_cidade);
        cy.get('[data-cy="inputContainer"]').children().eq(1).type(`${uf_cidade}{enter}`, {delay:50});
        
        cy.intercept('POST', '/v2/admin/cities').as('cities');
        cy.get('[data-cy="btns_footerButton"] button').last().click();
        cy.wait('@cities').its('response.statusCode').should('eq', 201);

        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_cidade);
        cy.waiting('[data-cy="dataTable"] table tbody tr');
        cy.get('[data-cy="dataTable"] table tbody tr', {timeout: 5000}).eq(0).contains(nome_cidade);
    });

    it('Editar', () => {
        cy.visit('/settings/cidades');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').type(nome_cidade);
        cy.waiting('[title="Editar"]');

        cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
            id_cidade_editar = $td.text();
            let urlEditar = `/v2/admin/cities/${id_cidade_editar}`;
            cy.get('[title="Editar"]').eq(0).click({force: true});
            cy.get('[data-cy="inputContainer"]').children().eq(0).clear().type(nome_cidade2);
            cy.intercept('PUT', urlEditar).as('cities');
            cy.get('[data-cy="btns_footerButton"] button').last().click();
            cy.wait('@cities').its('response.statusCode').should('eq', 200);

            cy.waiting('[data-cy="search"] input');
            cy.get('[data-cy="search"] input').clear().type(nome_cidade2);
            cy.waiting('[data-cy="dataTable"] table tbody tr');
            cy.get('[data-cy="dataTable"] table tbody tr', {timeout: 5000}).eq(0).contains(nome_cidade2);     
        });
    });

    it('Excluir', () => {
        cy.visit('/settings/cidades');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_cidade2);
        cy.waiting('[title="Deletar"]');
        cy.get('[title="Deletar"]').click({force: true});
        cy.waiting("alert-dialog-title");
        cy.get('[type="button"]').contains('Confirmar').click();
        cy.waiting('[data-cy="search"] input');
        cy.reload();
        
        cy.waiting('[data-cy="img_configuracoes"]');
        cy.get('[data-cy="img_configuracoes"]').click();
        cy.get('[data-cy="container_configuracoes"]').contains('Cidades').click();
        cy.get('[data-cy="search"] input').clear().type(nome_cidade2);
        cy.waiting('[data-cy="dataTable"] table tbody');
        cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('not.contain', nome_cidade2);
    });

});
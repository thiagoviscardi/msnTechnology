/// <reference types="cypress" />
import { getTokenUserId } from "../../AUTH/Token.request.js";
import { cadastrarMultiprofissional } from "../../../support/Requests/CadastrarMultiprofissional.js";

var faker = require('faker-br');
var nome1 = `${faker.name.firstName()} ${faker.name.lastName()}`;

describe('Profissional Multiprofissional', () => {
    it('Editar status e teste filtros', () => {
        cy.login();
        cy.selecionarHospitaisInicio();

        getTokenUserId(Cypress.env('email'), Cypress.env('pass')).then(resp_get_access_token => {
            expect(resp_get_access_token.status).to.eq(200);
            let token = resp_get_access_token.body.access_token;
            cy.log(token);

            cadastrarMultiprofissional(token, nome1).then(resp_register_professional => {
                expect(resp_register_professional.status).to.eq(201);
                
                cy.visit('/cadastros/profissionais');
                cy.waiting('[data-cy="search"] input');
                cy.get('[data-cy="search"] input').clear().type(nome1);
                cy.waiting('[title="Editar"]');
                cy.get('[data-cy="div_professional_filters"]').children().eq(1).click().type('Multiprofissional{enter}');
                cy.wait(2000);
                cy.waiting('[data-cy="dataTable"] table tbody');
                cy.get('[data-cy="dataTable"] table tbody', {timeout: 6000}).should('contain', nome1);

                cy.get('[title="Ativar/Desativar"] span').eq(0).click({force: true});
                cy.reload();
                cy.get('[data-cy="search"] input').clear().type(nome1);
                cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('not.contain', nome1);

                cy.get('[data-cy="div_professional_filters"]').children().eq(2).click();
                cy.get('[data-cy="div_professional_filters"]').children().eq(2).contains('Inativos').click();
                cy.wait(1000);
                cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('contain', nome1);

                cy.get('[data-cy="div_professional_filters"]').children().eq(1).click().type('Todos{enter}');
                cy.wait(1000);
                cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('contain', nome1);

                cy.get('[title="Ativar/Desativar"] span').eq(0).click({force: true});
                cy.wait(1000);
                cy.reload();
                cy.get('[data-cy="search"] input').clear().type(nome1);
                cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('not.contain', nome1);

                cy.get('[data-cy="div_professional_filters"]').children().eq(2).click();
                cy.get('[data-cy="div_professional_filters"]').children().eq(2).click().type('Ativos{enter}');
                cy.wait(1000);
                cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('contain', nome1);

            })

        })
            
    });

    it('Excluir Multiprofissional', () => {
        cy.visit('/cadastros/profissionais');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome1);
        cy.waiting('[title="Editar"]');

        cy.get('[title="Deletar"]').eq(0).click({force: true});
        cy.get('#alert-dialog-title').siblings().last().children().last().click();
        cy.waiting('[data-cy="search"] input');
        cy.reload();
        
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome1);
        cy.waiting('[data-cy="dataTable"] table tbody');
        cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('not.contain', nome1);
    });

});
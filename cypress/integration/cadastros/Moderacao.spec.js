/// <reference types="cypress" />
import { getTokenUserId } from "../AUTH/Token.request.js";
import { cadastrarMedicoApp } from "../../support/Requests/CadastrarMedicoApp.js";

var faker = require('faker-br');
const name_professional_aprovado = `${faker.name.firstName()} ${faker.name.lastName()}`;
const cpf_professional_aprovado = faker.br.cpf();
const name_professional_recusado = `${faker.name.firstName()} ${faker.name.lastName()}`;
const cpf_professional_recusado = faker.br.cpf();
const senha_app_professional = "123456";

describe('Moderação', () => {

    before(() => {
        cy.login();
        cy.selecionarHospitaisInicio();
    });

    it('Aceitar', () => {

        getTokenUserId(Cypress.env('email'), Cypress.env('pass')).then(resp_get_access_token => {
            expect(resp_get_access_token.status).to.eq(200);
            let token = resp_get_access_token.body.access_token;
            cy.log(token);

            cadastrarMedicoApp(name_professional_aprovado, cpf_professional_aprovado, senha_app_professional).then(resp_register_professional => {
                expect(resp_register_professional.status).to.eq(201);
                cy.log(name_professional_aprovado);
            
                cy.get('[data-cy="img_cadastros"]').click();
                cy.get('[data-cy="cadastros_cards"]').contains('Moderação').click();                

                cy.waiting('[data-cy="search"] input');
                cy.get('[data-cy="search"] input').clear().type(name_professional_aprovado);
                cy.waiting('[title="Aceitar"]');

                cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
                    let id_profissional = $td.text();
                    let urlAprovar = `/v1/users/moderator/${id_profissional}`;
                    cy.get('[title="Aceitar"]').eq(0).click({force: true});
                    cy.waiting('[data-cy="btn_modal_aceitar_moderacao"]');
                    cy.intercept('PUT', urlAprovar).as('professional');
                    cy.get('[data-cy="btn_modal_aceitar_moderacao"]').click();
                    cy.wait('@professional').its('response.statusCode').should('eq', 200);
                    
                    cy.get('[data-cy="btn_fechar_modal"]').click();
                    cy.waiting('[data-cy="search"] input');
                    cy.get('[data-cy="search"]').siblings().last().click();
                    cy.get('[data-cy="search"] input').type(name_professional_aprovado);
                    cy.waiting('[data-cy="dataTable"] table tbody tr');
                    cy.get('[data-cy="dataTable"] table tbody', {timeout: 6000}).should('not.contain', name_professional_aprovado);
                }); 
            
            })

        })
        
    });
    
    it('Recusar', () => {

        getTokenUserId(Cypress.env('email'), Cypress.env('pass')).then(resp_get_access_token => {
            expect(resp_get_access_token.status).to.eq(200);
            let token = resp_get_access_token.body.access_token;
            cy.log(token);

            cadastrarMedicoApp(name_professional_recusado, cpf_professional_recusado, senha_app_professional).then(resp_register_professional => {
                expect(resp_register_professional.status).to.eq(201);
                cy.log(name_professional_recusado);
            
                cy.visit('/cadastros/solicitacoes');

                cy.waiting('[data-cy="search"] input');
                cy.get('[data-cy="search"] input').clear().type(name_professional_recusado);
                cy.waiting('[title="Recusar"]');

                cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
                    let id_profissional = $td.text();
                    let urlRecusar = `/v1/users/moderator/${id_profissional}`;
                    cy.get('[title="Recusar"]').eq(0).click({force: true});
                    cy.waiting('[data-cy="btn_modal_aceitar_moderacao"]');
                    cy.intercept('PUT', urlRecusar).as('professional');
                    cy.get('[data-cy="btn_modal_aceitar_moderacao"]').click();
                    cy.wait('@professional').its('response.statusCode').should('eq', 200);
                    
                    cy.get('[data-cy="btn_fechar_modal"]').click();
                    cy.waiting('[data-cy="search"] input');
                    cy.get('[data-cy="search"]').siblings().last().click();
                    cy.get('[data-cy="search"] input').type(name_professional_recusado);
                    cy.waiting('[data-cy="dataTable"] table tbody tr');
                    cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('not.contain', name_professional_recusado);
                }); 
            
            })

        })
        
    });

});
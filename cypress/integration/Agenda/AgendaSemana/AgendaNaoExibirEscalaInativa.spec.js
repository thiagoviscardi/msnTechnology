/// <reference types="cypress" />
import { getTokenUserId } from "../../AUTH/Token.request.js";
import { cadastrarEscala } from "../../../support/Requests/CadastrarEscala.js";
import { alterarStatusEscala } from "../../../support/Requests/AlterarStatusEscala.js";

var faker = require('faker-br');
const nome_escala = `Teste ${faker.name.firstName()} ${faker.name.firstName()}`;
const status_escala = 0;//1 é true e 0 false

describe('Agenda não exibir escala inativa', () => {

    it('Agendar plantões da semana', () => {
        cy.login();

        getTokenUserId(Cypress.env('email'), Cypress.env('pass')).then( resp_get_access_token => {
            expect(resp_get_access_token.status).to.eq(200);
            let token = resp_get_access_token.body.access_token;
            cy.log(token);

            cadastrarEscala(token, status_escala, nome_escala).then( resp_cadastrar_escala => {
                expect(resp_cadastrar_escala.status).to.eq(201);
                cy.log("Cadastrado Escala Inativa com Sucesso!");
                cy.log(nome_escala);

                let id_escala = resp_cadastrar_escala.body.data.id;
                cy.log(id_escala);

                alterarStatusEscala(token, id_escala).then( resp_alterar_status_escala => {
                    expect(resp_alterar_status_escala.status).to.eq(200);

                    cy.visit('/agenda');
                    cy.get('[data-cy="div_agenda"]').contains('Agenda da semana').click();
                    cy.wait(3000);
                    cy.waiting('#Escalas');
                    cy.get('#Escalas').type(`${nome_escala}{enter}`, {delay:600});
                    cy.wait(3000);
                    cy.get('body').contains('Nenhum resultado encontrado');

                })
                
            })
        })
    })

    it('Excluir', () => {
        cy.visit('/cadastros/escalas');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').type(nome_escala);
        cy.waiting('[title="Editar"]');
  
        cy.get('[title="Deletar"]').eq(0).click();
        cy.intercept('DELETE', `**/v1/scales/61/*`).as('scales_delete');
        cy.get('#alert-dialog-title').siblings().last().children().last().click();
        cy.wait('@scales_delete').its('response.statusCode').should('eq', 200);
        cy.waiting('[data-cy="search"] input');
        cy.reload();
        
        cy.waiting('[data-cy="img_cadastros"]');
        cy.get('[data-cy="search"] input').clear().type(nome_escala);
        cy.waiting('[data-cy="dataTable"] table tbody');
        cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('not.contain', nome_escala);
  
    });
    
})
/// <reference types="cypress" />
var faker = require('faker-br');

const nome = faker.name.findName();
const email = faker.internet.email();
const cpf = faker.br.cpf();
const telefone = "62981819999";
const empresa = "IDMED";
const grupo = "Administrador";
const hospitais_permitidos = Cypress.env('hospital_selecionado');

const nome_editar = faker.name.findName();
var id_administrador_editar = "";

describe('Administradores', () => {
    before(() => {
        cy.login();
        cy.selecionarHospitaisInicio();
    });

    it('Incluir', () => {
        cy.visit('/dashboard');
        cy.waiting('[data-cy="div_metricas"]');
        cy.get('[data-cy="img_cadastros"]', {timeout: 7000}).click();
        cy.get('[data-cy="cadastros_cards"]').contains('Administradores').click();

        cy.get('[data-cy="btn_register"]').click();
        cy.get('[name="name"]').type(nome);
        cy.get('[data-cy="inputContainer"]').children().eq(0).type(cpf);
        cy.get('[data-cy="inputContainer"]').children().eq(1).type(telefone);
        cy.get('[data-cy="inputContainer"]').children().eq(2).type(email);
        cy.get('[data-cy="inputContainer2"]').children().eq(0).type(`${empresa}{enter}`, {delay:200});
        cy.get('[data-cy="inputContainer2"]').children().eq(1).type(`${grupo}{enter}`, {delay:100});
        cy.get('[data-cy="inputContainer3"]').children().eq(0).type(`${hospitais_permitidos}{enter}`, {delay:100});
        cy.intercept('POST', '**/v1/users').as('users');
        cy.get('[data-cy="footerButton"] button').last().click();
        cy.wait('@users').its('response.statusCode').should('eq', 201);
        cy.get('[data-cy="btn_fechar_modal"]').click();

        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome);
        cy.waiting('[data-cy="dataTable"] table tbody tr');
        cy.get('[data-cy="dataTable"] table tbody tr', {timeout: 5000}).eq(0).contains(nome);
    });

    it('Editar', () => {
        cy.visit('/cadastros/administradores');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome);
        cy.waiting('[title="Editar"]');

        cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
            id_administrador_editar = $td.text();
            let urlEditar = `/v1/users/${id_administrador_editar}`;
            cy.get('[title="Editar"]').eq(0).click({force: true});
            cy.waiting('[data-cy="input_nome"]');
            cy.get('[name="name"]').clear().type(nome_editar);
            cy.intercept('PUT', urlEditar).as('user_edit');
            cy.get('[data-cy="footerButton"] button').last().click();
            cy.wait('@user_edit').its('response.statusCode').should('eq', 200);
            cy.get('[data-cy="btn_fechar_modal"]').click();
            
            cy.waiting('[data-cy="search"] input');
            cy.get('[data-cy="search"] input').clear().type(nome_editar);
            cy.waiting('[data-cy="dataTable"] table tbody tr');
            cy.get('[data-cy="dataTable"] table tbody tr', {timeout: 5000}).eq(0).contains(nome_editar); 
        });
    });

    it('Uploads', () => {
        cy.visit('/cadastros/administradores');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_editar);
        cy.waiting('[title="Editar"]');

        cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
            id_administrador_editar = $td.text();
            let urlEditar = `**/v1/users/${id_administrador_editar}/picture`;
            cy.get('[title="Editar"]').eq(0).click({force: true});
            cy.waiting('[type="file"]');
            cy.intercept('POST', urlEditar).as('imageAdministrador');
            cy.uploadFile('./image/buck2.jpg', 0); 
            cy.wait('@imageAdministrador').its('response.statusCode').should('eq', 200);
            cy.get('[data-cy="footerButton"] button').last().click();
        }); 
    });

    it('Excluir', () => {
        cy.visit('/cadastros/administradores');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_editar);
        cy.waiting('[title="Editar"]');

        cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
            id_administrador_editar = $td.text();
            cy.get('[title="Deletar"]').eq(0).click({force: true});
            cy.intercept('DELETE', `**/v1/users/${id_administrador_editar}`).as('user_delete');
            cy.get('#alert-dialog-title').siblings().last().children().last().click();
            cy.wait('@user_delete').its('response.statusCode').should('eq', 200);
            cy.waiting('[data-cy="search"] input');
            cy.reload();
            
            cy.waiting('[data-cy="search"] input');
            cy.get('[data-cy="search"] input').clear().type(nome_editar);
            cy.waiting('[data-cy="dataTable"] table tbody');
            cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('not.contain', nome_editar);
        });
    });

});
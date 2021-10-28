/// <reference types="cypress" />
var faker = require('faker-br');

const nome_perfil = faker.company.companyName();
const nome_perfil2 = faker.company.companyName();

var id_perfil_editar = "";

describe('Grupos de Permissões', () => {
    beforeEach(() => {
        cy.login();
    })

    it('Incluir', () => {
        cy.selecionarHospitaisInicio();
        cy.waiting('[data-cy="img_configuracoes"]');
        cy.get('[data-cy="img_configuracoes"]').click();
        cy.get('[data-cy="container_configuracoes"]').contains('Grupos de permissões').click();

        cy.get('[href="/settings/perfil-de-permissoes/cadastrar"]').click();
        cy.get('[name="name"]').type(nome_perfil);
        cy.get('[data-cy="search"] input').type("Deletar Usuário");
        cy.waiting('[data-cy="search"] input');
        cy.wait(1500);
        cy.get('[data-cy="input_dataTable_permission"] table tbody tr').eq(0).contains("Deletar Usuário");
        cy.get('[data-cy="input_dataTable_permission"] table tbody tr').children().last().children().children().click();
        cy.wait(1000);

        cy.intercept('POST', '/v1/groups').as('groups');
        cy.intercept('PUT', '/v1/groups/**').as('permissions');
        cy.get('[data-cy="container_buttons"]').children().last().click();
        cy.wait('@groups').its('response.statusCode').should('eq', 201);
        cy.wait('@permissions').its('response.statusCode').should('eq', 200);
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_perfil);
        cy.waiting('[data-cy="dataTable_profile_permissions"]');
        cy.get('[data-cy="dataTable_profile_permissions"]').eq(0).contains(nome_perfil);
    });

    it('Editar', () => {
        cy.visit('/settings/perfil-de-permissoes');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_perfil);
        cy.waiting('[title="Editar"]');

        cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
            id_perfil_editar = $td.text();
            let urlEditar = `**/v1/groups/${id_perfil_editar}`;
            let urlEditar2 = `**/v1/groups/${id_perfil_editar}/permissions`;
            cy.get('[title="Editar"]').eq(0).click({force: true});
            cy.waiting('[name="name"]')    
            cy.get('[name="name"]').clear().type(nome_perfil2);
            cy.waiting('[data-cy="container_buttons"]');
            cy.intercept('PUT', urlEditar).as('profile');
            cy.intercept('PUT', urlEditar2).as('profile');
            cy.get('[data-cy="container_buttons"]').children().last().click();
            cy.wait('@profile').its('response.statusCode').should('eq', 200);
            cy.wait('@profile').its('response.statusCode').should('eq', 200);
            cy.waiting('[data-cy="search"] input');
            cy.get('[data-cy="search"] input').clear().type(nome_perfil2);
            cy.waiting('[data-cy="dataTable_profile_permissions"]');
            cy.get('[data-cy="dataTable_profile_permissions"]').eq(0).contains(nome_perfil2);       
        });
    });

    it('Excluir', () => {

        cy.visit('/settings/perfil-de-permissoes');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_perfil2);
        cy.waiting('[title="Deletar"]');
        cy.get('[title="Deletar"]').eq(0).click({force: true});
        cy.waiting("alert-dialog-title");
        cy.get('[type="button"]').contains('Confirmar').click();
        cy.waiting('[data-cy="search"] input');
        cy.reload();
        
        cy.waiting('[data-cy="img_configuracoes"]');
        cy.get('[data-cy="img_configuracoes"]').click();
        cy.get('[data-cy="container_configuracoes"]').contains('Grupos de permissões').click();
        cy.get('[data-cy="search"] input').type(nome_perfil2);
        cy.waiting('[data-cy="dataTable_profile_permissions"]');
        cy.get('[data-cy="dataTable_profile_permissions"]', {timeout: 5000}).should('not.contain', nome_perfil2);
    });

});    
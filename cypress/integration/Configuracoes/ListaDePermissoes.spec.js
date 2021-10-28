/// <reference types="cypress" />

describe('Lista de Permissões', () => {
    beforeEach(() => {
        cy.login();
    })

    it('Acesso Tela Lista de Permissões', () => {
        let urlRequestScales = "/v1/permissions?page=1&per_page=10&search=&statusNotification=false";
        cy.waiting('[data-cy="img_configuracoes"]');
        cy.get('[data-cy="img_configuracoes"]').click();
        cy.intercept('GET', urlRequestScales).as('permissions');
        cy.get('[data-cy="container_configuracoes"]').contains('Lista de permissões').click();
        cy.wait('@permissions').its('response.statusCode').should('eq', 200);
    });
});  
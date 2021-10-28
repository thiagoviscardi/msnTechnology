/// <reference types="cypress" />
const hospitais_permitidos = "A Hospital de testes ALTERADO"

describe('Reload páginas', () => {
    before(() => {
        cy.logout();
    })

    beforeEach(() => {
        cy.viewport('macbook-13')
        cy.login();
    });

    it('Início', () => {
        cy.selecionarHospitaisInicio();
        cy.reload()
        cy.get('body').then(() => {
            let token = {};
            let user = {};
            let hospital = {};
            cy.window().then(
                (window) => {
                    token = window.localStorage.getItem('plantaoextra@token')
                    user = window.localStorage.getItem('plantaoextra@user')
                    hospital = window.localStorage.getItem('plantãoExtra@hospital')
                }
            ).then(() => {
                cy.wrap(token).should('contains', 'access_token');
                cy.wrap(user).should('contains', 'id');
                cy.wrap(hospital).should('contains', 'id');
            })
        })
        cy.waiting('[data-cy="div_metricas"]');
        cy.get('[data-cy="div_metricas"] p').eq(0).should('contain.html', 'Métricas');
    });

    it('Agenda', () => {
        cy.visit('/agenda');
        cy.reload()
        cy.get('body').then(() => {
            let token = {};
            let user = {};
            let hospital = {};
            cy.window().then(
                (window) => {
                    token = window.localStorage.getItem('plantaoextra@token')
                    user = window.localStorage.getItem('plantaoextra@user')
                    hospital = window.localStorage.getItem('plantãoExtra@hospital')
                }
            ).then(() => {
                cy.wrap(token).should('contains', 'access_token');
                cy.wrap(user).should('contains', 'id');
                cy.wrap(hospital).should('contains', 'id');
            })
        })
        cy.get('#GerarPlanilha', {timeout: 6000}).should('contain', 'Gerar plani');
    });

    it('Trocas', () => {
        cy.visit('/relatorio-de-trocas');
        cy.reload()
        cy.get('body').then(() => {
            let token = {};
            let user = {};
            let hospital = {};
            cy.window().then(
                (window) => {
                    token = window.localStorage.getItem('plantaoextra@token')
                    user = window.localStorage.getItem('plantaoextra@user')
                    hospital = window.localStorage.getItem('plantãoExtra@hospital')
                }
            ).then(() => {
                cy.wrap(token).should('contains', 'access_token');
                cy.wrap(user).should('contains', 'id');
                cy.wrap(hospital).should('contains', 'id');
            })
        })
        cy.get('body').contains('Trocas');
    });

    it('Cadastros', () => {
        cy.visit('/cadastros');
        cy.reload()
        cy.get('body').then(() => {
            let token = {};
            let user = {};
            let hospital = {};
            cy.window().then(
                (window) => {
                    token = window.localStorage.getItem('plantaoextra@token')
                    user = window.localStorage.getItem('plantaoextra@user')
                    hospital = window.localStorage.getItem('plantãoExtra@hospital')
                }
            ).then(() => {
                cy.wrap(token).should('contains', 'access_token');
                cy.wrap(user).should('contains', 'id');
                cy.wrap(hospital).should('contains', 'id');
            })
        })
        cy.get('[data-cy="cadastros_cards"]').contains('Hospitais');
    });

    it('Configurações', () => {
        cy.visit('/settings');
        cy.reload()
        cy.get('body').then(() => {
            let token = {};
            let user = {};
            let hospital = {};
            cy.window().then(
                (window) => {
                    token = window.localStorage.getItem('plantaoextra@token')
                    user = window.localStorage.getItem('plantaoextra@user')
                    hospital = window.localStorage.getItem('plantãoExtra@hospital')
                }
            ).then(() => {
                cy.wrap(token).should('contains', 'access_token');
                cy.wrap(user).should('contains', 'id');
                cy.wrap(hospital).should('contains', 'id');
            })
        })
        cy.get('body').contains('Configurações');
    });
});
    
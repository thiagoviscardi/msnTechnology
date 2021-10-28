/// <reference types="cypress" />

const moment = require('moment'); 
const today1 = moment(); 
const today2 = moment();
const today3 = moment().format('YYYY-MM-DD');
const start = moment(today1.subtract(1, 'days')).format('YYYY-MM-DD');
const end = moment(today2.add(5, 'days')).format('YYYY-MM-DD');

let unit_id = 61;

describe('Plantoes', () => {
    before(() => {
        cy.login();
    });

    it('Abrir a tela e consultar por nome', () => {
        cy.selecionarHospitaisInicio();
        cy.waiting('[data-cy="div_metricas"]');
        
        let urlRequestScales = `/v1/units/${unit_id}/scales?page=1&per_page=10&date_start=${today3}&unit_id=${unit_id}&search=`;
        let urlRequestDatails = `/v2/admin/reports/details?page=1&per_page=4&filter=universal&date_start=${today3}&date_end=${today3}&unit_id=${unit_id}&user_id=`;
        let urlRequestReports = `/v2/admin/reports?page=1&per_page=10&filter=universal&search=&date_start=${start}&date_end=${end}&unit_id=${unit_id}`;

        cy.waiting('[data-cy="img_relatorios"]');
        cy.get('[data-cy="img_relatorios"]', {timeout: 1000}).click();
        cy.intercept('GET', urlRequestScales).as('scales');
        cy.intercept('GET', urlRequestDatails).as('datails');
        cy.intercept('GET', urlRequestReports).as('reports');
        cy.get('[data-cy="relatorios_cards"]').contains('Plantões').click();
        cy.wait('@scales').its('response.statusCode').should('eq', 200);
        cy.wait('@datails').its('response.statusCode').should('eq', 200);
        cy.wait('@reports').its('response.statusCode').should('eq', 200);
        
    });
});
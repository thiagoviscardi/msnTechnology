/// <reference types="cypress" />

const moment = require('moment'); 
const today1 = moment(); 
const today2 = moment(); 
const todayWeek = today1.day();
const start = moment(today1.subtract(getStartWeek(todayWeek), 'days')).format('YYYY-MM-DD');
const end = moment(today2.add(getEndWeek(todayWeek), 'days')).format('YYYY-MM-DD');

const hospitais_permitidos = Cypress.env('hospital_selecionado');
const unit_id = 61;
const company_id = 3;

describe('Dashboard', () => {

    
  before(() => {
        cy.login();
        cy.selecionarHospitaisInicio();
    });

    it('Filtro Companhia', () => {
        let urlRequest = `/v2/admin/dashboard?date_start=${start}&date_end=${end}&company_id=${company_id}`;
        cy.intercept('GET', urlRequest).as('get_dashboard_company');
        cy.waiting('[data-cy="div_metricas"]');
        cy.get('[data-cy="select_company"]', {timeout: 5000}).type('SempreVida{enter}', {delay:100});
        cy.wait('@get_dashboard_company').then( response => {
            expect(response.response.statusCode).eq(200);
        });
    });

    it('Filtro Médico', () => {
        cy.visit('/dashboard');

        let urlRequest = `/v2/admin/dashboard?date_start=${start}&date_end=${end}&group_type=doctor`;
        cy.intercept('GET', urlRequest).as('get_dashboard_professional_type');
        cy.waiting('[data-cy="div_metricas"]');
        cy.get('[data-cy="select_group_type"]').type('Médico{enter}', {delay:100});
        cy.wait('@get_dashboard_professional_type').then( response => {
            expect(response.response.statusCode).eq(200);
        });
    });

    it('Filtro Hospital', () => {
        cy.visit('/dashboard');
        let urlRequest = `/v2/admin/dashboard?date_start=${start}&date_end=${end}&unit_id=${unit_id}&company_id=1`;
        cy.intercept('GET', urlRequest).as('get_dashboard_unit');
        cy.waiting('[data-cy="div_metricas"]');
        cy.get('[data-cy="select_unit"] div div input').type(`${hospitais_permitidos}{enter}`, {delay:150, force: true});
        cy.wait('@get_dashboard_unit').then( response => {
            expect(response.response.statusCode).eq(200);
        });
    });

})

function getStartWeek(day) {
    switch (day) {
        case 0: return 6;
        case 1: return 0;
        case 2: return 1;
        case 3: return 2;
        case 4: return 3;
        case 5: return 4;
        case 6: return 5;
    }
}

function getEndWeek(day) {
    switch (day) {
        case 0: return 0;
        case 1: return 6;
        case 2: return 5;
        case 3: return 4;
        case 4: return 3;
        case 5: return 2;
        case 6: return 1;
    }
}
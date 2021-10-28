/// <reference types="cypress" />

describe('Agenda da semana com e sem assinatura', () => {

    before(() => {
        cy.logout();
        cy.login();
        cy.selecionarHospitaisInicio();
    });
    
    it('Agendar com Assinatura', () => {
      
        cy.get('#btnAgenda').click({delay:150, force: true});
        cy.get('[data-cy="div_agenda"]').contains('Agenda da semana').click();
        cy.wait(3000);
        cy.waiting('#Escalas');
        cy.get('#Escalas').type(`Basico{enter}`, {delay:600});
        cy.waiting('#Filtrar')
        cy.get('#Filtrar').click();

        cy.get('[data-cy="container_card_agendamento"]').as('agendamentos');
        cy.get('@agendamentos').then( $agendas => {
            let arrayAgendas = $agendas;
            let validar = false;

            for (var i = 0; i < arrayAgendas.length ; i++) {
                debugger
                if (arrayAgendas[i].innerText.indexOf('Thiago Tancredi') !== -1) {
                    validar = true;
                }
            }

            cy.wait(1000);
            if (validar) {
                cy.get('[data-cy="span_icon_assignment"]').should('be.visible');
            } else {
                cy.get('#AdicionarPlantao', { timeout: 13000 }).first().click();
                cy.contains('Selecione o profissional').click().type(`Thiago Tancredi{enter}`, { delay: 200 });
                cy.get('[type="submit"]').click();

                cy.get('#AdicionarPlantao', {timeout: 6000});
                cy.get('[data-cy="span_icon_assignment"]').should('be.visible');
            }

        })

    });

    it('Agendar sem Assinatura', () => {
      
        cy.get('#btnAgenda').click({delay:150, force: true});
        cy.get('[data-cy="div_agenda"]').contains('Agenda da semana').click();
        cy.wait(3000);
        cy.waiting('#Escalas');
        cy.get('#Escalas').type(`teste sem assinatura{enter}`, {delay:600});
        cy.waiting('#Filtrar')
        cy.get('#Filtrar').click();

        cy.InputProfissional();
        cy.get('[data-cy="span_icon_assignment"]').should('not.exist');

    });

});
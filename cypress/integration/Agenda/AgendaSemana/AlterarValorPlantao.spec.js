/// <reference types="cypress" />

describe('Alterar Valor do Plantão', () => {

    it('Agenda subtrair Valor | V2', () => {
        cy.login();
        cy.selecionarHospitaisInicio();

        cy.get('#btnAgenda').click({ delay: 150, force: true });
        cy.contains('Agenda da semana').click();
        cy.wait(2000);
        cy.waiting('#Escalas');
        cy.get('#Escalas').type(`Basico 11{enter}`, { delay:600 });
        cy.get('#Filtrar').click();

        cy.InputProfissional();

        cy.intercept('GET', '**/v1/units/61/scales').as(`units`);
        cy.waiting('#btnFiltro');
        cy.wait(3000);
        cy.contains('Confirmado').eq(0).click();

        cy.waiting('#VerAgendaProf');
        cy.get('#BtnAlterarValor').click()

        cy.waiting('#BtnRemoverValor')
        cy.get('#BtnRemoverValor').click()

        cy.waiting('#FildRemoverVaor')

        cy.intercept('POST', '**/value_change').as('Alterado')
        cy.intercept('GET', '**/v1/agendas/**').as('Price')
        
        cy.get('#FildRemoverVaor').type('0,5')
        cy.get('#BtnSalvar').click()

        cy.waiting('#VerAgendaProf')
      
        cy.wait('@Price').then((priceShedule) => {

           expect(priceShedule.response.statusCode).eq(200);

        })
        cy.waiting('[title="Valor do plantão alterado"]')
        cy.get('[title="Valor do plantão alterado"]').first().click()
        cy.waiting('#Info')
        cy.get('#Info').click()
        cy.get('body').should('contain','Valor original: ')
        
        cy.get('body').should('contain','Valor Atual')

    });
});

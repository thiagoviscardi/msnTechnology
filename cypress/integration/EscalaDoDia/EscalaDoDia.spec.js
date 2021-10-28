/// <reference types="cypress" />

describe('Escala do Dia', () => {
    before(() => {
        cy.logout();
        cy.login();
        cy.selecionarHospitaisInicio();
    })

    it('Plantões Realizados', () => {
        cy.waiting('[data-cy="img_escala_do_dia"]');
        cy.get('[data-cy="img_escala_do_dia"]').click();

        cy.wait(2000);
        cy.get('[data-cy="container_cards_btn_qtd"]').eq(0).then( $p => {
            var quant_indicada_card = $p.text();

            cy.get('[data-cy="container_cards"] button').eq(0).click();
            cy.wait(2000);
            cy.get('[data-cy="div_cards_professionals_scale"]').then( $div_container_cards_professionals => {
                expect($div_container_cards_professionals[0].children).to.have.length(quant_indicada_card);
            })
        }) 
        
    });

    it('Plantões Ocorrendo', () => {
        cy.visit('/escala-do-dia');

        cy.wait(2000);
        cy.get('[data-cy="container_cards_btn_qtd"]').eq(1).then( $p => {
            var quant_indicada_card = $p.text();

            cy.get('[data-cy="container_cards"] button').eq(1).click();
            cy.wait(2000);
            cy.get('[data-cy="div_cards_professionals_scale"]').then( $div_container_cards_professionals => {
                expect($div_container_cards_professionals[0].children).to.have.length(quant_indicada_card);
            })
        }) 
        
    });

    it('Plantões Escalados', () => {
        cy.visit('/escala-do-dia');

        cy.wait(2000);
        cy.get('[data-cy="container_cards_btn_qtd"]').eq(2).then( $p => {
            var quant_indicada_card = $p.text();

            if (quant_indicada_card > 12) {
                quant_indicada_card = 12;
            }

            cy.get('[data-cy="container_cards"] button').eq(2).click();
            cy.wait(2000);
            cy.get('[data-cy="div_cards_professionals_scale"]').then( $div_container_cards_professionals => {
                expect($div_container_cards_professionals[0].children).to.have.length(quant_indicada_card);
            })
        }) 
        
    });

    it('Todos os Plantões', () => {
        cy.visit('/escala-do-dia');
        let urlRequestOperations = `/v2/admin/agendas/operations?page=1&per_page=12&filter=universal&search=&**`;

        cy.wait(2000);
        cy.intercept('GET', urlRequestOperations).as('operations');
        cy.get('[data-cy="container_cards"] button').eq(3).click();
        cy.wait(2000); //WAIT PARA EVITAR ERRO 422 PORQUE O CYPRESS VAI MUITO RÁPIDO
        cy.wait('@operations').its('response.statusCode').should('eq', 200);
    });

    it('Enviar Notificações Plantões Escalados', () => {
        cy.visit('/escala-do-dia');
        cy.get('header div button').eq(0).click();
        cy.wait(2000);
        cy.get('[data-cy="container_cards"] button').eq(2).click();
        cy.wait(2000);
        cy.get('#EditarCard', {timeout: 5000}).eq(0).click();
        cy.get('[data-cy="send_alert"]').click();
        cy.get('[data-cy="select_modal_send_notification"]').type('Notificação Cypress{enter}');
        cy.get('[data-cy="btn_modal_send_alert"]').click();
        cy.get('[data-cy="modal_success_send_alert"]', {timeout: 5000});
    });

});
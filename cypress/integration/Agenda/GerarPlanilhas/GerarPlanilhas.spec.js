/// <reference types="cypress" />

const hospital = 'Hcamp'
const escala = "A";

//TIRAR SKIP APÓS FINALIZAR ISSUE https://github.com/thinkideaapp/plantaoextra-admin-v2/issues/507
describe.skip('Gerar Planilhas', () => {
    before(() => {
        cy.login();
      });
      
      it('Operacional', () => {
        cy.visit('/agenda');
        cy.get('[data-cy="div_agenda"]').children().eq(2).click();
        cy.get('[data-cy="inputContainer_modal_gerar_planilhas"]').should('contain', 'Escolha o tipo de planilha');
        cy.get('[data-cy="select_hospital"]').click().type(`${hospital}{enter}`,{delay:1000});
        cy.get('[id="Selecione a escala"]').click().type(`${escala}{enter}`,{delay:600});
        cy.intercept('/v1/reports/excel/**', ( req ) => { 
          req.reply ( ( res )  =>  { 
            expect(res.statusCode).to.equal( 200 ); 
          }); 
        });
        cy.get('[type=submit]').click();
        cy.wait(8000);
      });

      it('Operacional MP', () => {
        cy.visit('/agenda');
        cy.get('[data-cy="div_agenda"]').children().eq(2).click();
        cy.get('[data-cy="inputContainer_modal_gerar_planilhas"]').should('contain', 'Escolha o tipo de planilha');
        cy.get('[role="radiogroup"] [type="radio"]').eq(1).click({force: true});
        cy.get('[data-cy="select_hospital"]').click().type(`${hospital}{enter}`,{delay:600});
        cy.get('[id="Selecione a escala"]').click().type(`${escala}{enter}`,{delay:600});
        cy.intercept('/v2/admin/reports/excel/**', ( req ) => { 
          req.reply ( ( res )  =>  { 
            expect(res.statusCode).to.equal( 200 ); 
          }); 
        });
        cy.get('[type=submit]').click();
        cy.wait(8000);
      });

      it('Financeiro', () => {
        cy.visit('/agenda');
        cy.get('[data-cy="div_agenda"]').children().eq(2).click();
        cy.get('[data-cy="inputContainer_modal_gerar_planilhas"]').should('contain', 'Escolha o tipo de planilha');
        cy.get('[role="radiogroup"] [type="radio"]').eq(2).click({force: true});
        cy.get('[data-cy="select_hospital"]').click().type(`${hospital}{enter}`,{delay:600});
        cy.get('[id="Selecione a escala"]').click().type(`${escala}{enter}`,{delay:600});
        cy.get('[data-cy="inputContainer1"]').click().type('Analista de TI{enter}',{delay:600});
        cy.intercept('/v1/reports/excel/financial**', ( req ) => { 
          req.reply ( ( res )  =>  { 
            expect(res.statusCode).to.equal( 200 ); 
          }); 
        });
        cy.get('[type=submit]').click();
        cy.wait(8000);
      });

});
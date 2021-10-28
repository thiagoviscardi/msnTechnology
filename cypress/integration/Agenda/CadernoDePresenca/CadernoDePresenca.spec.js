/// <reference types="cypress" />

const hospitais_permitidos = Cypress.env('hospital_selecionado');
const escala = "Basico 11"

//TIRAR SKIP APÓS FINALIZAR ISSUE https://github.com/thinkideaapp/plantaoextra-admin-v2/issues/507
describe.skip('Caderno de Presença', () => {
  beforeEach(() => {
    cy.login();
  });
  it('Imprimir caderno presença', () => {
    cy.visit('/agenda');
    cy.contains('Caderno de presença').click();
    cy.get('[data-cy="select_hospital"]').type(`${hospitais_permitidos}{enter}`, {delay:150});
    cy.get('[id="Selecione a escala"]').type(`${escala}{enter}`, {delay:400});
    cy.get('[data-cy="inputCalendar"]').click();
    cy.get('[data-cy="containerCalendar"]').contains('jun').click();
    
    //Existe um problema no download com Cypress e essa solução gambiarra proposta na página https://github.com/cypress-io/cypress/issues/14857
    cy.window().document().then( function  (doc) { 
        doc.addEventListener( 'click', () => { 
          setTimeout( function  () { 
            doc.location.reload() 
          }, 8000 ) 
        })
        
        cy.intercept('/v1/agendas/pdf**', ( req ) => { 
          req.reply ( ( res )  =>  { 
            expect(res.statusCode).to.equal( 200 ); 
          }); 
        });
        
        cy.get('[data-cy="footerButton"] button').last().click();
        cy.wait(10000)
    });

  });
});

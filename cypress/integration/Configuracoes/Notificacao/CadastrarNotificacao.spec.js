/// <reference types="cypress" />
var faker = require('faker-br');

let title = faker.name.firstName();
let conteudo   = faker.company.companyName();
let title2 = faker.company.companyName();

describe('Cadastrar notificação', () => {
    before(() => {
        cy.login();
    })
    
    after(() => {
        cy.logout();
    })

    it('Cadastrar Template notificao | V2', () => {
        cy.selecionarHospitaisInicio();
        cy.visit('/settings/notificacoes/cadastrar');
        cy.waiting('[name="title"]');
        cy.get('[name="title"]').type(title);
        cy.get('[name="text"]').type(conteudo);
        cy.intercept('POST','**/v2/notifications').as('cadastroNotificacao');
        cy.get('[type="submit"]').click(); 
        cy.wait('@cadastroNotificacao').then((resp)=>{

            expect(resp.response.body.msg).to.equals('Cadastrado com Sucesso');
            expect(resp.response.body.status).to.equals('Created');
        })
    });

    it('Editar Template notificao | V2', () => {
        cy.visit('/settings/notificacoes');
        cy.waiting('#myInput')
        cy.get('#myInput').clear().type(title);
        cy.waiting('[title="Editar"]');
        cy.get('[title="Editar"]').eq(0).click({force: true});
        cy.waiting('[name="title"]');
        cy.get('[name="title"]').clear().type(title2);
        cy.get('[name="text"]').clear().type(conteudo);
        cy.intercept('PUT','/v2/notifications/**').as('EditarNotificacao');
        cy.get('[type="submit"]').click(); 
        cy.wait('@EditarNotificacao').then((resp)=>{

            expect(resp.response.body.msg).to.equals('Atualizado com Sucesso');
            expect(resp.response.body.status).to.equals('OK');
        });
    });

    it('Excluir Template notificao | V2', () => {
        cy.visit('/settings/notificacoes');
        cy.waiting('#myInput')
        cy.get('#myInput').clear().type(title2);
        cy.waiting('[title="Deletar"]');
        cy.get('[title="Deletar"]').eq(0).click({force: true});
        cy.waiting('#alert-dialog-title');
        cy.intercept('DELETE','/v2/notifications/**').as('DeletarNotificacao');
        cy.intercept('GET','**/v2/notifications?page=1&per_page=10&search=').as('GetListNotfic');
        cy.get('[type="button"]').contains('Confirmar').click();
        cy.wait('@DeletarNotificacao').then((resp)=>{

            expect(resp.response.body.msg).to.equals('Deletado com Sucesso');
            expect(resp.response.body.status).to.equals('OK');
        })
        cy.waiting('#myInput')
        cy.get('#myInput').clear()
        cy.wait('@GetListNotfic').then((resp)=>{

            expect(resp.response.body.msg).to.equals('Consulta Realizada com Sucesso');
            expect(resp.response.body.status).to.equals('OK');
            expect(resp.response.body.status).to.not.null
            expect(resp.response.body.status).to.not.undefined
        })
    });
});  
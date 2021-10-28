/// <reference types="cypress" />
import { getTokenUserId } from "../AUTH/Token.request.js";
import { cadastrarAdministrador } from "../../support/Requests/CadastrarAdministrador.js";
import { trocarSenhaUsuario } from "../../support/Requests/TrocarSenhaUsuario.js";
import { deletarAdministrador } from "../../support/Requests/DeletarAdministrador.js";

var faker = require('faker-br');

describe('Acesso de recursos por Grupo de Permissões diferentes', () => {

    var email_admin = "apresentação@gmail.com";
    const senha = "123456";

    var nome_user = faker.name.findName();
    var email_user = faker.internet.email();
    var cpf_user = faker.br.cpf();
    const group_id_user = 39;
    var id_user = 0;

    var token = "";

    after(()=>{
        cy.log(`NOME USUÁRIO: ${nome_user}`);
        deletarAdministrador(id_user, token).then( resp_deletar_admin => {
            expect(resp_deletar_admin.status).to.eq(200);
        })
    })

    it('Usuário Administrador acesso Agenda da Semana no passado', () => {
                    
        cy.logout();
        cy.get('#email').type(email_admin, { log: false });
        cy.get('#password').type(senha, { log: false });
        cy.get('#Entrar').click();
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 11000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        
        cy.intercept('GET', '**/v1/units**').as('units')
        cy.get('ul div', { timeout: 20000 }).eq(0).click();
        cy.wait(100);
        cy.get('#btnFiltrarHospital').click();
        cy.waiting('[data-cy="div_metricas"]');
        cy.wait('@units').then((resp) => {
            expect(resp.response.body.total).to.not.null
            expect(resp.response.body.total).to.not.undefined
        })
        cy.waiting('#btnSair')

        cy.visit('/agenda');
        cy.get('[data-cy="div_agenda"]').contains('Agenda da semana').click();
        cy.wait(3000);
        cy.waiting('#Escalas');
        cy.get('#Escalas').type(`Basico{enter}`, {delay:600});
        cy.waiting('#Filtrar')
        cy.get('#Filtrar').click(); 

        cy.get('[data-cy="btn_backArrow_calendar"]').click();
        cy.waiting('#div_container_agenda');
        cy.get('[data-cy="btn_backArrow_calendar"]').click();
        cy.waiting('#div_container_agenda');
        cy.get('[data-cy="btn_backArrow_calendar"]').click();
        cy.waiting('#div_container_agenda');
        cy.get('[data-cy="btn_backArrow_calendar"]').click();
        cy.waiting('#div_container_agenda');
        cy.get('[data-cy="btn_backArrow_calendar"]').click();
        cy.waiting('#div_container_agenda');
        cy.wait(1000);
        
        //ARRUMAR UMA FORMA VALIDAR QUE NÃO SE ESTÁ VAZIO A AGENDA NESSA DATA
        // cy.InputProfissional();

        cy.get('[data-cy="container_card_agendamento"]').eq(0).click();
        cy.get('[data-cy="btn_cancelar_plantao"]', {timeout: 8000}).click();
        cy.get('[data-cy="modal_cancelar_agendamento"]').contains('Cancelar agendamento');
        cy.get('[data-cy="modal_cancelar_agendamento"] textarea').eq(0).type('teste{esc}');

        cy.get('[data-cy="btn_substituir_plantao"]', {timeout: 5000}).click();
        cy.get('[data-cy="modal_substituir_profissional_agendamento"]').contains('Selecione o profissional substituto');
        cy.get('[data-cy="modal_substituir_profissional_agendamento"]').type('teste{esc}');
        
        cy.get('[data-cy="btn_pagar_plantao"]', {timeout: 5000}).click();
        cy.get('[data-cy="modal_pagar_agendamento"]').contains('Colocar plantão com pagamento à vista');
        cy.get('[data-cy="modal_pagar_agendamento"] textarea').eq(0).type('teste{esc}');

    })

    it('Usuário Sistema acesso Agenda da Semana no passado', () => {
        cy.logout();
        cy.login();
        cy.selecionarHospitaisInicio();

        cy.visit('/agenda');
        cy.get('[data-cy="div_agenda"]').contains('Agenda da semana').click();
        cy.wait(3000);
        cy.waiting('#Escalas');
        cy.get('#Escalas').type(`Basico{enter}`, {delay:600});
        cy.waiting('#Filtrar')
        cy.get('#Filtrar').click(); 

        cy.get('[data-cy="btn_backArrow_calendar"]').click();
        cy.waiting('#div_container_agenda');
        cy.get('[data-cy="btn_backArrow_calendar"]').click();
        cy.waiting('#div_container_agenda');
        cy.get('[data-cy="btn_backArrow_calendar"]').click();
        cy.waiting('#div_container_agenda');
        cy.get('[data-cy="btn_backArrow_calendar"]').click();
        cy.waiting('#div_container_agenda');
        cy.get('[data-cy="btn_backArrow_calendar"]').click();
        cy.waiting('#div_container_agenda');
        cy.wait(1000);

        cy.get('[data-cy="container_card_agendamento"]').eq(0).click();
        cy.get('[data-cy="btn_cancelar_plantao"]', {timeout: 6000}).click();
        cy.get('[data-cy="modal_cancelar_agendamento"]').contains('Cancelar agendamento');
        cy.get('[data-cy="modal_cancelar_agendamento"] textarea').eq(0).type('teste{esc}');

        cy.get('[data-cy="btn_substituir_plantao"]', {timeout: 5000}).click();
        cy.get('[data-cy="modal_substituir_profissional_agendamento"]').contains('Selecione o profissional substituto');
        cy.get('[data-cy="modal_substituir_profissional_agendamento"]').type('teste{esc}');
        
        cy.get('[data-cy="btn_pagar_plantao"]', {timeout: 5000}).click();
        cy.get('[data-cy="modal_pagar_agendamento"]').contains('Colocar plantão com pagamento à vista');
        cy.get('[data-cy="modal_pagar_agendamento"] textarea').eq(0).type('teste{esc}');

    })
    
    it('Usuário Comum acesso Agenda da Semana no passado', () => {
        getTokenUserId(Cypress.env('email'), Cypress.env('pass')).then( resp_get_access_token => {
            expect(resp_get_access_token.status).to.eq(200);
            token = resp_get_access_token.body.access_token;
            cy.log(token);

            cadastrarAdministrador(token, nome_user, cpf_user, email_user, group_id_user).then( resp_cadastro_admin => {
                expect(resp_cadastro_admin.status).to.eq(201);
                debugger
                id_user = resp_cadastro_admin.body.data.id;
                cy.log(id_user);

                trocarSenhaUsuario(token, id_user, senha).then( resp_troca_senha => {
                    expect(resp_troca_senha.status).to.eq(200);
                    
                    cy.logout();
                    cy.get('#email').type(email_user, { log: false });
                    cy.get('#password').type(senha, { log: false });
                    cy.get('#Entrar').click();
                    cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 11000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
                    
                    cy.intercept('GET', '**/v1/units**').as('units')
                    cy.get('ul div', { timeout: 20000 }).eq(0).click();
                    cy.wait(100);
                    cy.get('#btnFiltrarHospital').click();
                    cy.waiting('[data-cy="div_metricas"]');
                    cy.wait('@units').then((resp) => {
                        expect(resp.response.body.total).to.not.null
                        expect(resp.response.body.total).to.not.undefined
                    })
                    cy.waiting('#btnSair')

                    cy.visit('/agenda');
                    cy.get('[data-cy="div_agenda"]').contains('Agenda da semana').click();
                    cy.wait(3000);
                    cy.waiting('#Escalas');
                    cy.get('#Escalas').type(`Basico{enter}`, {delay:600});
                    cy.waiting('#Filtrar')
                    cy.get('#Filtrar').click(); 

                    cy.get('[data-cy="btn_backArrow_calendar"]').click();
                    cy.waiting('#div_container_agenda');
                    cy.get('[data-cy="btn_backArrow_calendar"]').click();
                    cy.waiting('#div_container_agenda');
                    cy.get('[data-cy="btn_backArrow_calendar"]').click();
                    cy.waiting('#div_container_agenda');
                    cy.get('[data-cy="btn_backArrow_calendar"]').click();
                    cy.waiting('#div_container_agenda');
                    cy.get('[data-cy="btn_backArrow_calendar"]').click();
                    cy.waiting('#div_container_agenda');
                    cy.wait(1000);
                    
                    cy.get('[data-cy="container_card_agendamento"]').first().click();
                    cy.get('[data-cy="btn_cancelar_plantao_disabled"]', {timeout: 6000});
                    cy.get('[data-cy="btn_substituir_plantao_disabled"]', {timeout: 5000});
                    cy.get('[data-cy="btn_pagar_plantao_disabled"]', {timeout: 5000});

                })
            })
        })
    })

    it('Usuário Administrador acesso Agenda da Semana hoje', () => {
                    
        cy.logout();
        cy.get('#email').type(email_admin, { log: false });
        cy.get('#password').type(senha, { log: false });
        cy.get('#Entrar').click();
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 11000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        
        cy.intercept('GET', '**/v1/units**').as('units')
        cy.get('ul div', { timeout: 20000 }).eq(0).click();
        cy.wait(100);
        cy.get('#btnFiltrarHospital').click();
        cy.waiting('[data-cy="div_metricas"]');
        cy.wait('@units').then((resp) => {
            expect(resp.response.body.total).to.not.null
            expect(resp.response.body.total).to.not.undefined
        })
        cy.waiting('#btnSair')

        cy.visit('/agenda');
        cy.get('[data-cy="div_agenda"]').contains('Agenda da semana').click();
        cy.wait(3000);
        cy.waiting('#Escalas');
        cy.get('#Escalas').type(`Basico{enter}`, {delay:600});
        cy.waiting('#Filtrar')
        cy.get('#Filtrar').click(); 

        cy.get('[data-cy="container_card_agendamento"]', {timeout: 6000}).first().click();
        cy.get('[data-cy="btn_cancelar_plantao"]', {timeout: 6000}).click();
        cy.get('[data-cy="modal_cancelar_agendamento"]').contains('Cancelar agendamento');
        cy.get('[data-cy="modal_cancelar_agendamento"] textarea').eq(0).type('teste{esc}');

        cy.get('[data-cy="btn_substituir_plantao"]', {timeout: 5000}).click();
        cy.get('[data-cy="modal_substituir_profissional_agendamento"]').contains('Selecione o profissional substituto');
        cy.get('[data-cy="modal_substituir_profissional_agendamento"]').type('teste{esc}');
        
        cy.get('[data-cy="btn_pagar_plantao"]', {timeout: 5000}).click();
        cy.get('[data-cy="modal_pagar_agendamento"]').contains('Colocar plantão com pagamento à vista');
        cy.get('[data-cy="modal_pagar_agendamento"] textarea').eq(0).type('teste{esc}');

    })

    it('Usuário Sistema acesso Agenda da Semana hoje', () => {
        cy.logout();
        cy.login();
        cy.selecionarHospitaisInicio();

        cy.visit('/agenda');
        cy.get('[data-cy="div_agenda"]').contains('Agenda da semana').click();
        cy.wait(3000);
        cy.waiting('#Escalas');
        cy.get('#Escalas').type(`Basico{enter}`, {delay:600});
        cy.waiting('#Filtrar')
        cy.get('#Filtrar').click(); 

        cy.get('[data-cy="container_card_agendamento"]', {timeout: 6000}).first().click();
        cy.get('[data-cy="btn_cancelar_plantao"]', {timeout: 6000}).click();
        cy.get('[data-cy="modal_cancelar_agendamento"]').contains('Cancelar agendamento');
        cy.get('[data-cy="modal_cancelar_agendamento"] textarea').eq(0).type('teste{esc}');

        cy.get('[data-cy="btn_substituir_plantao"]', {timeout: 5000}).click();
        cy.get('[data-cy="modal_substituir_profissional_agendamento"]').contains('Selecione o profissional substituto');
        cy.get('[data-cy="modal_substituir_profissional_agendamento"]').type('teste{esc}');
        
        cy.get('[data-cy="btn_pagar_plantao"]', {timeout: 5000}).click();
        cy.get('[data-cy="modal_pagar_agendamento"]').contains('Colocar plantão com pagamento à vista');
        cy.get('[data-cy="modal_pagar_agendamento"] textarea').eq(0).type('teste{esc}');

    })

    it('Usuário Comum acesso Agenda da Semana hoje', () => {
                    
        cy.logout();
        cy.get('#email').type(email_user, { log: false });
        cy.get('#password').type(senha, { log: false });
        cy.get('#Entrar').click();
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 11000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        
        cy.intercept('GET', '**/v1/units**').as('units')
        cy.get('ul div', { timeout: 20000 }).eq(0).click();
        cy.wait(100);
        cy.get('#btnFiltrarHospital').click();
        cy.waiting('[data-cy="div_metricas"]');
        cy.wait('@units').then((resp) => {
            expect(resp.response.body.total).to.not.null
            expect(resp.response.body.total).to.not.undefined
        })
        cy.waiting('#btnSair')

        cy.visit('/agenda');
        cy.get('[data-cy="div_agenda"]').contains('Agenda da semana').click();
        cy.wait(3000);
        cy.waiting('#Escalas');
        cy.get('#Escalas').type(`Basico{enter}`, {delay:600});
        cy.waiting('#Filtrar')
        cy.get('#Filtrar').click(); 

        cy.get('[data-cy="container_card_agendamento"]', {timeout: 6000}).first().click();
        cy.get('[data-cy="btn_cancelar_plantao_disabled"]', {timeout: 6000}).click();
        cy.get('[data-cy="modal_cancelar_agendamento"]').contains('Cancelar agendamento');
        cy.get('[data-cy="modal_cancelar_agendamento"] textarea').eq(0).type('teste{esc}');

        cy.get('[data-cy="btn_substituir_plantao_disabled"]', {timeout: 5000}).click();
        cy.get('[data-cy="modal_substituir_profissional_agendamento"]').contains('Selecione o profissional substituto');
        cy.get('[data-cy="modal_substituir_profissional_agendamento"]').type('teste{esc}');
        
        cy.get('[data-cy="btn_pagar_plantao_disabled"]', {timeout: 5000}).click();
        cy.get('[data-cy="modal_pagar_agendamento"]').contains('Colocar plantão com pagamento à vista');
        cy.get('[data-cy="modal_pagar_agendamento"] textarea').eq(0).type('teste{esc}');

    })

})
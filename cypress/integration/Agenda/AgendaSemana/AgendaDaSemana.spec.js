/// <reference types="cypress" />
import { deletarNotificacao } from "../../../support/Requests/DeletarNotificacao.js";
import { getListaUsuarios } from "../../../support/Requests/GetListaUsuarios.js";

const faker = require('faker-br');

var tokenValido = "";
var notification_id = "";

describe('Agenda da semana', () => {
    let name = faker.name.findName();
    let dateNumber = new Date();
    let n = dateNumber.getDay();

    before(() => {
        cy.logout();
        cy.login();
        cy.selecionarHospitaisInicio();

        cy.request({
            method: 'POST',
            url: `${Cypress.env('api_url')}/v1/oauth/token`,
            encoding: 'utf8',
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'cGxhbnRhb2JhY2tvZmZpY2U6YnJ1eW5wYW4='
            },
            body: {
                grant_type: "password",
                username: `${Cypress.env('email')}`,
                password: `${Cypress.env('pass')}`
            }
        }).then((token) => {
            tokenValido = token.body.access_token;

            cy.request({
                method: 'POST',
                url: `${Cypress.env('api_url')}/v2/notifications`,
                encoding: 'utf8',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenValido}`
                },
                body: {
                    "title": name,
                    "text": name
                },
                failOnStatusCode: false
            }).then( resp => {
                console.log(resp);
                expect(resp.status).to.eq(201);

                notification_id = resp.body.data.id;
            })
        });
      });
      
      after(()=>{
        cy.log(`ID NOTIFICACAO: ${notification_id}`);
        deletarNotificacao(notification_id, tokenValido).then( resp_deletar_notification => {
            expect(resp_deletar_notification.status).to.eq(200);
        })

    })

    it('Agendar médico em Escala Médico', () => {
      
        cy.get('#btnAgenda').click({delay:150, force: true});
        cy.get('[data-cy="div_agenda"]').contains('Agenda da semana').click();
        cy.wait(3000);
        cy.waiting('#Escalas');
        cy.get('#Escalas').type(`Basico 11{enter}`, {delay:600});
        cy.waiting('#Filtrar')
        cy.get('#Filtrar').click({delay:150, force: true});

        cy.InputProfissional();

        cy.intercept('GET', '**/v1/units/61/scales').as(`units`);
        cy.wait(2000);
        cy.waiting('[data-cy=container_card_agendamento]')

        cy.get('body').then(test =>{
            debugger
            let cardteste = test.find(`:nth-child(1) > :nth-child(${n}) >  [data-cy=container_card_agendamento]`);
            cy.log(cardteste.is(':visible'))

            if(cardteste){
                cy.get(`:nth-child(1) > :nth-child(${n}) >  [data-cy=container_card_agendamento]`).first().click();
            }else{
                cy.InputProfissional();
            }
        })


        cy.waiting('[data-cy="btn_send_alert"]')
        cy.get('[data-cy="btn_send_alert"]').click();
        cy.log(`NOME NOTIFICAÇÃO: ${name}`)
        cy.get('#InputPesquisa').type(`${name}{enter}`, {delay:700})

        cy.waiting('[data-cy="btn_modal_send_alert"]')
        cy.get('[data-cy="btn_modal_send_alert"]').click()
        cy.waiting('[data-cy="btn_fechar_modal"]')
        cy.get('[data-cy="btn_fechar_modal"]').click()
        cy.waiting('#VerAgendaProf');
        cy.get('#VerAgendaProf').click();

        cy.wait('@units').then( Resp => {
            expect(Resp.response.statusCode).eq(200);
            expect(Resp.response.body.msg).to.equal('Consulta Realizada com Sucesso');
        });

        cy.waiting('#titleEntrada');
        cy.get('#titleEntrada').should('have.text','Entrada registrada');
        cy.get('#titleSaida').should('have.text','Saída registrada');
        cy.reload()
        cy.waiting('#titleEntrada');
        cy.get('#titleEntrada').should('have.text','Entrada registrada');
        cy.get('#titleSaida').should('have.text','Saída registrada');

    });

    it('Agendar multiprofissional em Escala Multiprofissional', () => {
      
        cy.get('#btnAgenda').click({delay:150, force: true});
        cy.get('[data-cy="div_agenda"]').contains('Agenda da semana').click();
        cy.wait(3000);
        cy.waiting('#Escalas');
        cy.get('#Escalas').type(`Escala Multiprofissional{enter}`, {delay:600});
        cy.waiting('#Filtrar')
        cy.get('#Filtrar').click();

        cy.InputProfissional();

        cy.intercept('GET', '**/v1/units/61/scales').as(`units`);
        cy.wait(2000);
        cy.waiting('[data-cy=container_card_agendamento]')

        cy.get('body').then(test =>{

            let cardteste = test.find(`:nth-child(1) > :nth-child(${n}) >  [data-cy=container_card_agendamento]`);
            cy.log(cardteste.is(':visible'))

            if(cardteste){
                cy.get(`[data-cy=container_card_agendamento]`).first().click();
            }else{
                cy.InputProfissional();
            }
        })
  
    });

    it('Agendar multiprofissional em Escala Médico', () => {
      
        let nome_multiprofissional = "";

        getListaUsuarios("multi", tokenValido).then( resp_get_lista_multi => {
            expect(resp_get_lista_multi.status).to.eq(200);
            let array = resp_get_lista_multi.body.data;
            nome_multiprofissional = array[Math.floor(Math.random() * array.length)].name;
            cy.log(`NOME MULTIPROFISSIONAL: ${nome_multiprofissional}`);

            cy.get('#btnAgenda').click({delay:150, force: true});
            cy.get('[data-cy="div_agenda"]').contains('Agenda da semana').click();
            cy.wait(3000);
            cy.waiting('#Escalas');
            cy.get('#Escalas').type(`Basico{enter}`, {delay:600});
            cy.waiting('#Filtrar')
            cy.get('#Filtrar').click();

            cy.get('#AdicionarPlantao', { timeout: 13000 }).eq(0).click();
            cy.contains('Selecione o profissional').click().type(`${nome_multiprofissional}{enter}`, { delay: 200 });
            cy.get('[name="professional"]').parents('[style="margin: 20px 0px;"]').should('contain', 'Nenhum resultado encontrado');
            // cy.get('[name="professional"]').parent().parent().parent().should('', 'Nenhum resultado encontrado');

        })

    });

    it('Agendar médico em Escala Multiprofissional', () => {
      
        let nome_medico = "";

        getListaUsuarios("doctor", tokenValido).then( resp_get_lista_medicos => {
            expect(resp_get_lista_medicos.status).to.eq(200);
            let array = resp_get_lista_medicos.body.data;
            nome_medico = array[Math.floor(Math.random() * array.length)].name;
            cy.log(`NOME MÉDICO: ${nome_medico}`);

            cy.get('#btnAgenda').click({delay:150, force: true});
            cy.get('[data-cy="div_agenda"]').contains('Agenda da semana').click();
            cy.wait(3000);
            cy.waiting('#Escalas');
            cy.get('#Escalas').type(`Escala Multiprofissional{enter}`, {delay:600});
            cy.waiting('#Filtrar')
            cy.get('#Filtrar').click();

            cy.get('#AdicionarPlantao', { timeout: 13000 }).eq(0).click();
            cy.contains('Selecione o profissional').click().type(`${nome_medico}{enter}`, { delay: 200 });
            cy.get('[name="professional"]').parents('[style="margin: 20px 0px;"]').should('contain', 'Nenhum resultado encontrado');
            // cy.get('[name="professional"]').parent().parent().parent().should('', 'Nenhum resultado encontrado');

        })

    });


});
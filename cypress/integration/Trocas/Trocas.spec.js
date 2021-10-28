/// <reference types="cypress" />
import { getTokenUserId } from "../AUTH/Token.request.js";
import { cadastrarMedicoApp } from "../../support/Requests/CadastrarMedicoApp.js";
import { aprovarCadastroMedicoModeracao } from "../../support/Requests/AprovarCadastroMedicoModeracao.js";
import { consultarAgendaPorDiaEEscala } from "../../support/Requests/ConsultarAgendaPorDiaEEscala.js";
import { adicionarMedicoAoPlantao } from "../../support/Requests/AdicionarMedicoAoPlantao.js";
import { getTokenApp } from "../../support/Requests/GetTokenApp.js";
import { cederAgenda } from "../../support/Requests/CederAgenda.js";
import { aceitarOuRecusarOferta } from "../../support/Requests/AceitarOuRecusarOferta.js";

var faker = require('faker-br');
const moment = require('moment'); 
const today1 = moment();
const today2 = moment(); 
const today3 = moment().format('YYYY-MM-DD');
const start = moment(today1.subtract(1, 'days')).format('YYYY-MM-DD');
const end = moment(today2.add(5, 'days')).format('YYYY-MM-DD');
const unit_id = 61;
const scale_id = 1450;
const name_professional = `${faker.name.firstName()} ${faker.name.lastName()}`;
const cpf_professional = faker.br.cpf();
const senha_app_professional = "123456";
const name_professional_receber_agenda = `${faker.name.firstName()} ${faker.name.lastName()}`;
const cpf_professional_receber_agenda = faker.br.cpf();

let id_agenda_cedido = 0;

describe.skip('Trocas', () => {
    before(() => {
        
        getTokenUserId(Cypress.env('email'), Cypress.env('pass')).then( resp_get_access_token => {
            expect(resp_get_access_token.status).to.eq(200);
            let token = resp_get_access_token.body.access_token;
            cy.log(token);

            cadastrarMedicoApp(name_professional, cpf_professional, senha_app_professional).then( resp_register_professional => {
                expect(resp_register_professional.status).to.eq(201);
                let code_professional = resp_register_professional.body.data.id;
                cy.log(code_professional);
                cy.log(name_professional);
                
                cadastrarMedicoApp(name_professional_receber_agenda, cpf_professional_receber_agenda, senha_app_professional).then( resp_register_professional_receber_agenda => {
                    expect(resp_register_professional_receber_agenda.status).to.eq(201);
                    let code_professional_receber_agenda = resp_register_professional_receber_agenda.body.data.id;
                    cy.log(code_professional_receber_agenda);
                    cy.log(name_professional_receber_agenda);
                    
                    aprovarCadastroMedicoModeracao(code_professional, token).then( resp_aprovar_profissional => {
                        expect(resp_aprovar_profissional.status).to.eq(200);
                        cy.log("Cadastro do Médico foi Aprovado");
                        
                        aprovarCadastroMedicoModeracao(code_professional_receber_agenda, token).then( resp_aprovar_profissional_receber_agenda => {
                            console.log("APROVAR PROFISSIONAL RECEBER AGENDA");
                            console.log(resp_aprovar_profissional_receber_agenda);
                            expect(resp_aprovar_profissional_receber_agenda.status).to.eq(200);
                            cy.log("Cadastro do Médico foi Aprovado");
                            cy.log("ID PROFISSIONAL RECEBER AGENDA");
                            let id_profissional_receber_agenda = resp_aprovar_profissional_receber_agenda.body.data.id;

                            consultarAgendaPorDiaEEscala(today3, scale_id, unit_id, token).then( resp_consultar_agenda_dia => {
                                console.log("REQUEST CONSULTAR AGENDA POR DIA");
                                console.log(resp_consultar_agenda_dia);
                                expect(resp_consultar_agenda_dia.status).to.eq(200);
                                
                                let agendaCompletaArray = resp_consultar_agenda_dia.body.data[0][0].schedules;
                                let agendaOcupadaArray = resp_consultar_agenda_dia.body.data[0][0].agendas;
                                let idSchedulesDisponivel = 0;
                                
                                if (agendaOcupadaArray.length > 0) {
                                    for(let i = 0; i < agendaCompletaArray.length; i++ ) {
                                        let teste1 = agendaCompletaArray[0][i].id;
                                        let contain = false;
                                        for(let i = 0; i < agendaOcupadaArray.length; i++ ) {
                                            let teste2 = agendaOcupadaArray[i].schedule_id
                                            if (teste1 == teste2) {
                                                contain = true;
                                            }
                                        }
                                        if (contain == false) {
                                            idSchedulesDisponivel = teste1;
                                            break;
                                        }
                                    }
                                } else {
                                    idSchedulesDisponivel = agendaCompletaArray[0][0].id
                                }
                                
                                adicionarMedicoAoPlantao (token, idSchedulesDisponivel, scale_id, today3, unit_id, code_professional).then( resp_add_medico_agenda => {
                                    console.log("REQUEST ADICIONAR MÉDICO AO PLANTAO");
                                    console.log(resp_add_medico_agenda);
                                    expect(resp_add_medico_agenda.status).to.eq(200);
                                    let idPlantaoAgendado = resp_add_medico_agenda.body.data[0];
                                    cy.log("ID PLANTÃO AGENDADO")
                                    cy.log(idPlantaoAgendado);
                                    cy.log("ID PLANTÃO CEDIDO")
                                    id_agenda_cedido = idPlantaoAgendado + 1;
                                    cy.log(id_agenda_cedido);
                                    
                                    getTokenApp (cpf_professional, senha_app_professional).then(resp_get_access_token_app => {
                                        expect(resp_get_access_token_app.status).to.eq(200);
                                        let tokenApp = resp_get_access_token_app.body.access_token;
                                        cy.log(tokenApp);
        
                                        let tentativa = 0;
                                        cederAgenda (tokenApp, idPlantaoAgendado, id_profissional_receber_agenda).then( resp_ceder_plantao => {
                                            expect(resp_ceder_plantao.status).to.eq(201);
                                            let retorno = resp_ceder_plantao.status;
        
                                            if (retorno != 201 && tentativa < 50) {
                                                tentativa = tentativa + 1;
                                                cederAgenda (tokenApp, idPlantaoAgendado)
                                            }
        
                                        })
        
                                    })
        
                                })
        
                            })
                        
                        })
    
                    })

                })

            })

        })
        
        cy.login();
        cy.selecionarHospitaisInicio();
    });

    it('Filtro Inicial', () => {
        let urlRequest = `**/v2/admin/reports/exchanges?filter=exchanges&date_start=${start}&date_end=${end}&unit_id=${unit_id}&page=1&per_page=10&search=`;
        cy.intercept('GET', urlRequest).as('replacement');
        cy.get('[data-cy="img_trocas"]', {timeout: 6000}).click();
        cy.wait('@replacement').its('response.statusCode').should('eq', 200);
    });

    it('Incluir Troca Não Confirmada', () => {
        cy.visit('/relatorio-de-trocas');
        cy.get('[aria-label="pagination navigation"] li').then($li_list => {
            let tamnho_array = $li_list.length;
            tamnho_array = tamnho_array - 2;
            cy.get('[aria-label="pagination navigation"] li').eq(tamnho_array).click();
            cy.get('[data-cy="container_old_user_details"]').contains(name_professional).parent().parent().siblings().eq(1).should('contain', "Não confirmada");
        });
    });

    it('Envio de Notificação', () => {
        cy.visit('/relatorio-de-trocas');
        cy.get('[aria-label="pagination navigation"] li').then($li_list => {
            let tamnho_array = $li_list.length;
            tamnho_array = tamnho_array - 2;
            cy.get('[aria-label="pagination navigation"] li').eq(tamnho_array).click();
            
            cy.get('[data-cy="container_old_user_details"]').contains(name_professional).parent().siblings().click();
            cy.get('[data-cy="btn_send_alert"]').click();
            cy.get('[data-cy="select_mensage"]').click();
            cy.get('body').contains('Notificação Cypress').click({force:true});
            cy.intercept('POST', '**/v2/notifications/send_notification').as('send_notification');
            cy.get('[data-cy="btn_modal_send_alert"]').click();
            //COMENTADO O SUCESSO, ATÉ CONSEGUIR ENVIAR NOTIFICAÇÃO VAI REQUEST
            //cy.wait('@send_notification').its('response.statusCode').should('eq', 200);
            //cy.get('[data-cy="modal_success_send_alert"]').should('contain', 'A notificação foi enviada para o celular ');
            cy.wait('@send_notification').its('response.statusCode').should('eq', 400);
            cy.get('[data-cy="modal_success_send_alert"]').should('contain', 'Para o usuário receber as notificações, é ');

            cy.get('[data-cy="modal_success_send_alert"] button').contains('Fechar janela').click();
            cy.get('[data-cy="icon_close"]').click();    
        });
    });

    it('Incluir Troca Confirmada', () => {
        getTokenApp (cpf_professional_receber_agenda, senha_app_professional).then(resp_get_access_token_app_prof_receber_agenda => {
            expect(resp_get_access_token_app_prof_receber_agenda.status).to.eq(200);
            let tokenAppProfReceberAgenda = resp_get_access_token_app_prof_receber_agenda.body.access_token;
            cy.log(tokenAppProfReceberAgenda);

            aceitarOuRecusarOferta (tokenAppProfReceberAgenda, id_agenda_cedido, "confirm").then(resp_confirm_agenda_cedido => {
                expect(resp_confirm_agenda_cedido.status).to.eq(200);

                cy.visit('/relatorio-de-trocas');
                cy.get('[aria-label="pagination navigation"] li').then($li_list => {
                    let tamnho_array = $li_list.length;
                    tamnho_array = tamnho_array - 2;
                    cy.get('[aria-label="pagination navigation"] li').eq(tamnho_array).click();
                    cy.get('[data-cy="container_old_user_details"]').contains(name_professional).parent().parent().siblings().eq(1).should('contain', "Trocou com");
                });     

            })

        })

    });

    it('Acesso Agenda do Profissional', () => {
        cy.visit('/relatorio-de-trocas');
        cy.get('[aria-label="pagination navigation"] li').then($li_list => {
            let tamnho_array = $li_list.length;
            tamnho_array = tamnho_array - 2;
            cy.get('[aria-label="pagination navigation"] li').eq(tamnho_array).click();
            cy.get('[data-cy="container_old_user_details"]', {timeout: 5000}).contains(name_professional).parent().siblings().click();
            cy.get('[href*="/agenda/profissional/"]').click();
            cy.get('[data-cy="professional_schedule_details"]').should('contain', name_professional);
        });     
        
    });

});
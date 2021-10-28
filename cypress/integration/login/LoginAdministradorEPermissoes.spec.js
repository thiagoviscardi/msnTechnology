/// <reference types="cypress" />
import { getTokenUserId } from "../AUTH/Token.request.js";
import { alterarPermissoesGrupoPermissoes } from "../../support/Requests/AlterarPermissoesGrupoPermissoes.js";

describe('Administrador, acessa várias telas sem permissão e com permissão', () => {

    var token = "";
    const loginAdministrador = 'apresentação@gmail.com';
    const senhaAdministrador = '123456';
    const arrayPermissoesInativas = [];
    const arrayPermissoesAtivar = [{id: 1},{id: 2},{id: 4},{id: 5},{id: 6},{id: 7},{id: 8},{id: 21},{id: 22},{id: 23},{id: 24},{id: 26},{id: 61},{id: 62},{id: 63},{id: 64},{id: 65},{id: 68},{id: 69},{id: 82},{id: 83},{id: 84},{id: 85},{id: 86},{id: 87},{id: 88},{id: 89},{id: 90}];
    const arrayPermissoesAtivarValoresAgenda = [{id: 1},{id: 2},{id: 4},{id: 5},{id: 6},{id: 7},{id: 8},{id: 21},{id: 22},{id: 23},{id: 24},{id: 26},{id: 61},{id: 62},{id: 63},{id: 64},{id: 65},{id: 68},{id: 69},{id: 82},{id: 83},{id: 84},{id: 85},{id: 86},{id: 87},{id: 88},{id: 89},{id: 90},{id: 91}];

    before(() => {
        cy.logout();

        cy.visit('/');
        cy.wait(600);
        cy.get('#email').type(loginAdministrador, { log: false });
        cy.get('#password').type(senhaAdministrador, { log: false });
        cy.get('#Entrar').click();
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 12000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        
        cy.intercept('GET', '**/v1/units**').as('units')
        cy.get('[data-cy="containerDivHospitalSelecionados"] ul div', { timeout: 21000 }).first().click();
        cy.wait(100);
        cy.get('#btnFiltrarHospital').click();
        cy.waiting('[data-cy="div_metricas"]');
        cy.wait('@units').then((resp) => {
            expect(resp.response.body.total).to.not.null
            expect(resp.response.body.total).to.not.undefined
        })
        cy.waiting('#btnSair')

        getTokenUserId(Cypress.env('email'), Cypress.env('pass')).then( resp_get_access_token => {
            expect(resp_get_access_token.status).to.eq(200);
            token = resp_get_access_token.body.access_token;
            cy.log(token);
        })
    })

    it('Usuário Administrador, tentativa de acesso em todas as telas sem permissão, por clique', () => { 
        alterarPermissoesGrupoPermissoes(token, arrayPermissoesInativas).then( resp_alt_perm_grupo_permissoes => {
            console.log(resp_alt_perm_grupo_permissoes);
            expect(resp_alt_perm_grupo_permissoes.status).to.eq(200);
            cy.wait(3000);

            cy.get('#root').should('not.contain', 'Configurações');

            cy.visit('/cadastros');
            cy.reload();
            cy.wait(1000);
            cy.get('[data-cy="cadastros_cards"] div p').contains('Hospitais').click();
            cy.wait(500);
            cy.url().should('include', '/cadastros');
            cy.get('[data-cy="cadastros_cards"] div').should('contain', 'Hospitais');

            cy.get('[data-cy="cadastros_cards"] div p').contains('Escalas').click();
            cy.wait(500);
            cy.url().should('include', '/cadastros');
            cy.get('[data-cy="cadastros_cards"] div').should('contain', 'Escalas');

            cy.get('[data-cy="cadastros_cards"] div p').contains('Empresas').click();
            cy.wait(500);
            cy.url().should('include', '/cadastros');
            cy.get('[data-cy="cadastros_cards"] div').should('contain', 'Empresas');

            cy.get('[data-cy="cadastros_cards"] div p').contains('Profissionais').click();
            cy.wait(500);
            cy.url().should('include', '/cadastros');
            cy.get('[data-cy="cadastros_cards"] div').should('contain', 'Profissionais');

            cy.get('[data-cy="cadastros_cards"] div p').contains('Administradores').click();
            cy.wait(500);
            cy.url().should('include', '/cadastros');
            cy.get('[data-cy="cadastros_cards"] div').should('contain', 'Administradores');

            cy.get('[data-cy="cadastros_cards"] div p').contains('Moderação').click();
            cy.wait(500);
            cy.url().should('include', '/cadastros');
            cy.get('[data-cy="cadastros_cards"] div').should('contain', 'Moderação');


            cy.visit('/relatorios');
            cy.get('[data-cy="relatorios_cards"] div p').contains('Plantões').click();
            cy.wait(500);
            cy.url().should('include', '/relatorios');
            cy.get('[data-cy="relatorios_cards"] div').should('contain', 'Plantões');

            cy.get('[data-cy="relatorios_cards"] div p').contains('Check-In/Check-Out').click();
            cy.wait(500);
            cy.url().should('include', '/relatorios');
            cy.get('[data-cy="relatorios_cards"] div').should('contain', 'Check-In/Check-Out');


            cy.visit('/agenda');
            cy.get('[data-cy="div_agenda"] div p').contains('Agenda da semana').click();
            cy.wait(500);
            cy.url().should('include', '/agenda');
            cy.get('[data-cy="div_agenda"] div').should('contain', 'Agenda da semana');

            cy.get('[data-cy="div_agenda"] div p').contains('Caderno de presença').click();
            cy.wait(500);
            cy.url().should('include', '/agenda');
            cy.get('[data-cy="div_agenda"] div').should('contain', 'Caderno de presença');

            cy.get('[data-cy="div_agenda"] div p').contains('Gerar planilhas').click();
            cy.wait(500);
            cy.url().should('include', '/agenda');
            cy.get('[data-cy="div_agenda"] div').should('contain', 'Gerar planilhas');

        })
    })

    //TIRAR SKIP APÓS CORRIGIR BUG DA ISSUE https://github.com/thinkideaapp/plantaoextra-admin-v2/issues/537
    it.skip('Usuário Administrador, tentativa de acesso em todas as telas sem permissão, por url', () => { 
        
        cy.get('#root').should('not.contain', 'Configurações');

        cy.visit('/settings');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');

        cy.visit('/settings/perfil-de-permissoes');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/settings/perfil-de-permissoes/cadastrar');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/settings/perfil-de-permissoes/editar/2');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');

        cy.visit('/settings/permissions-list');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');

        cy.visit('/settings/companhias');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/settings/companhias/cadastrar');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/settings/companhias/editar/1');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');

        cy.visit('/settings/banks');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        
        cy.visit('/settings/notificacoes');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/settings/notificacoes/cadastrar');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/settings/notificacoes/editar/1');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');

        cy.visit('/settings/suporte');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/settings/suporte/cadastrar');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/settings/suporte/editar/11');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');

        cy.visit('/settings/paises');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');

        cy.visit('/settings/cidades');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');





        cy.visit('/cadastros/hospitais');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/cadastros/hospitais/cadastrar');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/cadastros/hospitais/editar/61');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');

        cy.visit('/cadastros/escalas');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/cadastros/escalas/cadastrar/61');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/escala-completa/61/1170');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/cadastros/escalas/cadastrar/61/1170');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');

        cy.visit('/cadastros/hospitais');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/cadastros/hospitais/cadastrar');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/cadastros/hospitais/editar/61');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');

        cy.visit('/cadastros/empresas');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/cadastros/empresas/cadastrar');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/cadastros/empresas/editar/9');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');

        cy.visit('/cadastros/profissionais');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/cadastros/profissionais/cadastrar');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/cadastros/profissionais/editar/5386');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');

        cy.visit('/cadastros/administradores');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/cadastros/administradores/cadastrar');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        cy.visit('/cadastros/administradores/editar/4888');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');

        cy.visit('/cadastros/solicitacoes');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');




        
        cy.visit('/relatorios/plantoes');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');

        cy.visit('/relatorios/checkin');
        cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 10000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');

    })

    it('Usuário Administrador, tentativa de acesso em todas as telas com permissão, por clique', () => { 
        alterarPermissoesGrupoPermissoes(token, arrayPermissoesAtivar).then( resp_alt_perm_grupo_permissoes => {
            console.log(resp_alt_perm_grupo_permissoes);
            expect(resp_alt_perm_grupo_permissoes.status).to.eq(200);
            cy.wait(2000);

            cy.get('#root').should('not.contain', 'Configurações');

            cy.visit('/cadastros');
            cy.reload();
            cy.wait(1000);
            cy.get('[data-cy="cadastros_cards"] div p').contains('Hospitais').click();
            cy.get('[data-cy="link_cadastrar_hospital"]').click();
            cy.get('main').should('contain', 'Cadastrar novo hospital');
            cy.visit('/cadastros/hospitais/editar/61');
            cy.get('main').should('contain', 'Dados do hospital');

            cy.visit('/cadastros');
            cy.get('[data-cy="cadastros_cards"] div p').contains('Escalas').click();
            cy.get('[data-cy="btn_cadastrar"]').click();
            cy.get('main').should('contain', 'Configurar plantão');
            cy.get('[type="button"]').contains('CANCELAR').click();
            cy.waiting('#myInput');
            cy.get('#myInput').clear().type('Basico 11{enter}');
            cy.waiting('[title="Editar"]');
            cy.get('[title="Editar"]').first().click();
            cy.wait(3000);
            cy.get('main p').first().should('contain', 'A Hospital de Testes ALTERADO');
            cy.get('#editEscala').click();
            cy.get('main').should('contain', 'Configurar plantão');

            cy.visit('/cadastros');
            cy.get('[data-cy="cadastros_cards"] div p').contains('Empresas').click();
            cy.get('[href="/cadastros/empresas/cadastrar"]').click();
            cy.get('main').should('contain', 'Cadastrar nova empresa');
            cy.visit('/cadastros/empresas/editar/9');
            cy.get('main').should('contain', 'Editar empresa');            
            
            cy.visit('/cadastros');
            cy.get('[data-cy="cadastros_cards"] div p').contains('Profissionais').click();
            cy.get('[href="/cadastros/profissional/cadastrar"]').click({force: true});
            cy.get('main').should('contain', 'Dados pessoais');
            cy.visit('/cadastros/profissional/editar/5386');
            cy.get('main').should('contain', 'Dados pessoais'); 
            
            cy.visit('/cadastros');
            cy.get('[data-cy="cadastros_cards"] div p').contains('Administradores').click();
            cy.get('[data-cy="btn_register"]').click();
            cy.get('main').should('contain', 'Cadastrar novo administrador');
            cy.visit('/cadastros/administradores/editar/4888');
            cy.get('main').should('contain', 'Editar Administrador'); 
            
            cy.visit('/cadastros');
            cy.get('[data-cy="cadastros_cards"] div p').contains('Moderação').click();
            cy.get('thead').should('contain', '#');
            



            
            cy.visit('/relatorios');
            cy.wait(1000);
            cy.get('[data-cy="relatorios_cards"] div p').contains('Plantões').click();
            cy.get('thead').should('contain', 'N. de plantões');

            cy.visit('/relatorios');
            cy.wait(1000);
            cy.get('[data-cy="relatorios_cards"] div p').contains('Check-In/Check-Out').click();
            cy.get('header span').should('contain', 'Check-in/Check-out');





            cy.visit('/agenda');
            cy.wait(1000);
            cy.get('[data-cy="div_agenda"] div p').contains('Caderno de presença').click();
            cy.get('[data-cy="modal_gerar_caderno_presenca"]').should('contain', 'Gerar Caderno de Presença');

            cy.visit('/agenda');
            cy.wait(1000);
            cy.get('[data-cy="div_agenda"] div p').contains('Gerar planilhas').click();
            cy.get('[data-cy="inputContainer_modal_gerar_planilhas"]').should('contain', 'Escolha o tipo de planilha');

        })
    })
    
    it('Usuário Administrador, tentativa visualizar valores agenda sem permissão, por clique', () => { 
        
        cy.reload();
        cy.get('#btnAgenda').click({delay:150, force: true});
        cy.get('[data-cy="div_agenda"]').contains('Agenda da semana').click();
        cy.wait(3000);
        cy.waiting('#Escalas');
        cy.get('#Escalas').type(`Basico{enter}`, {delay:600});
        cy.waiting('#Filtrar')
        cy.get('#Filtrar').click();

        cy.get('[data-cy="container_card_agendamento"]', { timeout: 13000 }).eq(1).should('not.contain', '100,00');
        cy.get('[data-cy="container_card_agendamento"]').eq(1).click();
        cy.get('[data-cy="btn_send_alert"]', {timeout: 6000}).siblings().should('not.contain', '100,00');
        cy.get('#VerAgendaProf').click();
        cy.get('[data-cy="div_day_month"]').contains('Confirmado').should('not.contain', '100,00');
        
    })

    it('Usuário Administrador, tentativa visualizar valores agenda com permissão, por clique', () => { 
        alterarPermissoesGrupoPermissoes(token, arrayPermissoesAtivarValoresAgenda).then( resp_alt_perm_grupo_permissoes => {
            console.log(resp_alt_perm_grupo_permissoes);
            expect(resp_alt_perm_grupo_permissoes.status).to.eq(200);
            cy.wait(2000);
            
            cy.get('#btnAgenda').click({delay:150, force: true});
            cy.get('[data-cy="div_agenda"]').contains('Agenda da semana').click();

            cy.get('[data-cy="container_card_agendamento"]', { timeout: 13000 }).eq(1).should('contain', '100,00');
            cy.wait(500);
            cy.get('[data-cy="container_card_agendamento"]').eq(1).children().children().eq(1).children().click();
            cy.get('#Valor', {timeout: 7000}).first().should('contain', '100,00');
            cy.get('#VerAgendaProf').click();
            cy.get('[data-cy="div_day_month"]').contains('100,00');
        })
    })
   

})
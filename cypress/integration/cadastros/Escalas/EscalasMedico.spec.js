/// <reference types="cypress" />
var faker = require('faker-br');

const nome = `Teste ${faker.name.firstName()} ${faker.name.firstName()}`;
const especialidade = "Acupuntura";
const valor = "200";
const coordenador = "Adem Pereira";
const responsavel_tecnico = "Adem Pereira";

const nome2 = `${faker.name.firstName()} ${faker.name.firstName()} Editado`;

describe('Escalas Médico', () => {
    before(() => {
        cy.login();
        cy.selecionarHospitaisInicio();
    });

    it('Incluir', () => {
        cy.visit('/cadastros');
        cy.get('[data-cy="cadastros_cards"]').contains('Escalas').click();

        cy.get('[data-cy="btn_cadastrar"]').click();
        cy.get('[name="name"]').type(nome);
        cy.get('#specialty_id').type(`${especialidade}{enter}`, {delay:300});
        cy.get('[name="budget"]').type(valor);
        cy.get('[data-cy="div_select_coordinator"]').type(`${coordenador}{enter}`, {delay:500});
        cy.get('[data-cy="div_select_technical_manager"]').type(`${responsavel_tecnico}{enter}`, {delay:200});
        cy.intercept('POST', '**/v1/units/61/scales').as('scales');
        cy.get('[data-cy="btn_cadastrar"]').click();
        cy.wait('@scales').its('response.statusCode').should('eq', 201);
        cy.get('[data-cy="btn_fechar_modal"]').click();

        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').type(nome);
        cy.waiting('[data-cy="dataTable"] table tbody tr');
        cy.wait(500);
        cy.get('[data-cy="dataTable"] table tbody tr').eq(0).contains(nome);

    });

    it('Editar e Adicionar Plantão', () => {
        cy.visit('/cadastros/escalas');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').type(nome);
        cy.waiting('[title="Editar"]');

        cy.intercept('POST', '/v1/schedules/**').as('schedules');
        cy.intercept('GET','/v2/admin/specialties?**').as('specialties');
    
        cy.get('[title="Editar"]').eq(0).click();

        cy.waiting('#editEscala')
        cy.get('#editEscala').click();
        cy.wait('@specialties').then((resp)=>{
            expect(resp.response.statusCode).to.equals(200)
        })
        cy.get('[name="budget"]').clear().type('300');
        cy.get('[data-cy="btn_cadastrar"]').click();
        cy.get('[data-cy="btn_fechar_modal"]').click();

        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').type(nome);
        cy.waiting('[title="Editar"]');
        cy.get('[title="Editar"]').eq(0).click();
        cy.get('#Especialidade').type(`Acupuntura{enter}`, {delay:800})
        cy.get('[data-cy="btn_cadastrar_escala"]').click()

        cy.waiting('[data-cy="btn_fechar_modal"]')
        cy.get('[data-cy="btn_fechar_modal"]').click()

        cy.waiting('[data-cy="search"] input')
        cy.get('[data-cy="search"] input').type(nome);
        cy.waiting('[title="Editar"]')
        cy.get('[title="Editar"]').eq(0).click();
        cy.get('[data-cy="btn_adicionar_horario"]').click();
        cy.waiting('[name="hour_start"]');
        cy.get('[name="hour_start"]').type('0800');
        cy.get('[name="hour_end"]').type('1200');
        cy.get('[name="quantity_Professional"]').type('2');
        cy.get('[type="checkbox"]').check();
        cy.get('[name="price"]').type(valor);
        cy.get('[data-cy="btn_adicionar_horario_modal"]').click();
        cy.get('[data-cy="btn_fechar_modal"]', {timeout: 10000}).click();
        
        cy.waiting('[data-cy="search"] input')
        cy.get('[data-cy="search"] input').type(nome);
        cy.waiting('[title="Editar"]')
        cy.get('[title="Editar"]').eq(0).click();
        cy.get('[name="name"]').clear().type(nome2);
        cy.intercept('PUT', '/v1/units/61/scales/**').as('scales');
        cy.get('[type="submit"]').click();
        cy.wait('@scales').its('response.statusCode').should('eq', 200);
        cy.get('[data-cy="btn_fechar_modal"]').click();        

        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').type(nome2);
        cy.waiting('[data-cy="dataTable"] table tbody tr');
        cy.wait(500);
        cy.get('[data-cy="dataTable"] table tbody tr').eq(0).contains(nome2);

    });

    it('Editar e Adicionar Plantão Existente', () => {
      cy.visit('/cadastros/escalas');
      cy.waiting('[data-cy="search"] input');
      cy.get('[data-cy="search"] input').clear().type(nome2);
      
      cy.waiting('[title="Editar"]');
      cy.get('[title="Editar"]').eq(0).click();
      cy.get('[data-cy="btn_adicionar_horario"]').click();
      cy.waiting('[name="hour_start"]');
      cy.get('[name="hour_start"]').type('0800');
      cy.get('[name="hour_end"]').type('1200');
      cy.get('[name="quantity_Professional"]').type('2');
      cy.get('[type="checkbox"]').check();
      cy.get('[name="price"]').type(valor);
      cy.get('[data-cy="btn_adicionar_horario_modal"]').click();
      cy.get('[data-cy="modal_success_send_alert"]').should('contain', 'Horário de escala ja cadastrado');
      cy.get('[data-cy="btn_fechar_modal"]', {timeout: 10000}).click();

  });

  it('Excluir', () => {
      cy.visit('/cadastros/escalas');
      cy.waiting('[data-cy="search"] input');
      cy.get('[data-cy="search"] input').type(nome2);
      cy.waiting('[title="Editar"]');

      cy.get('[title="Deletar"]').eq(0).click();
      cy.intercept('DELETE', `**/v1/scales/61/*`).as('scales_delete');
      cy.get('#alert-dialog-title').siblings().last().children().last().click();
      cy.wait('@scales_delete').its('response.statusCode').should('eq', 200);
      cy.waiting('[data-cy="search"] input');
      cy.reload();
      
      cy.waiting('[data-cy="img_cadastros"]');
      cy.get('[data-cy="search"] input').clear().type(nome2);
      cy.waiting('[data-cy="dataTable"] table tbody');
      cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('not.contain', nome2);

  });

});
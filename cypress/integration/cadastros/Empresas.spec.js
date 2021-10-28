/// <reference types="cypress" />
var faker = require('faker-br');

const nome = `Teste ${faker.name.firstName()}`;
const nome2 = `Teste ${faker.name.firstName()}`;

const cnpj          = faker.br.cnpj();
const rua           = faker.address.streetAddress();
const numero        = faker.random.number();        
const complemento   = faker.company.companyName();
const setor         = faker.address.stateAbbr();
const cep           = "70320140"
const estado        = "Goiás"
const cidade        = "Aparecida de Goiânia"
const observacoes   = faker.name.jobDescriptor();

var id_editar = "";

describe('Empresas', () => {
    
    beforeEach(() => {
        cy.login();
    });

    it('Incluir', () => {
        cy.visit('/cadastros');
        cy.get('[data-cy="cadastros_cards"]').contains('Empresas').click();
        
        cy.get('[href="/cadastros/empresas/cadastrar"]').click();
        cy.get('[name="name"]').type(nome);
        cy.get('[data-cy="input_cnpj"]').type(cnpj);
        cy.get('[data-cy="input_street"]').type(rua);
        cy.get('[data-cy="input_number"]').type(numero);
        cy.get('[data-cy="input_complement"]').type(complemento);
        cy.get('[data-cy="input_district"]').type(setor);
        cy.get('[data-cy="input_code_post"]').type(cep);
        cy.get('[data-cy="input_state"]').type(`${estado}{enter}`, {delay:100});
        cy.wait(2000);
        cy.get('[data-cy="input_city"]').type(`${cidade}{enter}`, {delay:200});
        cy.get('[data-cy="input_description"]').type(observacoes);
        cy.intercept('POST', '**/v1/enterprises').as('enterprises');
        cy.get('[data-cy="btn_cadastrar"]').click();
        cy.wait('@enterprises').its('response.statusCode').should('eq', 201);
        cy.get('[data-cy="btn_fechar_modal"]').click();

        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome);
        cy.waiting('[data-cy="dataTable"] table tbody tr');
        cy.get('[data-cy="dataTable"] table tbody tr', {timeout: 5000}).eq(0).contains(nome);

    });
    
    it('Editar', () => {
        cy.visit('/cadastros/empresas');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome);
        cy.waiting('[title="Editar"]');

        cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
            id_editar = $td.text();
            let urlEditar = `**/v1/enterprises/${id_editar}`;
            cy.get('[title="Editar"]').eq(0).click({force: true});
            cy.waiting('[name="name"]');
            cy.get('[name="name"]').clear().type(nome2);
            cy.intercept('PUT', urlEditar).as('enterprises');
            cy.get('[data-cy="btn_salvar"]').click();
            cy.wait('@enterprises').its('response.statusCode').should('eq', 200);
            cy.get('[data-cy="btn_fechar_modal"]').click();
            
            cy.waiting('[data-cy="search"] input');
            cy.get('[data-cy="search"] input').clear().type(nome2);
            cy.waiting('[data-cy="dataTable"] table tbody tr');
            cy.get('[data-cy="dataTable"] table tbody tr', {timeout: 5000}).eq(0).contains(nome2);
        }); 
    });

    it('Editar cadastro sem Enereço', () => {
        cy.visit('/cadastros/empresas');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').type("A L R CIRURGIOES ASSOCIADOS LTDA EPP");
        cy.waiting('[title="Editar"]');
        cy.get('[title="Editar"]').eq(0).click();
        cy.get('[data-cy="input_cnpj"]');
    });

    it('Excluir', () => {
        cy.visit('/cadastros/empresas');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome2);
        cy.wait(2000);
        cy.get('[title="Deletar"]', {timeout: 10000}).click({force: true});
        cy.waiting("alert-dialog-title");
        cy.get('[type="button"]').contains('Confirmar').click();
        cy.waiting('[data-cy="search"] input');
        cy.wait(3000); //API RETORNA 200 ANTES DE EXCLUIR DADO NO BANCO, ENTÃO A VALIDAÇÃO ABAIXO AINDA TRÁS O ALUNO, PARA TIRAR ESSE WAIT, PRECISA TRATAR O RETORNO DA API PARA RESPONDER, SÓ DEPOIS DE CONFIRMADO A EXCLUSÃO
        cy.reload();
        
        cy.visit('/cadastros/empresas');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome2);
        cy.waiting('[data-cy="dataTable"] table tbody tr');
        cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('not.contain', nome2);
    });

});
/// <reference types="cypress" />
var faker = require('faker-br');

const nome_companhia = `Teste ${faker.name.firstName()}`;
const nome_companhia2 = `${faker.name.firstName()} Editado`;

const email         = faker.internet.email();
const razao_social  = faker.company.suffixes().toString();
const cnpj          = faker.br.cnpj();
const telefone      = "62981651515"
const rua           = faker.address.streetAddress();
const numero        = faker.random.number();        
const complemento   = faker.company.companyName();
const setor         = faker.address.stateAbbr();
const cep           = "70320140"
const estado        = "Goiás"
const cidade        = "Aparecida de Goiânia"
const observacoes   = faker.name.jobDescriptor();

var id_companhia_editar = "";

describe('Companhias', () => {
    before(() => {
        cy.login();
    });

    it('Incluir', () => {
        cy.waiting('[data-cy="img_configuracoes"]');
        cy.get('[data-cy="img_configuracoes"]').click();
        cy.get('[data-cy="container_configuracoes"]').contains('Companhias').click();

        let urlRequestScales = "/v1/companies";
        cy.get('[href="/settings/companhias/cadastrar"]').click();
        cy.get('[data-cy="input_nome"]').type(nome_companhia);
        cy.get('[data-cy="input_email"]').type(email);
        cy.get('[data-cy="input_razao_social"]').type(razao_social);
        cy.get('[data-cy="input_cnpj"]').type(cnpj);
        cy.get('[data-cy="input_cell_phone"]').type(telefone);
        cy.get('[data-cy="input_street"]').type(rua);
        cy.get('[data-cy="input_number"]').type(numero);
        cy.get('[data-cy="input_complement"]').type(complemento);
        cy.get('[data-cy="input_district"]').type(setor);
        cy.get('[data-cy="input_code_post"]').type(cep);
        cy.get('[data-cy="input_state"]').type(`${estado}{enter}`, {delay:100});
        cy.wait(2000);
        cy.get('[data-cy="input_city"]', {timeout: 6000}).type(`${cidade}{enter}`, {delay:150});
        cy.get('[data-cy="input_description"]').type(observacoes);
        cy.intercept('POST', urlRequestScales).as('companies');
        cy.get('[data-cy="footerButton_btns"] button').last().click();
        cy.wait('@companies').its('response.statusCode').should('eq', 201);

        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_companhia);
        cy.waiting('[data-cy="dataTable"] table tbody tr');
        cy.get('[data-cy="dataTable"] table tbody tr', {timeout: 5000}).eq(0).contains(nome_companhia);
    });

    it('Editar', () => {
        cy.visit('/settings/companhias');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_companhia);
        cy.waiting('[title="Editar"]');

        cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
            id_companhia_editar = $td.text();
            let urlEditar = `v1/companies/${id_companhia_editar}`;
            cy.get('[title="Editar"]').eq(0).click({force: true});
            cy.get('[data-cy="input_nome"] input').clear().type(nome_companhia2);
            cy.intercept('PUT', urlEditar).as('companies');
            cy.get('[data-cy="footerButton_btns"] button').last().click();
            cy.wait('@companies').its('response.statusCode').should('eq', 200);

            cy.waiting('[data-cy="search"] input');
            cy.get('[data-cy="search"] input').clear().type(nome_companhia2);
            cy.waiting('[data-cy="dataTable"] table tbody tr');
            cy.get('[data-cy="dataTable"] table tbody tr', {timeout: 5000}).eq(0).contains(nome_companhia2);     
        });
    });

    it('Uploads', () => {
        cy.visit('/settings/companhias');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_companhia2);
        cy.waiting('[title="Editar"]');

        cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
            id_companhia_editar = $td.text();
            let urlEditar = `v1/companies/${id_companhia_editar}/images`;
            cy.get('[title="Editar"]').eq(0).click({force: true});
            cy.waiting('[type="file"]');
            cy.intercept('POST', urlEditar).as('imageCompanhia');
            cy.uploadFile('./image/buck2.jpg', 0); 
            cy.wait('@imageCompanhia').its('response.statusCode').should('eq', 200);
            cy.get('[data-cy="footerButton_btns"] button').eq(0).click();
        }); 
    });

    it('Filtro Status', () => {
        let urlDelete = '**/v1/companies/**';
        cy.visit('/settings/companhias');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_companhia2);
        cy.wait(2000);
        
        cy.intercept('PUT', urlDelete).as('imageCompanhia1');
        cy.get('[title="Ativar/Desativar"] div').click();
        cy.wait('@imageCompanhia1').then( () => {
            
            cy.reload();
            cy.waiting('[data-cy="select_input_status"] input');
            cy.get('[data-cy="select_input_status"]').click();
            cy.get('[data-cy="select_input_status"] [tabindex="-1"]').contains('Inativa').click();
            cy.get('[data-cy="search"] input').clear().type(nome_companhia2);
            cy.waiting('[data-cy="dataTable"] table tbody');
            cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('contain', nome_companhia2);
            
            cy.get('[data-cy="select_input_status"]').click();
            cy.get('[data-cy="select_input_status"] [tabindex="-1"]').contains('Todas').click();
            cy.get('[data-cy="search"] input').clear().type(nome_companhia2);
            cy.waiting('[data-cy="dataTable"] table tbody');
            cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('contain', nome_companhia2);
            
            cy.get('[data-cy="select_input_status"]').click();
            cy.get('[data-cy="select_input_status"] [tabindex="-1"]').contains('Ativa').click();
            cy.get('[data-cy="search"] input').clear().type(nome_companhia2);
            cy.waiting('[data-cy="dataTable"] table tbody');
            cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('not.contain', nome_companhia2);
            
            cy.reload();
            cy.waiting('[data-cy="search"] input');
            cy.get('[data-cy="search"] input').clear().type(nome_companhia2);
            cy.wait(2000);
            cy.intercept('PUT', urlDelete).as('imageCompanhia2');
            cy.get('[title="Ativar/Desativar"] div').click();
            cy.wait('@imageCompanhia2').then( () => {
                
                cy.reload();
                cy.get('[data-cy="select_input_status"]').click();
                cy.get('[data-cy="select_input_status"] [tabindex="-1"]').contains('Ativa').click();
                cy.get('[data-cy="search"] input').clear().type(nome_companhia2);
                cy.waiting('[data-cy="dataTable"] table tbody');
                cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('contain', nome_companhia2);

                cy.get('[data-cy="select_input_status"]').click();
                cy.get('[data-cy="select_input_status"] [tabindex="-1"]').contains('Todas').click();
                cy.get('[data-cy="search"] input').clear().type(nome_companhia2);
                cy.waiting('[data-cy="dataTable"] table tbody');
                cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('contain', nome_companhia2);

                cy.waiting('[data-cy="select_input_status"] input');
                cy.get('[data-cy="select_input_status"]').click();
                cy.get('[data-cy="select_input_status"] [tabindex="-1"]').contains('Inativa').click();
                cy.get('[data-cy="search"] input').clear().type(nome_companhia2);
                cy.waiting('[data-cy="dataTable"] table tbody');
                cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('not.contain', nome_companhia2);
            });

        })
        
    });

    it('Excluir', () => {
        cy.visit('/settings/companhias');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_companhia2);
        cy.waiting('[title="Deletar"]');
        cy.get('[title="Deletar"]').click({force: true});
        cy.waiting("alert-dialog-title");
        cy.get('[type="button"]').contains('Confirmar').click();
        cy.waiting('[data-cy="search"] input');
        cy.wait(5000);
        cy.reload();
        
        cy.get('[data-cy="search"] input').clear().type(nome_companhia2);
        cy.waiting('[data-cy="dataTable_support"]');
        cy.get('[data-cy="dataTable_support"]', {timeout: 6000}).should('not.contain', nome_companhia2);
    });

});  
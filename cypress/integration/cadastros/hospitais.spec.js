/// <reference types="cypress" />
var faker = require('faker-br');

const nome_hospital = `Teste ${faker.name.firstName()}`;
const nome_hospital2 = `Teste ${faker.name.firstName()}`;

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
const fuso_horario  = "Horário de Brasília"
const observacoes   = faker.name.jobDescriptor();

var id_hospital_editar = "";

describe('Hospital', () => {
    before(() => {
        cy.logout();
        cy.login();
        cy.selecionarHospitaisInicio();
    })

    it('Incluir', () => {
        cy.visit('/cadastros');
        cy.get('[data-cy="cadastros_cards"]').contains('Hospitais').click();

        cy.get('[data-cy="link_cadastrar_hospital"]').click();
        cy.get('[data-cy="input_nome_hospital"]').type(nome_hospital);
        cy.get('[data-cy="input_email_hospital"]').type(email);
        cy.get('[data-cy="input_razao_social_hospital"]').type(razao_social);
        cy.get('[data-cy="input_cnpj_hospital"]').type(cnpj);
        cy.get('[data-cy="input_cell_phone_hospital"]').type(telefone);
        cy.get('[data-cy="input_street_hospital"]').type(rua);
        cy.get('[data-cy="input_number_hospital"]').type(numero);
        cy.get('[data-cy="input_complement_hospital"]').type(complemento);
        cy.get('[data-cy="input_district_hospital"]').type(setor);
        cy.get('[data-cy="input_code_post_hospital"]').type(cep);
        cy.get('[data-cy="input_state_hospital"]').type(`${estado}{enter}`, {delay:100});
        cy.wait(2000);
        cy.get('[data-cy="input_city_hospital"]').type(`${cidade}{enter}`, {delay:100});
        cy.get('#Latitude').type('7777777')
        cy.get('#longitude').type('6666666')
        cy.get('[data-cy="input_timezone_hospital"]').type(`${fuso_horario}{enter}`, {delay:100});
        cy.get('[data-cy="input_description_hospital"]').type(observacoes);
        cy.intercept('POST', '/v1/units').as('unit');
        cy.get('[data-cy="footerButton"] button').last().click();
        cy.get('[data-cy="btn_fechar_modal"]').click();

        cy.wait('@unit').then( Resp => {
            expect(Resp.response.statusCode).eq(201);
            expect(Resp.response.body.msg).to.equal('Cadastrado com Sucesso');
            expect(Resp.response.body.data.address.latitude).to.equal('7777777');
            expect(Resp.response.body.data.address.longitude).to.equal('6666666');

        });

        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_hospital);
        cy.waiting('[data-cy="dataTable"] table tbody tr');
        cy.get('[data-cy="dataTable"] table tbody tr', {timeout: 5000}).eq(0).contains(nome_hospital); 
    });

    it('Editar', () => {
        cy.visit('/cadastros/hospitais');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_hospital);
        cy.waiting('[title="Editar"]');

        cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
            id_hospital_editar = $td.text();
            let urlEditar = `/v1/units/${id_hospital_editar}`;
            cy.get('[title="Editar"]').eq(0).click({force: true});
            cy.waiting('[data-cy="input_nome_hospital"]')    
            cy.get('[data-cy="input_nome_hospital"] div input').clear().type(nome_hospital2);
            cy.waiting('[type="submit"]');
            cy.intercept('PUT', urlEditar).as('unit');
            cy.get('[data-cy="footerButton"] button').last().click();
            cy.wait('@unit').its('response.statusCode').should('eq', 200);
            cy.get('[data-cy="btn_fechar_modal"]').click();
            cy.waiting('[data-cy="search"] input');
            cy.get('[data-cy="search"] input').clear().type(nome_hospital2);
            cy.waiting('[data-cy="dataTable"] table tbody tr');
            cy.get('[data-cy="dataTable"] table tbody tr', {timeout: 6000}).eq(0).contains(nome_hospital2);
        }); 
    });

    it('Uploads', () => {
        cy.visit('/cadastros/hospitais');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_hospital2);
        cy.waiting('[title="Editar"]');

        cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
            id_hospital_editar = $td.text();
            let urlEditar = `**/v1/units/${id_hospital_editar}/picture`;
            cy.get('[title="Editar"]').eq(0).click({force: true});
            cy.waiting('[type="file"]');
            cy.intercept('POST', urlEditar).as('imageHospital');
            cy.uploadFile('./image/buck2.jpg', 0); 
            cy.wait('@imageHospital').its('response.statusCode').should('eq', 200);

            cy.get('[data-cy="footerButton"] button').eq(0).click();
        }); 
    });

    it('Editar Ativa/Inativa e validar Filtro Status', () => {
        cy.visit('/cadastros/hospitais');
        cy.waiting('[data-cy="search"] input');

        cy.get('[data-cy="search"] input').clear().type(nome_hospital2);
        cy.wait(2000);
        cy.get('[name="status"]').eq(1).click();
        cy.get('[data-cy="select_ativo_inativo"]').type('Inativos{enter}');
        cy.waiting('[data-cy="dataTable"] table tbody tr');
        cy.get('[data-cy="dataTable"] table tbody tr', {timeout: 6000}).eq(0).contains(nome_hospital2);
        
        cy.get('[data-cy="search"] input').clear().type(nome_hospital2);
        cy.wait(2000);
        cy.get('[name="status"]').eq(1).click();
        cy.get('[data-cy="select_ativo_inativo"]').type('Ativos{enter}');
        cy.waiting('[data-cy="dataTable"] table tbody tr');
        cy.get('[data-cy="dataTable"] table tbody tr', {timeout: 6000}).eq(0).contains(nome_hospital2);
    });

    it('Excluir', () => {
        cy.visit('/cadastros/hospitais');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_hospital2);
        cy.waiting('[title="Deletar"]');
        cy.get('[title="Deletar"]').click({force: true});
        cy.waiting("alert-dialog-title");
        cy.get('[type="button"]').contains('Confirmar').click();
        cy.waiting('[data-cy="search"] input');
        cy.reload();
        
        cy.visit('/cadastros/hospitais');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_hospital2);
        cy.waiting('[data-cy="dataTable"] table tbody tr');
        cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('not.contain', nome_hospital2);
    });

});
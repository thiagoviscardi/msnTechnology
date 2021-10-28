/// <reference types="cypress" />

var faker = require('faker-br');

var nome = faker.name.findName();
const sexo = "Masculino"
var email = faker.internet.email();
var cpf = faker.br.cpf();
var rg = faker.random.number();
const telefone = "62982891325"
const data_nascimento = "01012000"
const nacionalidade = "Brasil"
const estado_civil = "Casado"
var rua = faker.address.streetName();
const numero = 0
const complemento = "Qd. 10 Lt. 15"
const setor = "Setor Teste"
const cep = "74140140"
const estado = "Goiás"
const cidade = "Aparecida de Goiânia"
const validade_crm = "01012030"
const empresa = "4HEALTH";
const companhia = "Mediall Brasil"
const especialidades = "Generalista"
const hospitais_permitidos = "A Hospital de testes ALTERADO"

var nome_editar = `${nome} Editado`
const senha_editar = '123456'
var id_profissional_editar = "";

describe('Profissional Médico', () => {
    before(() => {
        cy.logout();
        cy.login();
        cy.selecionarHospitaisInicio();
    })

    it('Incluir Médico', () => {
        cy.visit('/cadastros');
        cy.get('[data-cy="cadastros_cards"]').contains('Profissionais').click();

        cy.get('[href="/cadastros/profissional/cadastrar"]').click({force: true});
        cy.waiting('[data-cy="input_nome"]')
        cy.get('[data-cy="input_nome"]').type(nome);
        cy.get('[data-cy="inputContainer_profissionais"]').children().eq(1).type(`${sexo}{enter}`, {delay:50});
        cy.get('[data-cy="inputContainer_profissionais"]').children().eq(2).type(email);
        cy.get('[data-cy="inputContainer2_profissionais"]').children().eq(0).type(`${cpf}{enter}`, {delay:100});
        cy.get('[data-cy="inputContainer2_profissionais"]').children().eq(1).type(rg);
        cy.get('[data-cy="inputContainer2_profissionais"]').children().eq(2).type(telefone);
        cy.get('[data-cy="inputContainer3_profissionais"]').children().eq(0).type(data_nascimento);
        cy.get('[data-cy="inputContainer3_profissionais"]').children().eq(1).type(`${nacionalidade}{enter}`, {delay:50});
        cy.get('[data-cy="inputContainer3_profissionais"]').children().eq(2).type(`${estado_civil}{enter}`, {delay:50});
        cy.get('[data-cy="inputContainer4_profissionais"]').children().eq(0).type(rua);
        cy.get('[data-cy="inputContainer4_profissionais"]').children().eq(1).type(numero);
        cy.get('[data-cy="inputContainer4_profissionais"]').children().eq(2).type(complemento);
        cy.get('[data-cy="inputContainer4_profissionais"]').children().eq(3).type(setor);
        cy.get('[data-cy="inputContainer5_profissionais"]').children().eq(0).type(cep);
        cy.get('[data-cy="inputContainer5_profissionais"]').children().eq(1).type(`${estado}{enter}`, {delay:200});
        cy.wait(500);
        cy.get('[data-cy="inputContainer5_profissionais"]').children().eq(2).type(`${cidade}{enter}`, {delay:100});
        cy.get('main div button span', {timeout: 5000}).contains('Informações profissionais').click();
        cy.waiting('[data-cy="inputContainer1_informacoes_profissionais"]')
        cy.get('[data-cy="inputContainer1_informacoes_profissionais"]').children().eq(0).type(rg);
        cy.get('[data-cy="inputContainer1_informacoes_profissionais"]').children().eq(1).type(`${estado}{enter}`, {delay:100});
        cy.get('[data-cy="inputContainer1_informacoes_profissionais"]').children().eq(2).type(validade_crm);
        cy.get('[data-cy="inputContainer2_informacoes_profissionais"]').children().eq(0).type(`${empresa}{enter}`, {delay:50});
        cy.get('[data-cy="inputContainer2_informacoes_profissionais"]').children().eq(1).type(`${companhia}{enter}`, {delay:50});
        cy.get('[data-cy="inputContainer3_informacoes_profissionais"]').children().eq(0).type(`${especialidades}{enter}`, {delay:50});
        cy.get('[data-cy="inputContainer4_informacoes_profissionais"]').children().eq(0).type(`${hospitais_permitidos}{enter}`, {delay:50});
        cy.get('[data-cy=footerButton_proximo]', {timeout: 5000}).click();
        cy.waiting('[data-cy="inputContainer1_informacoes_bancarias"]')
        cy.get('[data-cy=inputContainer1_informacoes_bancarias] label').eq(0).children().contains('Email').click();
        cy.waiting('[data-cy="inputContainer2_informacoes_bancarias"]')
        cy.get('[data-cy="inputContainer2_informacoes_bancarias"] input').type(email);
        cy.log(`NOME PROFISSIONAL CADASTRADO: ${nome}`)
        cy.intercept('POST', '/v1/users').as('users');
        cy.get('[data-cy=footerButton_proximo]').click();
        cy.wait('@users').its('response.statusCode').should('eq', 201);
        cy.get('[data-cy="btn_fechar_modal"]').click();
        
        cy.reload();
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="antTab_unit"]').eq(0).click();
        cy.get('[data-cy="search"] input').clear().type(nome);
        cy.get('[data-cy="div_professional_filters"]').children().eq(1).click().type('Todos{enter}');
        cy.get('[data-cy="div_professional_filters"]').children().eq(2).click().type('Ativos{enter}');
        cy.waiting('[data-cy="dataTable"] table tbody tr');
        cy.get('[data-cy="dataTable"] table tbody tr', {timeout: 5000}).eq(0).contains(nome);
    });

    it('Editar Médico', () => {
        cy.visit('/cadastros/profissionais');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome);
        cy.waiting('[title="Editar"]');
        cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
            id_profissional_editar = $td.text();
            let urlEditar = `/v1/users/${id_profissional_editar}`;
            let urlSenha = `/v1/users/${id_profissional_editar}/pass`;
            cy.get('[title="Editar"]').eq(0).click({force: true});
            cy.waiting('[data-cy="input_nome"]');
            cy.get('[data-cy="input_nome"] div').children().eq(0).clear().type(nome_editar);
            cy.get('main div button span').contains('Senha').click();
            cy.waiting('[data-cy="inputContainer_trocar_senha"]')
            cy.get('[data-cy="inputContainer_trocar_senha"]').children().eq(0).type(senha_editar);
            cy.get('[data-cy="inputContainer_trocar_senha"]').children().eq(1).type(senha_editar);
            cy.intercept('PUT', urlEditar).as('user_edit');
            cy.intercept('PUT', urlSenha).as('user_edit_password');
            cy.get('[data-cy=footerButton_proximo]').click();
            cy.wait('@user_edit').its('response.statusCode').should('eq', 200);
            cy.wait('@user_edit_password').its('response.statusCode').should('eq', 200);
            cy.get('[data-cy="btn_fechar_modal"]').click();

            cy.waiting('[data-cy="search"] input');
            cy.get('[data-cy="search"] input').clear().type(nome_editar);
            cy.waiting('[data-cy="dataTable"] table tbody tr');
            cy.get('[data-cy="dataTable"] table tbody tr', {timeout: 5000}).eq(0).contains(nome_editar); 
        });
    });

    it('Uploads Médico', () => {
        cy.visit('/cadastros/profissionais');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_editar);
        cy.waiting('[title="Editar"]');

        cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
            id_profissional_editar = $td.text();
            let urlEditar = `**/v1/users/${id_profissional_editar}/picture`;
            let urlEditar2 = `**/v1/users/${id_profissional_editar}/documents`;
            cy.get('[title="Editar"]').eq(0).click({force: true});
            cy.waiting('[type="file"]');
            cy.intercept('POST', urlEditar).as('imageProfissional');
            cy.uploadFile('./image/buck2.jpg', 0); 
            cy.wait('@imageProfissional').its('response.statusCode').should('eq', 200);
            
            cy.intercept('POST', urlEditar2).as('pdfProfissional');
            cy.uploadFile('./image/testeupload.pdf', 1); 
            cy.wait('@pdfProfissional').its('response.statusCode').should('eq', 201);

            cy.get('[data-cy="footerButton_container"] button').eq(0).click();
        }); 
    });

    it('Editar status e teste filtros', () => {
        cy.visit('/cadastros/profissionais');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_editar);
        cy.waiting('[title="Editar"]');
        cy.get('[data-cy="div_professional_filters"]').children().eq(1).click().type('Médicos{enter}');
        cy.wait(1000);
        cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('contain', nome_editar);

        cy.get('[title="Ativar/Desativar"] div').click({force: true});
        cy.wait(1000);
        cy.reload();
        cy.get('[data-cy="search"] input').clear().type(nome_editar);
        cy.get('[data-cy="dataTable"] table tbody', {timeout: 7000}).should('not.contain', nome_editar);

        cy.get('[data-cy="div_professional_filters"]').children().eq(2).click();
        cy.get('[data-cy="div_professional_filters"]').children().eq(2).contains('Inativos').click();
        cy.wait(1000);
        cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('contain', nome_editar);

        cy.get('[data-cy="div_professional_filters"]').children().eq(1).click().type('Todos{enter}');
        cy.wait(1000);
        cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('contain', nome_editar);

        cy.wait(1000);
        cy.get('[title="Ativar/Desativar"] div').click({force: true});
        cy.wait(1000);
        cy.reload();
        cy.get('[data-cy="search"] input').clear().type(nome_editar);
        cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('not.contain', nome_editar);

        cy.get('[data-cy="div_professional_filters"]').children().eq(2).click().type('Ativos{enter}');
        cy.wait(1000);
        cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('contain', nome_editar);
            
    });

    it('Excluir Médico', () => {
        cy.visit('/cadastros/profissionais');
        cy.waiting('[data-cy="search"] input');
        cy.get('[data-cy="search"] input').clear().type(nome_editar);
        cy.waiting('[title="Editar"]');
        cy.get('tbody').eq(0).children().eq(0).children().eq(0).then( ($td) => {
            id_profissional_editar = $td.text();
            cy.get('[title="Deletar"]').eq(0).click({force: true});
            cy.intercept('DELETE', `**/v1/users/${id_profissional_editar}`).as('user_delete');
            cy.get('#alert-dialog-title').siblings().last().children().last().click();
            cy.wait('@user_delete').its('response.statusCode').should('eq', 200);
            cy.waiting('[data-cy="search"] input');
            cy.reload();
            
            cy.waiting('[data-cy="search"] input');
            cy.get('[data-cy="search"] input').clear().type(nome_editar);
            cy.waiting('[data-cy="dataTable"] table tbody');
            cy.get('[data-cy="dataTable"] table tbody', {timeout: 5000}).should('not.contain', nome_editar);
        });
    });

}); 
/// <reference types="cypress" />
var faker = require('faker-br');

describe('Perfil de usuario', () => {
    let nameUser   = faker.company.companyName();
    let randomcpf = faker.br.cpf();
    beforeEach(() => {
        cy.login();
    })
    it('Update perfil de usuario', () => {

        cy.visit('/profile-data');
        cy.waiting('[type="file"]');
        cy.intercept('POST','**/v1/users/1/picture').as('imageUser');
        cy.intercept('PUT','**/v2/admin/users/1').as('userUpdate')
        cy.uploadFile('./image/buck2.jpg');
        cy.wait('@imageUser').then(()=>{
            cy.get('[name="name"]').clear().type(nameUser);
            cy.get('[name="cpf"]').clear().type(randomcpf);
            cy.get('[type="submit"]').click()
        });   
        cy.wait('@userUpdate').then((Resp)=>{ 
            expect(Resp.response.statusCode).eq(200);
            expect(Resp.response.body.data.name).to.equal(nameUser);
            expect(Resp.response.body.data.cpf).to.equal(randomcpf);
        });
        cy.get('.MuiAlert-message', {timeout: 7000}).should('have.text','Dados atualizados com sucesso');
    });
});
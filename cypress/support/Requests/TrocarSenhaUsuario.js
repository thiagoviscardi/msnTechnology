/// <reference types="cypress" />

function trocarSenhaUsuario (tokenUsuarioLogado, idUsuario, senha) {

    return cy.request({
        method: 'PUT',
        url: `${Cypress.env('api_url')}/v1/users/${idUsuario}/pass`,
        headers: {
            contentType:'application/json',
            authorization: `Bearer ${tokenUsuarioLogado}`
        },
        body: {
            "password": senha
        }
    })

}

export {trocarSenhaUsuario}
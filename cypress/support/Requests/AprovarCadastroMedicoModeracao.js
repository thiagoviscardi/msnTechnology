/// <reference types="cypress" />

function aprovarCadastroMedicoModeracao (code_professional, tokenUsuarioLogado) {

    return cy.request({
        method: 'PUT',
        url: `${Cypress.env('api_url')}/v1/users/moderator/${code_professional}`,
        headers: {
            contentType:'application/json',
            authorization: `Bearer ${tokenUsuarioLogado}`
        },
        body: {status: 1},
        failOnStatusCode: false
    })

}

export {aprovarCadastroMedicoModeracao}
/// <reference types="cypress" />

function deletarAdministrador (user_id, tokenUsuarioLogado) {

    return cy.request({
        method: 'DELETE',
        url: `${Cypress.env('api_url')}/v1/users/${user_id}`,
        headers: {
            contentType:'application/json',
            authorization: `Bearer ${tokenUsuarioLogado}`
        }
    })

}

export {deletarAdministrador}
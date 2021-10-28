/// <reference types="cypress" />

const hospital = 61;

function alterarStatusEscala (tokenUsuarioLogado, idEscala) {

    return cy.request({
        method: 'PATCH',
        url: `${Cypress.env('api_url')}/v1/units/${hospital}/scales/${idEscala}/change`,
        headers: {
            contentType:'application/json',
            authorization: `Bearer ${tokenUsuarioLogado}`
        },
    })

}

export {alterarStatusEscala}
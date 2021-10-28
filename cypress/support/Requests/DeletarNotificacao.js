/// <reference types="cypress" />

function deletarNotificacao (notification_id, tokenUsuarioLogado) {

    return cy.request({
        method: 'DELETE',
        url: `${Cypress.env('api_url')}/v2/notifications/${notification_id}`,
        headers: {
            contentType:'application/json',
            authorization: `Bearer ${tokenUsuarioLogado}`
        }
    })

}

export {deletarNotificacao}
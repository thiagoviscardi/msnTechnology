/// <reference types="cypress" />

function aceitarOuRecusarOferta (tokenUsuarioApp, idPlantaoReceber, tipoConfirmacao) {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('api_url')}/v2/client/agendas/${idPlantaoReceber}/offers/confirm?type=${tipoConfirmacao}`,
        headers: {
            contentType:'application/json',
            authorization: `Bearer ${tokenUsuarioApp}`
        }
    })

}

export {aceitarOuRecusarOferta}
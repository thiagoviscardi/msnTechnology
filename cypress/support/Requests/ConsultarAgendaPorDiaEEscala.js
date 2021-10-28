/// <reference types="cypress" />

function consultarAgendaPorDiaEEscala (day, codeScale, unit_id, tokenUsuarioLogado) {

    return cy.request({
        method: 'GET',
        url: `${Cypress.env('api_url')}/v2/admin/agendas?date_start=${day}&date_end=${day}&unit_id=${unit_id}&scale_id=${codeScale}`,
        headers: {
            contentType:'application/json',
            authorization: `Bearer ${tokenUsuarioLogado}`
        }
    })

}

export {consultarAgendaPorDiaEEscala}
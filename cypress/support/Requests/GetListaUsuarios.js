/// <reference types="cypress" />

function getListaUsuarios (group_type, tokenUsuarioLogado) {

    return cy.request({
        method: 'GET',
        url: `${Cypress.env('api_url')}/v2/admin/users?unit_id=61&page=1&per_page=12&group_type=${group_type}&order_by=name&status=active`,
        headers: {
            contentType:'application/json',
            authorization: `Bearer ${tokenUsuarioLogado}`
        }
    })

}

export { getListaUsuarios }
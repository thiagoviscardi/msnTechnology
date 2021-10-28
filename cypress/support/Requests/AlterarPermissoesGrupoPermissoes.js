/// <reference types="cypress" />

function alterarPermissoesGrupoPermissoes (tokenUsuarioLogado, array_permissoes) {
    return cy.request({
        method: 'PUT',
        url: `${Cypress.env('api_url')}/v1/groups/2/permissions`,
        headers: {
            contentType:'application/json',
            authorization: `Bearer ${tokenUsuarioLogado}`
        },
        body: array_permissoes,
        failOnStatusCode: false
    })

}

export {alterarPermissoesGrupoPermissoes}
/// <reference types="cypress" />

function cederAgenda (tokenUsuarioLogado, idPlantao, idProfissionalReceberAgenda) {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('api_url')}/v2/client/agendas/${idPlantao}/substitute`,
        headers: {
            contentType:'application/json',
            authorization: `Bearer ${tokenUsuarioLogado}`
        },
        body: {
            "user": {
                "id": idProfissionalReceberAgenda
            }
        }
    })

}

export {cederAgenda}

//401 - Plantão a ceder, já passou do horário de inico.
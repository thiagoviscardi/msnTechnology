/// <reference types="cypress" />

const hospital = 61;

function cadastrarEscala (tokenUsuarioLogado, statusEscala, nome) {

    return cy.request({
        method: 'POST',
        url: `${Cypress.env('api_url')}/v1/units/${hospital}/scales`,
        headers: {
            contentType:'application/json',
            authorization: `Bearer ${tokenUsuarioLogado}`
        },
        body: {
            "budget": 500,
            "coordinator_id": 5434,
            "group_id": null,
            "name": nome,
            "price": 0,
            "professional_type": 0,
            "scale_type": 1,
            "signature_is_automatic": 0,
            "signature_is_required": 0,
            "specialty_id": 1,
            "status": statusEscala,
            "technical_manager_id": 5434,
            "type_remuneration": "1",
            "unit": {"id": hospital}
        }
    })

}

export {cadastrarEscala}
/// <reference types="cypress" />

function cadastrarAdministrador (tokenUsuarioLogado, nome, cpf, email, group_id_admin) {

    return cy.request({
        method: 'POST',
        url: `${Cypress.env('api_url')}/v1/users`,
        headers: {
            contentType:'application/json',
            authorization: `Bearer ${tokenUsuarioLogado}`
        },
        body: {
            "cell_phone": "(62) 9 8165-1111",
            "company": {"id": 1},
            "cpf": cpf,
            "email": email,
            "group": {"id": group_id_admin},
            "name": nome,
            "units": [{"id": 61}]
        }
    })

}

export {cadastrarAdministrador}
/// <reference types="cypress" />
var faker = require('faker-br');

function cadastrarMedicoApp (name_professional, cpf_professional, password_professional) {

    return cy.request({
        method: 'POST',
        url: `${Cypress.env('api_url')}/v1/users/register`,
        headers: {
            contentType:'application/json'
        },
        body: {
            "name": name_professional,
            "email": faker.internet.email(),
            "rg": "12111",
            "cell_phone": "(62) 99999-9999",
            "birth_date": "04/08/2000",
            "cpf": cpf_professional,
            "password": password_professional,
            "civil_status": "1",
            "send_pass": 1,
            "status": 2,
            "nationality": {
                "id": 1
            },
            "crm": {
                "regulation_agency": "CRM",  
                "number": "111",
                "validate": "04/08/2030",
                "state": {
                "id": 2
                }
            },
            "units": [
                {
                "id": 61
                }
            ],
            "specialties": [
                {
                "id": 1
                }
            ],
            "group": {
                "id": 3
            },
            "company": {
                "id": 1
            }
        }
    })

}

export {cadastrarMedicoApp}
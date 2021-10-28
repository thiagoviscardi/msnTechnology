/// <reference types="cypress" />
var faker = require('faker-br');

function cadastrarMultiprofissional (tokenUsuarioLogado, nome) {

    return cy.request({
        method: 'POST',
        url: `${Cypress.env('api_url')}/v1/users/register`,
        headers: {
            contentType:'application/json',
            authorization: `Bearer ${tokenUsuarioLogado}`
        },
        body: {
            "address": {
                "city": {"id": 901, "state": {"id": 9}, "name": "Aparecida de Goiânia"},
                "code_post": "74140-140",
                "complement": "quadra 1 lote 10",
                "district": "onde moro",
                "number": "1",
                "street": "Rua Três Marias"
            },
            "bank": null,
            "birth_date": "01/01/2000",
            "cell_phone": "(44) 4 4444-4444",
            "civil_status": 1,
            "company": {"id": 1, "name": "9APP Soluções"},
            "cpf": faker.br.cpf(),
            "crm": {
                "number": "",
                "professional_type": "multiprofissional",
                "regulation_agency": "crm",
                "state": {"id": ""},
                "validate": ""
            },
            "email": faker.internet.email(),
            "enterprise": {"id": ""},
            "genre": "M",
            "group": {"id": 57},
            "last_name": "",
            "name": nome,
            "nationality": {"id": 1, "name": "Brasil"},
            "password": "",
            "passwordConfirmation": "",
            "professional_type": "multiprofissional",
            "profile_receiving": 1,
            "profile_receiving_type": 1,
            "regulation_agency": "CRM",
            "rg": "00115465",
            "specialties": [],
            "units": [{"id": 61, "name": "A Hospital de testes ALTERADO"}]
        }
    })

}

export {cadastrarMultiprofissional}
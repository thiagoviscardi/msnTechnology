/// <reference types="cypress" />
var faker = require('faker-br');

const email         = faker.internet.email();
const razao_social  = faker.company.suffixes().toString();
const cnpj          = faker.br.cnpj();
const rua           = faker.address.streetAddress();
const numero        = faker.random.number();        
const setor         = faker.address.stateAbbr();
const complemento   = faker.company.companyName();
const observacoes   = faker.name.jobDescriptor();

function cadastrarHospital (tokenUsuarioLogado, hospitais_permitidos) {

    return cy.request({
        method: 'POST',
        url: `${Cypress.env('api_url')}/v1/units`,
        headers: {
            contentType:'application/json',
            authorization: `Bearer ${tokenUsuarioLogado}`
        },
        body: {
        "address": {
            "city": {"id": 901, "state": {"id": 9}},
            "code_post": "74650280", 
            "complement": complemento,
            "distance": 0,
            "district": setor,
            "geolocation": 0,
            "latitude": "undefined",
            "longitude": "undefined",
            "number": numero,  
            "street": rua
        },
        "cell_phone": "62981555555",
        "cnpj": cnpj,
        "description": observacoes,
        "email": email,
        "name": hospitais_permitidos,
        "setting_timezone": {"id": 2},
        "social_name": razao_social,
        "tolerance": ""
        }
    })

}

export {cadastrarHospital}
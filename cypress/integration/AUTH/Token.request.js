/// <reference types="cypress"/>

function getTokenUserId (user, pwd){

    return cy.request({
        method: 'POST',
        url: Cypress.env('api_url')+'/v1/oauth/token',
        encoding:'utf8',
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'cGxhbnRhb2JhY2tvZmZpY2U6YnJ1eW5wYW4='
        },
        body: {
            grant_type: "password",
            username: (user),
            password: (pwd)
        }
    })
}
export { getTokenUserId }
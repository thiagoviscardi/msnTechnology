import 'cypress-file-upload';
import "cypress-fail-fast";
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {

    //https://docs.cypress.io/api/events/catalog-of-events#Event-Types
    
    return false
})
Cypress.Cookies.defaults({
    preserve:['plantãoExtra@hospital','plantaoextra@token']
  })
  const clear = Cypress.LocalStorage.clear

  Cypress.LocalStorage.clear = function (keys, ls, rs) {
    
    if (keys && keys.length == 0) {
      keys = Object.keys(localStorage);
    }
}

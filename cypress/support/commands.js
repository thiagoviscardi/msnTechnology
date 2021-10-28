Cypress.Commands.add('login', () => {
  cy.get('body').then(() => {
    let token = {};
    cy.window()
      .then(
        (window) => (token = window.localStorage.getItem('plantaoextra@token'))
      )
      .then(() => {
        if (token === null) {
          token = '1515454';
        }

        cy.visit('/');
        cy.wait(600);
        if (token.length < 300) {
          cy.get('#email').type(Cypress.env('email'), { log: false });
          cy.get('#password').type(Cypress.env('pass'), { log: false });
          cy.get('#Entrar').click();
          cy.get('[data-cy="containerDivHospitalSelecionados"]', { timeout: 12000 }).should('contain', 'Selecione os hospitais desejados para visualizar as informações dos plantonistas:');
        }

      });
  });
});

Cypress.Commands.add('logout', () => {
  cy.reload();
  cy.visit('/');
  localStorage.clear();
  cy.reload();
});

Cypress.Commands.add('waiting', (elemento, time, timeout) => {
  cy.get('body', { log: false }).then(form => {

    const idVisible = form.find(elemento);
    const load2 = form.find('.MuiCircularProgress-svg');
    const load3 = form.find('.MuiCircularProgress-indeterminate');
    const load4 = form.find('.css-1xh8qep-loadingIndicator');

    if (time == null) {
      time = 0;
      timeout = Cypress.config('defaultCommandTimeout');
    }
    if (
      idVisible.is(':visible') &&
      !idVisible.is(':hidden') &&
      !load2.is(':visible') &&
      !load3.is(':visible') &&
      !load4.is(':visible')
    ) {
      cy.wait(1000, { log: false });
    } else {
      cy.wait(90, { log: false });
      time += 200;
      if (time < timeout) {
        cy.waiting(elemento, time, timeout);
      }
    }
  });
});

Cypress.Commands.add('limparUnidadesLocalStorage', () => {
  cy.get('body').then(() => {
    cy.window()
      .then(
        (window) => (window.localStorage.removeItem('plantãoExtra@hospital'))
      )
    cy.reload(true);
  });
});

Cypress.Commands.add('limparLocalStorage', () => {
  localStorage.clear();
});

Cypress.Commands.add('uploadFile', (Path, index) => {
  /*
    Toda imagem deve ser colocada nesse diretorio, test/cypress/fixtures/image
    e referenciada quando chamar a função ex: cy.uploadFile('./image/iphone.png');
  */
  if (index == null) {
    index = 0;
  }
  cy.get('input[type=file]')
    .eq(index)
    .attachFile(Path);

});

Cypress.Commands.add('selecionarHospitaisInicio', () => {
  cy.intercept('GET', '**/v1/units**').as('units')
  cy.get('[data-cy="containerDivHospitalSelecionados"] ul div', { timeout: 21000 }).first().click();
  cy.wait(100);
  cy.get('[data-cy="containerDivHospitalSelecionados"] ul div').first().click();
  cy.wait(100);
  cy.get('[data-cy="containerDivHospitalSelecionados"] ul div').first().click();
  cy.wait(100);
  cy.get('#btnFiltrarHospital').click();
  cy.waiting('[data-cy="div_metricas"]');
  cy.wait('@units').then((resp) => {
    expect(resp.response.body.total).to.not.null
    expect(resp.response.body.total).to.not.undefined
  })
  cy.waiting('#btnSair')
});


Cypress.Commands.add('InputProfissional', (time, timeout) => {
  if (time == null) {
    time = 0;
    timeout = 2000;
  }
  cy.intercept('GET', '**/v2/admin/users**').as('GetUser')

  // cy.waiting('#AdicionarPlantao')
  cy.get('#AdicionarPlantao', { timeout: 13000 }).first().click();
  cy.wait('@GetUser').then((user) => {
    let pessoas = user.response.body.data
    var profissional = pessoas[Math.floor(Math.random() * pessoas.length)].name;

    cy.contains('Selecione o profissional').click().type(`${profissional}{enter}`, { delay: 200 });


    cy.get('[type="submit"]').click()

    // cy.waiting('#AdicionarPlantao')
    cy.get('#AdicionarPlantao', {timeout: 6000});
    cy.get('body').then((resp) => {
      debugger

      let formAdicionarPlantao = resp.find('#AdicionarPlantao');
      cy.log(formAdicionarPlantao.is(':visible'))
      if (!formAdicionarPlantao.is(':visible') && time < timeout) {
        time = time + 200;
        
        cy.InputProfissional(time, timeout)
      }
    })
  });
})
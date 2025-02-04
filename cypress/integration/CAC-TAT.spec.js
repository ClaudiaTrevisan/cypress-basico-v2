/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  this.beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatorios e envia o formulário', () => {
    cy.get('#firstName').type('Claudia')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('claudia.email@email.com')
    cy.get('#open-text-area').type('nada não. Só testando e testando e testando', {delay: 100})
    cy.contains('button[type="submit"]', 'Enviar').click()
    cy.contains('.success', 'Mensagem enviada com sucesso.').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Claudia')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('claudiaemail.com')
    cy.get('#open-text-area').type('nada não. Só testando e testando e testando')
    cy.contains('button[type="submit"]', 'Enviar').click()
    cy.contains('.error', 'Valide os campos obrigatórios!').should('be.visible')
  })

  it('valida obrigatoriedade de numeros no campo telefone', () => {
    cy.get('#firstName').type('Claudia')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('claudia@email.com')
    cy.get('#phone').type('jdaihydufh').should('have.value', '')
  })

  it ('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Claudia')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('claudia@email.com')
    cy.get('#phone-checkbox').check()
    cy.contains('button[type="submit"]', 'Enviar').click()
    cy.contains('.error', 'Valide os campos obrigatórios!').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Claudia').should('have.value', 'Claudia').clear().should('have.value', '')
    cy.get('#lastName').type('Oliveira').should('have.value', 'Oliveira').clear().should('have.value', '')
    cy.get('#email').type('claudia@email.com').should('have.value', 'claudia@email.com').clear().should('have.value', '')
    cy.get('#phone').type('154875165').should('have.value', '154875165').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button[type="submit"]', 'Enviar').click()
    cy.contains('.error', 'Valide os campos obrigatórios!').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () =>{
    cy.fillMandatoryFieldsAndSubmit({
      firstName: 'Claudia',
      lastName: 'Oliv',
      email: 'clau@email.com'
    })
    cy.contains('.success', 'Mensagem enviada com sucesso.').should('be.visible')
  })
  it('seleciona um produto (YouTube) por seu texto', ()  => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type=radio][value="feedback"]').check().should('have.value', 'feedback')
  })
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type=radio]').should('have.length', 3).each(($radio) => {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type=checkbox]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(($input) => {
        expect($input[0].files[0].name)
          .to.equal('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(($input) => {
        expect($input[0].files[0].name)
          .to.equal('example.json')
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('exampleFile')
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('@exampleFile')
      .should(($input) => {
        expect($input[0].files[0].name)
          .to.equal('example.json')
      })
  })
})

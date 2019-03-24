/// <reference types="cypres" />

import Chance from 'chance';
const chance = new Chance();

describe('ng-stock-arup', () => {
  const email = chance.email();
  const pass = 'ValidPassword23';

  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('has a title ng-stock-arup', () => {
    cy.contains('ng-stock-arup');
    expect(2).to.equal(2);
  });

  it('blocks protected routes', () => {
    cy.get('.login-container')
      .children()
      .should('contain', 'Login')
      .and('be.visible');
  });

  it('signs up a new user', () => {
    //Asert URL
    cy.url().should('include', 'login');

    //Fill out the form
    cy.get('input[formcontrolname=username]').type(email);
    cy.get('input[formcontrolname=password]').type(pass);
    cy.get('button[type=submit]').click();

    //Assert welcome message
    cy.contains('Logout');
  });

  it('User able to View Stocks Page', () => {
    //Asert URL
    cy.url().should('include', 'login');

    cy.login(email, pass);

    //Assert product url
    cy.url().should('include', 'stock');

    //Assert welcome message
    cy.contains('Dow Jones U.S. Internet Index');
  });

  it('User can see stocks VNET , AGTK, AKAM , BIDU , BCOR', () => {
    //Asert URL
    cy.url().should('include', 'login');

    cy.login(email, pass);

    //Assert product url
    cy.url().should('include', 'stock');

    //Assert welcome message
    cy.contains('Dow Jones U.S. Internet Index');
    cy.get('.stocksGrid')
      .children()
      .should('contain', 'VNET')
      .and('be.visible');

    cy.get('.stocksGrid')
      .children()
      .should('contain', 'AGTK')
      .and('be.visible');

    cy.get('.stocksGrid')
      .children()
      .should('contain', 'AKAM')
      .and('be.visible');

    cy.get('.stocksGrid')
      .children()
      .should('contain', 'BIDU')
      .and('be.visible');

    cy.get('.stocksGrid')
      .children()
      .should('contain', 'BCOR')
      .and('be.visible');
  });
});

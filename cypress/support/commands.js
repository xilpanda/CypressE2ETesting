/// <reference types="Cypress" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { loginPage } from "./pom_objects/loginPageElements";
import { productPage } from "./pom_objects/productsPageElements";
import { checkoutPage } from "./pom_objects/checkoutPageElements";

Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");
  cy.get(loginPage.username).type(username);
  cy.get(loginPage.password).type(password);
  cy.get(loginPage.loginButton).click();
  cy.get(".title").should("have.text", "Products");
});

Cypress.Commands.add("locklogin", (username, password) => {
  cy.visit("/");
  cy.get(loginPage.username).type(username);
  cy.get(loginPage.password).type(password);
  cy.get(loginPage.loginButton).click();
  cy.get('[data-test="error"]').should("be.visible");
});

Cypress.Commands.add("addToCart", (text) => {
  cy.get(productPage.cardItem, { timeout: 10000 })
    .contains(text)
    .parent()
    .parent()
    .parent()
    .find(productPage.cardButton)
    .click();
});

Cypress.Commands.add("openCartPage", () => {
  cy.get(productPage.shoppingCartLink).click();
});

Cypress.Commands.add("goToCheckoutPage", () => {
  cy.get(productPage.yourCardButton).click();
});

Cypress.Commands.add("confirmeCustomerInfo", () => {
  cy.get(productPage.overviewButton).click();
});

Cypress.Commands.add("confirmeRemoveItem", () => {
  cy.get(productPage.removeButton).click();
});

Cypress.Commands.add("confirmeContinueShop", () => {
  cy.get(productPage.continueShopping).click();
});

Cypress.Commands.add("sortProducts", () => {
  cy.get(productPage.productSort).select("Name (Z to A)");
});

Cypress.Commands.add("sortProductsLow", () => {
  cy.get(productPage.productSortLow).select("Price (low to high)");
});

Cypress.Commands.add("sortProductsHigh", () => {
  cy.get(productPage.productSortHigh).select("Price (high to low)");
});

Cypress.Commands.add("checkout", (firstName, lastName, postalCode) => {
  cy.get(checkoutPage.firstName).type(firstName);
  cy.get(checkoutPage.lastName).type(lastName);
  cy.get(checkoutPage.postalCode).type(postalCode);
  cy.get(checkoutPage.checkoutButton).click();
});

Cypress.Commands.add("logout", () => {
  cy.get(productPage.burgerMenuButton).click();
  cy.get(productPage.logoutLink).click();
  cy.url().should("eq", "https://www.saucedemo.com/");
});

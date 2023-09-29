/// <reference types="Cypress" />

describe("Locked Login", () => {
  it("should log in with not valid credentials", () => {
    cy.locklogin("locked_out_user", "secret_sauce");
  });
});

/// <reference types="Cypress" />

describe("Select and verify images with src attribute", () => {
  it("Should select all images with src attribute '/static/media/sl-404.168b1cce.jpg'", () => {
    cy.login("problem_user", "secret_sauce");

    // Use cy.get() to select all images with the specified src attribute
    cy.get('img[src="/static/media/sl-404.168b1cce.jpg"]').should(
      "have.length",
      6
    );
  });
});

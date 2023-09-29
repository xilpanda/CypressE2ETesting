/// <reference types="Cypress" />
import { productPage } from "../support/pom_objects/productsPageElements";

describe("Test Suite", () => {
  beforeEach("before", () => {
    cy.login("standard_user", "secret_sauce");
  });

  it("Should buy One Product from Home Page", () => {
    cy.addToCart("Sauce Labs Onesie");
    cy.openCartPage();
    cy.get(productPage.cartItems).should("have.length", 1);
    cy.goToCheckoutPage();
    cy.checkout("Sandro", "Radinkovic", "78000");
    cy.confirmeCustomerInfo();
    cy.get(productPage.completeHeader).should(
      "have.text",
      "Thank you for your order!"
    );
  });

  it("Should buy Two Products from Home Page", () => {
    cy.addToCart("Sauce Labs Onesie");
    cy.addToCart("Sauce Labs Backpack");
    cy.openCartPage();
    cy.get(productPage.cartItems).should("have.length", 2);
    cy.goToCheckoutPage();
    cy.checkout("Aleksandar", "Velickovic", "11000");
    cy.confirmeCustomerInfo();
    cy.get(productPage.completeHeader).should(
      "have.text",
      "Thank you for your order!"
    );
  });

  it("Should Remove Item from Cart", () => {
    cy.addToCart("Sauce Labs Onesie");
    cy.openCartPage();
    cy.get(productPage.cartItems).should("have.length", 1);
    cy.confirmeRemoveItem();
    cy.get(productPage.cartItems).should("have.length", 0);
    cy.confirmeContinueShop();
  });

  it("Should Sort Products Z to A", () => {
    cy.sortProducts();
    cy.get(productPage.cardItemTitle)
      .first()
      .should("have.text", "Test.allTheThings() T-Shirt (Red)");
  });

  it("Should Sort Products Price (low to high)", () => {
    cy.sortProductsLow();
    cy.get(productPage.cardItemTitle)
      .first()
      .should("have.text", "Sauce Labs Onesie");
  });

  it("Should Sort Products Price (high to low)", () => {
    cy.sortProductsHigh();
    cy.get(productPage.cardItemTitle)
      .first()
      .should("have.text", "Sauce Labs Fleece Jacket");
  });

  it("Should have Product Details Page", () => {
    cy.contains(productPage.cardItemTitle, "Sauce Labs Backpack").click();

    cy.fixture("products").then((product) => {
      cy.get(productPage.detailsTitle).should("have.text", product.title);

      cy.get(productPage.detailsDescription).should(
        "have.text",
        product.desription
      );
      cy.get(productPage.detailsPrice).should("contain.text", product.price);
    });
  });

  it("Should user logout from page", () => {
    cy.logout();
  });

  it("Should click on the burger menu and redirect to saucelabs.com", () => {
    // Increase the default timeout for this test
    Cypress.config("defaultCommandTimeout", 15000); // Adjust as needed

    const urlRedirects = [
      "https://www.saucedemo.com/",
      "https://www.saucedemo.com/new-url", // Add all expected URLs in the order of redirects
      "https://saucelabs.com/",
    ];

    // Intercept network requests to control redirects
    cy.intercept("GET", "**/*").as("interceptedRequest");

    // Add a listener for uncaught exceptions
    cy.on("uncaught:exception", (err, runnable) => {
      // You can handle the exception here, log it, or choose to ignore it
      // For example, to fail the test if an unhandled exception occurs:
      cy.log(`Uncaught Exception: ${err.message}`);
      throw err;
    });

    // Wait for the page to load
    cy.wait("@interceptedRequest", { timeout: 15000 }).then(() => {
      // Click on the burger menu (assuming it has a class or identifier)
      cy.get(".bm-burger-button").click();

      // Click on the "About" link (assuming it has a class or identifier)
      cy.get(".bm-item.menu-item").contains("About").click();

      // Use cy.should() to handle redirects and assertions with a timeout
      cy.should(
        () => {
          // Loop through expected URLs in the order of redirects
          const currentUrl = Cypress.env("url");
          const expectedUrl = urlRedirects.shift();

          expect(currentUrl).to.equal(expectedUrl);
        },
        { timeout: 15000 }
      ).then(() => {
        // Set the current URL as an environment variable for the next redirect
        Cypress.env("url", urlRedirects[0]);
      });
    });
  });
});

describe("Blogs ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", () => {
    cy.contains("Blogs");
  });

  it("login form can be opened", () => {
    cy.contains("login").click();
  });

  it("user can login", () => {
    cy.contains("login").click();
    cy.get("#username").type("111");
    cy.get("#password").type("111");
    cy.get("#login").click();
    cy.contains("111 logged in");
  });
});

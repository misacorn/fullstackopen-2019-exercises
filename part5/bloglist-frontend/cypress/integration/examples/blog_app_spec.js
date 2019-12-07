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

  it("a new blog can be created", () => {
    cy.contains("login").click();
    cy.get("#username").type("111");
    cy.get("#password").type("111");
    cy.get("#login").click();
    cy.contains("new blog").click();
    cy.get("#title").type("Top of the World");
    cy.get("#author").type("Carpenters");
    cy.get("#url").type("N/A");
    cy.get("#likes").type("2");
    cy.get("#submit").click();
    cy.contains("Added a new blog");
  });
});

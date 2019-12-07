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
});

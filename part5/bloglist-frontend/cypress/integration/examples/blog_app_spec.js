describe("Blogs ", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "111",
      username: "111",
      password: "111"
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", () => {
    cy.contains("Blogs");
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.contains("login").click();
      cy.get("#username").type("111");
      cy.get("#password").type("111");
      cy.get("#login").click();
    });

    it("name of the user is shown", () => {
      cy.contains("111 logged in");
    });

    it("a new blog can be created", () => {
      cy.contains("new blog").click();
      cy.get("#title").type("Top of the World");
      cy.get("#author").type("Carpenters");
      cy.get("#url").type("N/A");
      cy.get("#likes").type("2");
      cy.get("#submit").click();
      cy.contains("Added a new blog");
    });
  });
});

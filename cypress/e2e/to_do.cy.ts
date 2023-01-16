describe("To Do app", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
    cy.contains("To Do");
  });
});

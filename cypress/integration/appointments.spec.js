describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should visit root", () => {
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book appointment", () => {
    cy.get("[alt='Add']")
      .first()
      .click()
      .get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones")
      .get("[alt='Sylvia Palmer']")
      .click();
    cy.contains("Save")
      .click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });
    cy.contains("Confirm").click();
    cy.contains("DELETING").should("exist");
    cy.contains("DELETING").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });

});
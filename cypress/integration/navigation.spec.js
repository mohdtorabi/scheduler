describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should book an interview", () => {    
    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {    
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true});

    cy.get("[data-testid=student-name-input]").clear().type("MoTO");
    cy.get("[alt='Tori Malcolm']").click();
    
    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "MoTO");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("should cancel an interview", () => {    
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true});

      cy.contains("Confirm")
      .click({ force: true});

      cy.contains("Deleting").should("exist");
      cy.contains("Deleting").should("not.exist");

      cy.contains(".appointment__card--show", "Mo To")
      .should("not.exist");
  });
});
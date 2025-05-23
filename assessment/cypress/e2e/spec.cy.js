describe("Bot AI Application", () => {
  beforeEach(() => {
    // Navigate to the app before each test
    cy.visit("https://x-bot-ai-three.vercel.app/");
  });
 
 
  it("Should have an input field to ask questions and return a response", () => {
    cy.get("input[placeholder='Message Bot AI...']").should("exist").type("Hi, what is the weather?");
    cy.get("button[type='submit']").click();
    cy.get("span").contains("Soul AI").should("exist"); // Check for AI response
  });
 
 
  it("Should show a default message if the question is not present in the static JSON data", () => {
    cy.get("input[placeholder='Message Bot AI...']").type("What is the capital of Mars?");
    cy.get("button[type='submit']").click();
    cy.get("p").contains("Sorry, Did not understand your query!").should("exist"); // Default message
  });
 
 
  it("Should show valid message if the question is present in the static JSON data", () => {
    cy.get("input[placeholder='Message Bot AI...']").type("Can you explain RESTful APIs?");
    cy.get("button[type='submit']").click();
    cy.get("p").contains("RESTful APIs are designed around the REST (Representational State Transfer) architecture, which uses HTTP requests to access and manipulate data. They follow a stateless, client-server, cacheable communications protocol.").should("exist"); // Default message
  });
 
 
  it("Should have a Past Conversations page which lists all the previous messages", () => {
    cy.get("a[href='/history']").click({ multiple: true });
    cy.url().should("include", "/history");
    cy.get("div").contains("Past Conversations").should("exist");
  });
 
 
 
 
  it("Past Conversations should be persistent across page refreshes using localStorage", () => {
    // Save a conversation
    cy.get("input[placeholder='Message Bot AI...']").type("Hi, how are you?");
    cy.get("button[type='submit']").first().click();
    cy.get("button[type='button']").last().click();
   
    // Refresh the page
    cy.reload();
 
 
    // Navigate to Past Conversations page
    cy.get("a[href='/history']").click();
    cy.get("div").contains("Hi, how are you?").should("exist"); // Verify persistence
  });
 
 
  it("Should have a New Chat button to start a new conversation", () => {
    // Ensure New Chat button exists
    cy.get("a[href='/']").contains("New Chat").should("exist").click();
 
 
    // Verify the input field is empty and ready for a new chat
    cy.get("input[placeholder='Message Bot AI...']").should("have.value", "");
  });
 });
 
 
 describe('Bot AI Application Behaviour', () => {
  beforeEach(() => {
    // Load the application
    cy.visit('https://x-bot-ai-three.vercel.app/');
  });
 
 
  it('should navigate to the Past Conversations page on button click', () => {
    cy.get('a[href="/history"]').click();
    cy.url().should('include', '/history');
  });
 
 
  it('should display the Bot AI header with correct title', () => {
    cy.get('header').within(() => {
      cy.contains('h1', 'Bot AI').should('be.visible');
    });
  });
 
 
  it('should allow user to type a message in the input field', () => {
    const userMessage = 'Hello, Bot!';
    cy.get('input[placeholder="Message Bot AI..."]')
      .type(userMessage)
      .should('have.value', userMessage);
  });
 
 
  it('should handle form submission', () => {
    const userMessage = 'What is the weather today?';
    cy.get('input[placeholder="Message Bot AI..."]')
      .type(userMessage)
      .should('have.value', userMessage);
    cy.get('form').submit();
    // Verify form submission handling (depends on app behavior)
  });
 });

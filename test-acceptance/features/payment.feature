Feature: As restaurant owner
         I want to register the new payment methods
         So I can keep track of them

Scenario: Filling payment registration form
Given I'm on the page "Payments"
And there are no Payments on the list
When I click the button "New" 
And fill the Tipo de pagamento with "PIX" 
And i confirm with "Enviar"
Then the "PIX" with status "Active" appears on the list
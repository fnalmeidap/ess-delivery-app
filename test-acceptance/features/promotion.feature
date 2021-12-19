Feature: As restaurant owner
         I want to register the new promotions
         So I can keep track of them

Scenario: Filling promotion registration form
Given I'm on the page "Promoções"
And there are no promotions on the list
When I click the button "New" 
And fill the Promoção with "Açaí 10%" and Período da promoção starting at "19/12/2021" until "20/12/2021" 
And i confirm with "Enviar"
Then the "Açaí 10%", status "Active" with date from "19/12/2021" to "20/12/2021" appears on the list
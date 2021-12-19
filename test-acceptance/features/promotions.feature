Feature: As restaurant owner
         I want to register the new promotions
         So I can keep track of them

Scenario: Filling promotion registration form
Given I'm on the page 'Promoções'
And there are no promotions on the list
When I click the button 'New' 
And fill the Promoção with 'Açaí 10%' and Período da promoção starting at '19/12/2021' until '20/12/2021' 
And i confirm with 'Enviar'
Then the 'Açaí 10%', status 'Active' with date from '19/12/2021' to '20/12/2021' appears on the list

Scenario: Adicionando nova promocao
Given eu estou na pagina de 'Promocoes'
And a data de hoje e '21/12/2021'
And nao existe uma promocao com nome 'Clone de Acai'
When eu clico em 'New'
And preencho com 'Clone de Acai' e periodo de promocao de '21/12/2021' até '22/12/2021'
And clico em 'Enviar'
Then eu estou na pagina de 'Promocoes'
And eu vejo uma nova promocao com nome 'Clone de Acai', data de expiracao '22/12/2021' e status 'Active'

Scenario: Remover promocao
Given eu estou na pagina de 'Promocoes'
And existe uma promocao com nome 'Clone da Acai' e status 'Active'
When eu clico na opcaode remover aquela promocao 
Then eu estou na pagina de 'Promocoes'
And eu nao vejo uma promocao com nome 'Clone da Acai' e status 'Active'
And eu vejo uma promocao com nome 'Clone da Acai' e status 'Removed'


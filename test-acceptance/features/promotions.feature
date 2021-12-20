Feature: As restaurant owner
         I want to register the new promotions
         So I can keep track of them

Scenario: Adicionando nova promocao
Given eu estou na pagina de "Promocoes"
And nao existe uma promocao com nome "Clone de Acai"
When eu clico em "New"
And preencho com "Clone de Acai" e periodo de promocao de "21/12/2021" até "22/12/2021"
And clico em "Enviar"
Then eu estou na pagina de "Promocoes"
And eu vejo uma nova promocao com nome "Clone de Acai"


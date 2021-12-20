Feature: As restaurant owner
         I want to register the new payment methods
         So I can keep track of them

Scenario: Adicionando cartao de credito como metodo de Pagamento
Given eu estou na pagina de "Pagamentos"
And não existe um metodo de pagamento com a chave "MASTER"
When eu clico em "New"
And adiciono as informações "Cartao de credito" e "MASTER"
And clico em "Enviar"
Then eu estou na pagina de "Pagamentos"
And eu vejo um novo metodo de pagamento com tipo "Cartao de credito", status "Active" e chave "MASTER"

Scenario: Adicionando nova chave PIX como metodo de pagamento
Given eu estou na pagina de "Pagamentos"
And não existe um metodo de pagamento com a chave "99988877700"
When eu clico em "New"
And adiciono as informações "PIX" e "99988877700"
And clico em "Enviar"
Then eu estou na pagina de "Pagamentos"
And eu vejo um novo metodo de pagamento com tipo "PIX", status "Active" e chave "99988877700"

Scenario: Removendo metodo de pagamento
Given eu estou na pagina de "Pagamentos"
And existe um metodo de pagamento com tipo "Cartao de credito", status "Active" e chave "MASTER"
When eu clico na opcao de remover aquele metodo de pagamento
Then eu estou na pagina de "Pagamentos"
And eu nao vejo mais um metodo de pagamento com tipo "Cartao de credito", status "Active" e chave "MASTER"
And eu vejo um metodo de pagamento com tipo "Cartao de credito", status "Removed" e chave "MASTER"
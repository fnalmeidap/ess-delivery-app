import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

//let sameCPF = ((elem, cpf) => elem.element(by.name('cpflist')).getText().then(text => text === cpf));
//let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na pagina de {stringInDoubleQuotes}$/, async () => {
        await browser.get("http://localhost:4200/promotions");
        await expect(browser.getTitle()).to.eventually.equal('Thiaguinho Açai');
    })

    Given(/^nao existe uma promocao com nome "(.*)"$/, async (nome_promocao) => {
        // Pegamos todos os nomes de promocao e vemos se existe algum igual a nome_promocao ("Clone Acai")
        //var allcpfs : ElementArrayFinder = element.all(by.name('cpflist'));
        //var samecpfs = allcpfs.filter(elem => elem.getText().then(text => text === cpf));
        //await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));

        var all_promocoes : ElementArrayFinder = element.all(by.name('promotion_name_list'));
        var same_promocoes = all_promocoes.filter(elem =>
                                          elem.getText().then(text => text === nome_promocao));
        await same_promocoes.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    When(/^eu clico em 'New'$/, async () => {
        await element(by.buttonText('New')).click();
    })

    When(/^preencho com "(.*)" e periodo de promocao de "(.*)"$/, async (nome_promocao, periodo) => {
        await $("input[name='promotion_namebox']").sendKeys(<string> nome_promocao);
        await $("input[name='promotion_periodbox']").sendKeys(<string> periodo);
        await element(by.buttonText('Enviar')).click();
    });

    Then(/^eu vejo uma nova promocao com nome "(.*)", data de expiracao "(.*)" e status "(.*)"$/, async (nome_promocao, exp_date, status_promocao) => {
        //var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        //await allalunos.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name))).then
        //           (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));

        var all_promocoes : ElementArrayFinder = element.all(by.name('promotion_name_list'));
        var same_promocoes = all_promocoes.filter(elem =>
                                          elem.getText().then(text => text === nome_promocao));

        await same_promocoes.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));

    });

})
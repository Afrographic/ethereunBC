const { assert } = require("chai");

let AfroToken = artifacts.require("./AfroToken.sol");
contract('AfroToken', function(accounts) {

    it('sets the total supply upon deployment', async function() {
        const afroToken = await AfroToken.deployed();
        const totalSupply = await afroToken.totalSupply();
        assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1.000.000');
        const adminBalance = await afroToken.balanceOf(accounts[0]);
        assert.equal(adminBalance.toNumber(), 1000000, 'It allocates the initial supply to the admin account')
    });

    it('initializes the contract with the correct values', async function() {
        // Name
        const afroToken = await AfroToken.deployed();
        const tokenName = await afroToken.name();
        assert.equal(tokenName, 'Afro Token', 'Has the correct name')

        // Symbol
        const tokenSymbol = await afroToken.symbol();
        assert.equal(tokenSymbol, 'AFRO')

        // Standart
        const standard = await afroToken.standard();
        assert.equal(standard, "Afro Token v1.0", "Has the correct standard")

    });

    it("transfers token ownership", async function() {
        const afroToken = await AfroToken.deployed();
        receipt = await afroToken.transfer(accounts[1], 25000, { from: accounts[0] });
        const balanceReceiver = await afroToken.balanceOf(accounts[1]);
        assert.equal(balanceReceiver, 25000, 'Token transfered!')
    })
});
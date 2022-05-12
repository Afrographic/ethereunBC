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

    it("approved token for delegated transfer", async function() {
        const afroToken = await AfroToken.deployed();
        const approved = await afroToken.approve.call(accounts[1], 100);
        assert.equal(approved, true, 'it returns true');
    })

    it('Handles delegated token transfers', async function() {
        const afroToken = await AfroToken.deployed();
        const fromAccount = accounts[2];
        const toAccount = accounts[3];
        const spendingAccount = accounts[4];
        // Transfer some tokens
        const receipt1 = await afroToken.transfer(fromAccount, 100, { from: accounts[0] });
        const receipt2 = await afroToken.approve(spendingAccount, 10, { from: fromAccount });
        // Try transferring something larger than the sender's balance
        const receipt3 = await afroToken.transferFrom(fromAccount, toAccount, 9999, { from: spendingAccount });
        receipt3.catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'Cannot transfer value larger than balance');
        });
    });
});
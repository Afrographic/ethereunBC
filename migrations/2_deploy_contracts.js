const AfroToken = artifacts.require("AfroToken");

module.exports = function(deployer) {
    deployer.deploy(AfroToken, 1000000);
};
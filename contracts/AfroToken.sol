pragma solidity ^0.5.0;

contract AfroToken{
    string public name = "Afro Token";
    string public symbol = "AFRO";
    string public standard = "Afro Token v1.0";

    uint256 public totalSupply;
    mapping( address => uint256) public balanceOf;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    constructor(uint256 _initialSupply) public{
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
        // allocate the initial supply
    } 

    function transfer(address _to,uint _value) public returns (bool success){
        require (balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
    }
}

// Get the accounsts : const accounts = await web3.eth.getAccounts()
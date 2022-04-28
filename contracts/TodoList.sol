pragma solidity ^0.5.0;
 
contract TodoList{
    constructor( ) public{
        createTask("Checkout out dappuniversity.com");
    }
    uint public taskCount = 0;
    mapping(uint =>Task) public tasks;


    struct Task{
        uint id;
        string content;
        bool completed;
    }

    function createTask(string memory _content) public{
        taskCount ++;
        tasks[taskCount] = Task(taskCount,_content,false);
    }
}
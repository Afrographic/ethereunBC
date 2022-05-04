pragma solidity ^0.5.0;
 
contract TodoList{
    constructor( ) public{
        createTask("Checkout out dappuniversity.com");
    }
    uint public taskCount = 0;
    mapping(uint =>Task) public tasks;
    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    event TaskCompleted(
        uint id,
        bool completed
    );

    struct Task{
        uint id;
        string content;
        bool completed;
    }

    function createTask(string memory _content) public{
        taskCount++;
        tasks[taskCount] = Task(taskCount,_content,false);
        emit TaskCreated(taskCount, _content, false);
    }

    function setCompleted(uint _idTask) public{
        Task memory _task = tasks[_idTask];
        _task.completed = true;
        tasks[_idTask] = _task;
        emit TaskCompleted(_idTask,true);
    }
}


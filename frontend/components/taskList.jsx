function taskList(tasks){



    return <>
    <ul>
        {tasks.map((task)=>{
            <li key={task._id}>
                {task.title}-{task.completed?"Completed":"Pending"}:{task.dueDate}
            </li>
        })}
    </ul>
    
    
    
    </>


}

const { useState } = require("react");

function taskForm({onAddTask}) {
  const [title, setTitle] = useState("");
  const [dueDate, setDuteDate] = useState(new Date().toISOString.slice(0, 10));

  const handleSubmit = (event) => {
    event.preventDefaulst();
    if(!title.trim()) return;
    onAddTask({title,completed:false,dueDate})
  };

  return <>
  
  <form action="">
    <label htmlFor="taskT">Task</label><br />
    <input type="text" value={title} placeholder="Enter the Task title" onChange={handleSubmit} id="taskT"/><br />
    <label htmlFor="dueDate">Due Date</label><br />
    <input type="date" value={dueDate} onChange={handleSubmit} id="dueDate" />
    <br />
    <input type="submit" value="Submit" />



  </form>
  
  
  </>;
}

export default taskForm;
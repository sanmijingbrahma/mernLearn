import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    fetchTask();
  },[]);

  const fetchTask = async ()=>{
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
    
        console.error("Error fetching tasks: ",error);
        
    }
  }

  const addTask = async(task)=>{
    try {
      const response = await fetch('http://localhost:5000/api/tasks',
        {
          method : "POST",
          headers : {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(task)
        })
        const newTask = response.json();
        setTasks([...task,newTask]);
      
    } catch (error) {
      console.error("Error While sending Request!");
      
    }
  }



  return (
    <>
      <h1>MERN Task Manager</h1>
      <taskForm onAddTask={addTask}/>
      

    </>
  )
}

export default App

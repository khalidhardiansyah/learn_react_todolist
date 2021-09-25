import { useState, useEffect } from "react"
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from "./components/Header"; //mengimport component header
import Tasks from "./components/Tasks";
import AddTaks from "./components/AddTaks";
import Footer from "./components/Footer";
import About from "./components/About";
function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [task, setTasks]= useState([])

  useEffect(()=> {
    const getTask = async() =>{
      const tasksFromServer = await fetchTask()
      setTasks(tasksFromServer)
    }
    
    getTask()
  }, [])

  //fetch task
  const fetchTask = async ()=>{
    const res = await fetch('http://localhost:5000/task')
    const data = await res.json()
    
    return data
  }

   //fetch task single
   const fetchTasksingle = async (id)=>{
    const res = await fetch(`http://localhost:5000/task/${id}`)
    const data = await res.json()
    
    return data
  }

  
    //add task
    const addTask = async (tasks)=>{
      const res = await fetch('http://localhost:5000/task', {
        method : 'POST',
        headers: {
          'Content-type': 'application/json' 
        },
        body: JSON.stringify(tasks)
      })

      const data = await res.json()
      setTasks([...task, data])

      // const id = Math.floor(Math.random()*1000) + 1
      // const newTask = {id, ...tasks }
      // setTasks([...task, newTask])
    } 
  

  //delete task
  const deleteTask = async (id) =>{
    await fetch(`http://localhost:5000/task/${id}`,{
      method: 'DELETE',
    })

    setTasks(task.filter((task)=> task.id !== id))

  }

  //reminder toggle
  const toggleReminder = async (id) =>{
    const taskToToggle = await fetchTasksingle(id)
    const updateTask = {...taskToToggle, reminder : !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/task/${id}`, {
      method: 'PUT',
      headers:{
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(updateTask)
    })

    const data = await res.json()

    setTasks(task.map((task)=>task.id === id ? {...task, reminder: data.reminder} : task))
  }

  return (
    <Router>
    <div className="App container">
      {/* //memanggil components header */}
      <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
     

      <Route path='/' exact render ={(props)=>(
        <>
           {showAddTask && <AddTaks onAdd={addTask} /> }
     {task.length > 0 ? <Tasks tasks={task} onDelete={deleteTask} onToggle={toggleReminder}/> : ('No Tasks To Show')}
        </>


      )}/>
     <Route path='/about' component={About}/>
     <Footer/>
    </div>
    </Router>
  );
}



export default App;

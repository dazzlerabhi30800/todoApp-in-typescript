import './App.css'
import Navbar from './Components/Navbar';
import Todos from './Components/Todos';
import AddTodo from './Components/addTodo';

function App() {

  return (
    <main>
      <h1>Todo App in React + Typescript</h1>
      <AddTodo />
      <Navbar />
      <Todos />
    </main>
  )
}

export default App

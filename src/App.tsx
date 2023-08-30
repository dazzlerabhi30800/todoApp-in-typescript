import './App.css'
import Navbar from './Components/Navbar';
import Todos from './Components/Todos';
import AddTodo from './Components/addTodo';
import { useTodos } from './Components/store/todos';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';



function App() {
  const { todos, setSortedTodos } = useTodos();

  const dragEnd = (event: DropResult) => {
    const { source, destination } = event;

    if (!destination) return;

    if (destination.index === source.index) return;

    let add, active = todos;
    if (source.droppableId === destination.droppableId) {
      add = active[source.index];
      active.splice(source.index, 1);
      active.splice(destination.index, 0, add);
    }

    setSortedTodos(active);
  }
  return (
    <DragDropContext onDragEnd={(event) => dragEnd(event)}>
      <main>
        <h1>Todo App in React + Typescript</h1>
        <AddTodo />
        <Navbar />
        <Todos />
      </main>
    </DragDropContext>
  )
}

export default App

import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import { useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "data1" },
    { id: 2, title: "data2" },
    { id: 3, title: "data3" },
  ]);
  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) {
      return;
    } else {
      const newTodoList = [...todoList];
      newTodoList.splice(index, 1);
      setTodoList(newTodoList);
    }
  }

  return (
    <div className="App">
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
    </div>
  );
}

export default App;

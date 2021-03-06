import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import queryString from "query-string";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "data1" },
    { id: 2, title: "data2" },
    { id: 3, title: "data3" },
  ]);

  const [postList, setpostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filters, setfilters] = useState({
    _limit: 10,
    _page: 1,
  });

  // tất cả effect đều chạy sau render
  useEffect(() => {
    // chạy trước 1
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);

        const { data, pagination } = responseJSON;
        setpostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("failded to fetch post list");
      }
    }
    console.log("POST list effect"); // sẽ không chạy lại lần thứ 2
    fetchPostList();
  }, [filters]); //chạy đúng 1 lần duy nhất

  useEffect(() => {
    // chạy sau 2
    console.log("TODO list effect"); // luôn luôn chạy sau mỗi lần render
  });

  function handlePageChange(newPage) {
    setfilters({
      ...filters,
      _page: newPage,
    });
  }

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

  function handleTodoFormSubmit(formValues) {
    console.log("form submit: ", formValues);
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="App">
      <h2>post list</h2>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;

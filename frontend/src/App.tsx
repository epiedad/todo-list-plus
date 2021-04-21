import React, { FormEventHandler, useEffect, useState } from "react";
import TodoList from "./components/TodoItems";
import AddTodo from "./components/AddTodo";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./API";
import { Container } from "react-bootstrap";
import Filter from "./components/Filter";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  //Search Filter
  const [word, setWord] = useState("");
  const [filterDisplay, setFilterDisplay] = useState<ITodo[]>([]);

  /* We need to know if a todo has been successfully added or not
  so that we can clear the input text and disable back the 'Add' btn */
  const [isTodoAdded, setIsTodoAdded] = useState(false);

  /* API Integration from ImgFLIP. We get the matched image name from our todo name */
  const [memes, setMemes] = useState<IMemes[]>([]);

  useEffect(() => {
    fetchTodos();
    fetchMemeImages();
  }, []);

  /* 3rd party integration. Fetch ImgFlip images */
  const fetchMemeImages = (): void => {
    fetch("https://api.imgflip.com/get_memes")
      .then((x) => x.json())
      .then((response) => setMemes(response.data.memes))
      .catch((err: Error) => console.log(err));
  };

  /* Fetch list */
  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
      .catch((err: Error) => console.log(err));
  };

  /* Create todo */
  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault();
    setIsTodoAdded(false);

    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved");
        }
        setTodos(data.todos);
        setIsTodoAdded(true); //Todo successfully added here
      })
      .catch((err) => console.log(err));
  };

  /* Update todo */
  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  /* Delete todo */
  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  /* Handle Search Filter */
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setWord(e.currentTarget.value);
    let oldList = todos;

    if (word !== "") {
      let newList = [];
      newList = oldList.filter((todo) => todo.name.toLowerCase().includes(word.toLocaleLowerCase()));
      setFilterDisplay(newList);
    } else {
      setFilterDisplay(todos);
    }
  };

  return (
    <main className="App">
      <Container>
        <h1>To Do</h1>
        <Filter value={word} handleFilter={handleFilter} />
        <AddTodo saveTodo={handleSaveTodo} isAdded={isTodoAdded} />
        <TodoList
          todoItems={word.length < 1 ? todos : filterDisplay}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          memes={memes}
        />
      </Container>
    </main>
  );
};

export default App;

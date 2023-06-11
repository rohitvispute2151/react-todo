import React, { useEffect, useState } from 'react'
import { Container ,Button } from 'react-bootstrap'


export default function App() {
  const [listItem, setListItem] = useState("");
  const [todoList, setTodoList] = useState(() => {
    const localValues = localStorage.getItem("items");
    if (localValues == null) return [];
    return JSON.parse(localValues);
  });
  const [editingItemId, setEditingItemId] = useState(null); 

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todoList));
  }, [todoList]);

  function handleSubmit(e) {
    e.preventDefault();

    if (editingItemId !== null) {
      // Editing existing item
      const updatedList = todoList.map((todo) => {
        if (todo.id === editingItemId) {
          return { ...todo, title: listItem };
        }
        return todo;
      });
      setTodoList(updatedList);
      setEditingItemId(null);
    } else {
      // Adding new item
      setTodoList((currTodoList) => [
        ...currTodoList,
        {
          id: crypto.randomUUID(),
          title: listItem,
          completed: false,
        },
      ]);
    }

    setListItem("");
  }

  function toggleItem(id, completed) {
    setTodoList((currTodoList) =>
      currTodoList.map((currTodo) => {
        if (currTodo.id === id) {
          return { ...currTodo, completed };
        }
        return currTodo;
      })
    );
  }

  function deleteItem(id) {
    setTodoList((currTodoList) =>
      currTodoList.filter((todo) => todo.id !== id)
    );
  }

  function EditItem(id) {
    const selectedItem = todoList.find((todo) => todo.id === id);
    if (selectedItem) {
      setListItem(selectedItem.title);
      setEditingItemId(id);
    }
  }

  return (
    <Container>
      <form className="d-flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name=""
          id=""
          className="form-control"
          placeholder="Enter Item to add..."
          value={listItem}
          onChange={(e) => setListItem(e.target.value)}
        />
        <Button variant="primary" type="submit">
          {editingItemId !== null ? "Edit" : "Add"}
        </Button>
      </form>
      <main className="my-5">
        <h2 className="border-bottom pb-2">Todo List</h2>
        <ul className="list-unstyled mt-4">
          {todoList.map((todo) => {
            return (
              <li className="d-flex align-items-center gap-2 py-2" key={todo.id}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="form-check-input"
                  checked={todo.completed}
                  onChange={(e) => toggleItem(todo.id, e.target.checked)}
                />
                <label htmlFor="">{todo.title}</label>
                <Button
                  variant="primary"
                  className="ms-4"
                  onClick={() => EditItem(todo.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="ms-4"
                  onClick={() => deleteItem(todo.id)}
                >
                  Done
                </Button>
              </li>
            );
          })}
        </ul>
      </main>
    </Container>
  )}
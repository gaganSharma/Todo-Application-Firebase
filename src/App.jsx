import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import "./App.css";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [todosList, setTodosList] = useState([
    { title: "Task Title", content: "Description", isCompleted: false },
  ]);
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");

  function handleAddTodo() {
    if (!contentText.trim()) {
      alert("Description is Empty.");
      return;
    }
    setTodosList([
      ...todosList,
      { title: titleText, content: contentText, isCompleted: false },
    ]);
    setTitleText("");
    setContentText("");
  }

  return (
    <div className="APP overflow-hidden">
      <h1>My todos</h1>

      <div className="todo-wrapper">
        <form className="todo-input items-end" onSubmit={handleAddTodo}>
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter the Title."
              value={titleText}
              onChange={(e) => {
                e.preventDefault();
                setTitleText(e.target.value);
              }}
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter the Description."
              value={contentText}
              onChange={(e) => {
                e.preventDefault();
                setContentText(e.target.value);
              }}
              required
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              className="primaryBtn"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        </form>

        <div className="btn-area">
          <button
            className={`secondryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {todosList.map((todoitem, key) => (
            <div key={key} className="todo-list-item">
              <div>
                <h3>{todoitem.title}</h3>
                <p>
                  {todoitem.isCompleted ? (
                    <strike>{todoitem.content}</strike>
                  ) : (
                    todoitem.content
                  )}
                </p>
              </div>
              <div className="todo-item-buttons-column">
                <div
                  className="todo-item-buttons"
                  onClick={() => {
                    // console.log("delete item ", key);
                    setTodosList(
                      todosList
                        .map((val, i) => (i === key ? null : val))
                        .filter((val) => val !== null)
                    );
                  }}
                >
                  <AiOutlineDelete className="icon" />
                </div>
                <div
                  className="todo-item-buttons"
                  onClick={() => {
                    // console.log("check item ", key);
                    setTodosList(
                      todosList.map((item, i) =>
                        i === key
                          ? {
                              title: todoitem.title,
                              content: todoitem.content,
                              isCompleted: !todoitem.isCompleted,
                            }
                          : item
                      )
                    );
                  }}
                >
                  <BsCheckLg className="check-icon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

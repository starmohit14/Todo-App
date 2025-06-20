import { useReducer, useEffect, useState } from "react";

// Reducer function
function todoReducer(todos, action) {
  switch (action.type) {
    case "add":
      return [...todos, { id: Date.now(), text: action.payload, done: false }];
    case "toggle":
      return todos.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    case "delete":
      return todos.filter((todo) => todo.id !== action.payload);
    case "edit":
      return todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    default:
      return todos;
  }
}

function App() {
  // useReducer & useState
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  //  Load todos from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("todos"));
    if (stored) {
      stored.forEach((todo) => dispatch({ type: "add", payload: todo.text }));
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add/Edit Todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (editId) {
      dispatch({ type: "edit", payload: { id: editId, text: input } });
      setEditId(null);
    } else {
      dispatch({ type: "add", payload: input });
    }

    setInput("");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #1f1c2c, #928dab)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(15px)",
          borderRadius: "15px",
          padding: "30px 20px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          transition: "0.3s ease-in-out",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
          📝 <span style={{ fontWeight: "bold" }}>Todo App</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            placeholder="Add a task..."
            onChange={(e) => setInput(e.target.value)}
            style={{
              padding: "12px",
              width: "94%",
              marginBottom: "15px",
              border: "none",
              borderRadius: "8px",
              outline: "none",
              fontSize: "16px",
              backgroundColor: "#2e2e2e",
              color: "#fff",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: "#ff4e50",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            {editId ? "Update" : "Add"}
          </button>
        </form>

        <ul style={{ listStyle: "none", padding: 0, marginTop: "25px" }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                backgroundColor: "#333",
                padding: "12px 15px",
                borderRadius: "8px",
                marginBottom: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textDecoration: todo.done ? "line-through" : "none",
                color: todo.done ? "#aaa" : "#fff",
                transition: "0.2s",
              }}
            >
              <span
                onClick={() => dispatch({ type: "toggle", payload: todo.id })}
                style={{ cursor: "pointer", flex: 1 }}
              >
                {todo.text}
              </span>
              <div style={{ marginLeft: "10px" }}>
                <button
                  onClick={() => {
                    setInput(todo.text);
                    setEditId(todo.id);
                  }}
                  style={{
                    marginRight: "8px",
                    background: "transparent",
                    border: "none",
                    color: "#ffd700",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  ✏
                </button>
                <button
                  onClick={() => dispatch({ type: "delete", payload: todo.id })}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#ff4e50",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

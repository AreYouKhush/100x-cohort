import React, { useState } from "react";

const App = () => {
  const [todo, setTodo] = useState([
    {
      id: 1,
      title: "Go to Gym",
      description: "Go to gym at 5 Pm and workout for atleast an hour.",
      editMode: false,
    },
    {
      id: 2,
      title: "Do 5 DSA questions",
      description: "DO 2 String based questions and 3 Array based questions.",
      editMode: false,
    },
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editing, setEditing] = useState(false);

  const addTodo = () => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000),
      title: title.trim(),
      description: description.trim(),
      editMode: false,
    };
    if(newTodo.title !== "" || newTodo.description !== ""){
      setTodo([...todo, newTodo]);
    }
    setTitle("");
    setDescription("");
  };

  const deleteTodo = (id) => {
    const filteredTodo = todo.filter((t) => t.id != id);
    setTodo([...filteredTodo]);
  };

  const toggleTodo = (id) => {
    setEditing(!editing);
    setTodo((prevTodos) =>
      prevTodos.map((t) => (t.id === id ? { ...t, editMode: !t.editMode } : t))
    );
    const findTodo = todo.find((t) => t.id === id);
    setEditTitle(findTodo.title);
    setEditDescription(findTodo.description);
  };

  const saveTodo = (id) => {
    setTodo((prevTodos) =>
      prevTodos.map((t) =>
        t.id === id
          ? { ...t, title: editTitle.trim(), description: editDescription.trim() }
          : t
      )
    );
  };

  return (
    <>
      <div className="m-5 flex justify-center items-center text-2xl flex-col gap-10">
        <h1 className="font-bold text-4xl text-slate-700">Todo App</h1>
        <div className="flex flex-col gap-3 ">
          <div className="flex gap-3">
            <input
              className="p-3 border-solid border-2 border-slate-700 w-full"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <button
              onClick={addTodo}
              className="bg-slate-900 text-white p-3 rounded-lg active:bg-slate-700"
            >
              Add
            </button>
          </div>
          <input
            type="text"
            className="p-3 border-solid border-2 border-slate-700 w-full h-14"
            placeholder="Description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div className="flex flex-col-reverse gap-7">
          {todo.map((to) => {
            return (
              <div
                key={to.id}
                className="bg-slate-500 p-5 rounded-lg text-white shadow-xl hover:shadow-2xl duration-150 cursor-pointer flex flex-col gap-2"
              >
                {to.editMode ? (
                  <>
                    <input
                      type="text"
                      className="bg-slate-400 font-bold w-full p-1 rounded-lg"
                      value={editTitle}
                      onChange={(e) => {
                        setEditTitle(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      className="bg-slate-400 text-lg w-full p-1 rounded-lg"
                      value={editDescription}
                      onChange={(e) => {
                        setEditDescription(e.target.value);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <h1 className="font-bold break-all">{to.title}</h1>
                    <p className="text-lg break-all">{to.description}</p>
                  </>
                )}
                <div className="flex justify-around gap-2">
                  {!to.editMode ? (
                    <>
                      <button
                        onClick={() => {
                          toggleTodo(to.id);
                        }}
                        className="bg-slate-400 px-5 py-2 text-sm rounded-2xl font-bold hover:bg-green-600 active:bg-green-700 duration-100"
                        disabled={editing ? true : false}
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          toggleTodo(to.id);
                          saveTodo(to.id);
                        }}
                        className="bg-slate-400 px-5 py-2 text-sm rounded-2xl font-bold hover:bg-green-600 active:bg-green-700 duration-100"
                      >
                        Save
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => {
                      deleteTodo(to.id);
                    }}
                    className="bg-slate-800 px-5 py-2 text-sm rounded-2xl font-bold hover:bg-red-600 active:bg-red-700 duration-100"
                    disabled={editing ? true : false}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;

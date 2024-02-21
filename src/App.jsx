import './todo.css'
import { useState, useEffect } from 'react'

export default function Todo() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([])

  function handleChange(event) {
    event.preventDefault();
    return setText(event.target.value)
  }

  // Funcion para crear el Todo
  function handleSubmit(e) {
    e.preventDefault();
    // Dos forma de hacerlo: 1°
    if (!e.target.query.value) return
    const field = e.target.query.value

    // 2°
    // if (!text) return
    // const field = text

    const todosObj =
    {
      id: crypto.randomUUID(),
      text: field,
      isEdited: false
    }
    setTodos([...todos, todosObj]);
    e.target.query.value = '';
    setText('');
    localStorage.setItem('todos', JSON.stringify([...todos, todosObj]));
  }

  // Funcion para borrar el Todo
  function handleClick(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
    localStorage.setItem('todos', JSON.stringify(todos.filter((todo) => todo.id !== id)));
  }


  // Funcion para editar el Todo
  function Edited(id) {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isEdited: !todo.isEdited };
      }
      return todo;
    }));

  }

  // Funcion para actualizar el Todo
  function handleSubmitUpdate(e, id) {
    e.preventDefault();
    if (!e.target.queryUpdated.value) return
    const field = e.target.queryUpdated.value
    // console.log(field, id)
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: field, isEdited: false };
      }
      return todo
    }))
  }

  // Leer los datos del localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  return (
    <>
      <div className='form-container'>
        <form action="" onSubmit={handleSubmit}>
          <input className='input' name='query' onChange={handleChange} type="text" />
          <button className='button' >Add</button>
          {/* {<p>{text}</p>} */}
        </form>
      </div>
      <div className={todos.length > 0 ? 'todo-container' : null}>
        {todos.map((todo) => (
          <div className='todo' key={todo.id} id={todo.id} >
            <p>{todo.text}</p>
            <div className='buttons' style={{ display: todo.isEdited ? ' none' : ' block' }}>
              <button style={{ backgroundColor: '#ff4b47', color: 'white' }} onClick={() => handleClick(todo.id)}>Delete</button>
              <button style={{ backgroundColor: '#00c6ff', color: 'white' }} onClick={() => Edited(todo.id)}>Edit</button>
            </div>
            {
              todo.isEdited ? (
                <>
                  <form className='formUpdated' onSubmit={(e) => handleSubmitUpdate(e, todo.id)}>
                    <input className='inputUpdated' name='queryUpdated' type="text" />
                    <button className='buttonUpdated'>Update</button>
                    <button className='buttonClose' onClick={() => Edited(todo.id)}>Close</button>
                  </form>
                </>
              ) : null
            }
          </div>
        ))}
      </div>
    </>
  )
}

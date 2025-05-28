import React, { useEffect, useState } from "react";
import "./Home.css";

const username = "nino";

const Home = () => {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  const crearUsuario = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/${username}`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Error creando usuario");
    } catch (error) {
      console.error(error);
    }
  };

  const cargarTareas = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/${username}`);
      if (!response.ok) throw new Error("Error cargando tareas");
      const data = await response.json();
      setTareas(data.todos || []);
    } catch (error) {
      console.error(error);
    }
  };

  const agregarTarea = async () => {
    if (nuevaTarea.trim() === "") return;

    try {
      const nueva = {
        label: nuevaTarea,
        is_done: false,
      };
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nueva),
      });
      if (!response.ok) throw new Error("Error guardando tarea");
      setNuevaTarea("");
      cargarTareas();
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error eliminando tarea");
      cargarTareas();
    } catch (error) {
      console.error(error);
    }
  };

  const limpiarTodo = async () => {
    for (const tarea of tareas) {
      await eliminarTarea(tarea.id);
    }
  };

  useEffect(() => {
    crearUsuario().then(cargarTareas);
  }, []);

  return (
    <div id="contenedor-todo">
      <h1>
        Lista de Tareas
        <span>Organiza tus tareas y sé más productivo</span>
      </h1>

      <div className="area-entrada">
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && agregarTarea()}
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <span className="etiqueta-tarea">{tarea.label}</span>
            <button className="borrar-btn" onClick={() => eliminarTarea(tarea.id)}>
              ✖
            </button>
          </li>
        ))}
      </ul>

      {tareas.length > 0 && (
        <button className="limpiar-btn" onClick={limpiarTodo}>
          Limpiar Todo
        </button>
      )}
    </div>
  );
};

export default Home;

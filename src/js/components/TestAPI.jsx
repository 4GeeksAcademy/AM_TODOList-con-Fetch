import { useEffect, useState } from "react";

const USERNAME = "nino";
const API_URL = `https://playground.4geeks.com/todo/todos/${USERNAME}`;

export default function TestAPI() {
  const [tareas, setTareas] = useState(null);

  useEffect(() => {
    // Crear lista vacía (PUT con [])
    fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([]),
    })
      .then(() => {
        // Cargar tareas después de crear la lista
        return fetch(API_URL);
      })
      .then((res) => {
        if (!res.ok) throw new Error("Error cargando tareas");
        return res.json();
      })
      .then((data) => {
        console.log("Tareas cargadas:", data);
        setTareas(data);
      })
      .catch((err) => {
        console.error("Error en TestAPI:", err);
      });
  }, []);

  return (
    <div>
      <h2>Prueba conexión API</h2>
      {tareas ? (
        <pre>{JSON.stringify(tareas, null, 2)}</pre>
      ) : (
        <p>Cargando tareas...</p>
      )}
    </div>
  );
}

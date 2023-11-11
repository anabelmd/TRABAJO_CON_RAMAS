


//Recupera ul
const listaTareas = document.querySelector("[id='lista-tareas']");
//Recupera input
const inputNuevaTarea = document.querySelector("#input-nueva-tarea");
//Recupera boton agregar
const botonAgregarTarea = document.querySelector(
  "button[id='boton-nueva-tarea']"
);

function crearTarea(titulo, descripcion = "", estaCompletada = false) {
  return {
    id: Date.now(),
    titulo,
    descripcion,
    estaCompletada,
  };
}


function agregarTarea(app) {
  const nuevoTituloTarea = app.inputNuevaTarea.value;
  const nuevaDescripcionTarea = document.querySelector("#input-descripcion-tarea").value;

  // Verificar que haya un título antes de agregar la tarea
  if (nuevoTituloTarea.trim() === "") {
    alert("Por favor, ingrese un título para la tarea.");
    return;
  }

  const nuevaTarea = crearTarea(nuevoTituloTarea, nuevaDescripcionTarea);

  app.tareas.push(nuevaTarea);
  agregarTareaALista(nuevaTarea, app.listaTareas);

  // Limpiar los campos después de agregar la tarea
  app.inputNuevaTarea.value = "";
  document.querySelector("#input-descripcion-tarea").value = "";
}



function crearElementoTarea(tarea) {
  const elementoTarea = document.createElement("li");

  const checkboxTarea = document.createElement("input");
  checkboxTarea.type = "checkbox";
  checkboxTarea.checked = tarea.estaCompletada;

  const textoTarea = document.createElement("span");
  actualizarTexto();

  checkboxTarea.addEventListener("change", () => {
    tarea.estaCompletada = checkboxTarea.checked;
    textoTarea.classList.toggle("completada", tarea.estaCompletada);
    actualizarTexto();
  });

  const botonBorrarTarea = document.createElement("button");
  botonBorrarTarea.textContent = "Eliminar";
  botonBorrarTarea.className = "boton-eliminar";
  botonBorrarTarea.addEventListener("click", () => {
    // Elimina la tarea del array
    const tareaIndex = app.tareas.indexOf(tarea);
    app.tareas.splice(tareaIndex, 1);

    // Elimina el elemento de la lista de tareas en el DOM
    elementoTarea.remove();
  });

  const divCheckSpan = document.createElement("div");
  divCheckSpan.appendChild(checkboxTarea);
  divCheckSpan.appendChild(textoTarea);
  elementoTarea.appendChild(divCheckSpan);
  elementoTarea.appendChild(botonBorrarTarea);

  function actualizarTexto() {
    textoTarea.textContent = `${tarea.titulo} - ${tarea.descripcion}`;
  }

  return elementoTarea;
}


botonAgregarTarea.addEventListener("click", () => {
  agregarTarea(app);
});

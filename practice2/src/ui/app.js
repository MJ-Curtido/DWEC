// app.js — Bloque B · ✍️ B4, B5 y B6. Conecta el modelo (el tablero) con la página: pinta, escucha y avisa.
// Usa tus piezas: crearTarjeta/pintarLista, leerFormulario/mostrarErrores y delegar.
// La estructura de la página (ids, data-*) está en index.html y NO se cambia: la usan los tests.
import { ErrorTablero } from "../modelo/errores.js";
import { delegar } from "./delegacion.js";
import { leerFormulario, mostrarErrores } from "./formulario.js";
import { pintarLista } from "./tarjeta.js";

/** Botones de cada tarjeta según su columna: [texto, data-accion] */
const ACCIONES = {
  "Por hacer": [["Empezar →", "empezar"]],
  "En curso": [
    ["← Volver", "volver"],
    ["✓ Completar", "completar"],
  ],
  Hecho: [],
};

// ✍️ B6 · validar(datos) → { campo: "mensaje" } con los errores (objeto vacío si todo está bien)
//   - titulo: obligatorio y como mucho 80 caracteres
//   - cadaDias (si viene): entero mayor que 0. Si es correcto pero no hay limite, el error va
//     en «limite»: una tarea que se repite necesita fecha límite
export function validar(datos) {
  const result = {};

  if (!datos.titulo || datos.titulo.length > 80) {
    result.titulo =
      "El título es obligatorio y tiene que tener menos de 80 caracteres";
  }

  if (Number.isInteger(datos.cadaDias) && datos.cadaDias > 0 && !datos.limite) {
    result.limite = "Una tarea que se repite necesita fecha límite";
  }

  if (
    datos.cadaDias !== undefined &&
    (!Number.isInteger(datos.cadaDias) || datos.cadaDias <= 0)
  ) {
    result.cadaDias =
      "Una tarea se puede repetir si es cada días positivos y enteros";
  }

  return result;
}

/**
 * Arranca la interfaz dentro de raiz (el <main id="app">). Los listeners se ponen UNA vez aquí;
 * pintar() solo cambia nodos, así que repintar no los duplica.
 * opciones.hoy: fecha fija para los tests · opciones.alCambiar(tablero): tras cada cambio (UD6)
 */
export function iniciarApp(
  raiz,
  tablero,
  { hoy = null, alCambiar = () => {} } = {},
) {
  const form = raiz.querySelector("#form-alta");
  const aviso = raiz.querySelector("#aviso");
  const columnas = raiz.querySelector("#columnas");
  const resumen = raiz.querySelector("#resumen");

  // ✍️ B4 · pintar(): deja la página igual que el modelo cada vez que se llama, y NO pone listeners
  //   - cada columna ([data-columna="…"]): sus tareas en el orden de ordenadas(), con pintarLista en su
  //     .lista, y en cada .tarjeta sus botones según ACCIONES: <button type="button" data-accion="…">
  //   - el .contador de cada columna: (n), o (n/límite) en la que tiene límite WIP
  //   - [data-dato="progreso"]: hechas ÷ total en %, redondeado (con el tablero vacío, 0 %)
  //   - [data-dato="vencidas"]: las vencidas de tablero.resumen(ahora)
  //   La fecha de hoy: const ahora = hoy ?? new Date();  (los tests pasan una fija)
  function pintar() {
    const progressHTML = resumen.querySelector('[data-dato="progreso"]');
    const totalHecho = tablero.columna("Hecho").tareas.length;
    const total =
      tablero.columna("Por hacer").tareas.length +
      tablero.columna("En curso").tareas.length +
      tablero.columna("Hecho").tareas.length;
    const percent = (totalHecho / total) * 100;
    progressHTML.textContent = `${Math.round(percent * 100) / 100} %`;

    const defeatedHTML = resumen.querySelector('[data-dato="vencidas"]');
    const now = hoy ?? new Date();
    defeatedHTML.textContent = tablero.resumen(now).vencidas;

    for (const column of tablero.columnas) {
      const columnHTML = columnas.querySelector(
        `[data-columna="${column.nombre}"]`,
      );
      const contHTML = columnHTML.querySelector(".contador");
      const listHTML = columnHTML.querySelector(".lista");

      contHTML.textContent = column.limiteWip
        ? `(${column.tareas.length}/${column.limiteWip})`
        : `(${column.tareas.length})`;
      pintarLista(listHTML, column.ordenadas());

      const cardsHTML = listHTML.querySelectorAll(`.tarjeta`);

      if (ACCIONES[column.nombre].length > 0) {
        for (const cardHTML of cardsHTML) {
          for (const action of ACCIONES[column.nombre]) {
            const button = document.createElement("button");
            button.type = "button";
            button.dataset.accion = action[1];
            button.textContent = action[0];

            cardHTML.append(button);
          }
        }
      }
    }
  }

  // 👀 Resuelto: avisar("texto") enseña el aviso; avisar("") lo esconde
  function avisar(mensaje) {
    aviso.textContent = mensaje;
    aviso.hidden = mensaje === "";
  }

  // ✍️ B5 · UN listener, puesto UNA vez aquí (nunca dentro de pintar): clic en los botones de las
  //   tarjetas, con delegar sobre `columnas`. empezar → «En curso», volver → «Por hacer», completar.
  //   Tras cada cambio que sale bien: avisar(""), pintar() y alCambiar(tablero).
  //   Si el tablero lanza un ErrorTablero → avisar(error.message) y no se repinta.
  //   Cualquier otro error → se relanza (es un fallo del programa).
  //   Pista: una función cambiar(accion) con el try/catch te sirve también para el B6.

  function change(id, action) {
    try {
      switch (action) {
        case "empezar":
          tablero.mover(id, "En curso");
          avisar("");
          pintar();
          alCambiar(tablero);
          break;

        case "volver":
          tablero.mover(id, "Por hacer");
          avisar("");
          pintar();
          alCambiar(tablero);
          break;

        case "completar":
          tablero.completar(id);
          avisar("");
          pintar();
          alCambiar(tablero);
          break;

        default:
          throw new ErrorTablero("Acción no válida.");
      }
    } catch (e) {
      avisar(e.message);
    }
  }
  const moveCard = (button, e) => {
    const card = e.target.closest("[data-id]");
    change(Number(card.dataset.id), button.dataset.accion);
  };
  delegar(columnas, "click", "button[data-accion]", moveCard);

  // ✍️ B6 · submit de `form`: preventDefault, leerFormulario, validar y mostrarErrores. Si hay errores,
  //   no se crea nada. Si no, tablero.crearTarea(datos) (como un cambio más) y form.reset().

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = leerFormulario(form);
    const errors = validar(data);

    if (Object.keys(errors).length === 0) {
      tablero.crearTarea(data);

      form.reset();
      pintar();
      alCambiar(tablero);
    }

    mostrarErrores(form, errors);
  });

  pintar();
  return { pintar };
}

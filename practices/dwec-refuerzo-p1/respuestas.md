# ✍️ Explícalo con tus palabras

Sustituye cada `____` por tu respuesta: **con tus
palabras**, 3–6 líneas y con un ejemplo de código tuyo. No copies la teoría: si no sabes
explicarlo sin mirar, todavía no lo has entendido (y es justo lo que tienes que repasar).

## 1 · `||` frente a `??`

¿Cuándo dan resultados distintos? Pon un ejemplo con un stock que vale `0`.

`??` es solo para cuando el valor es `null` o `undefined`, en cambio `||` ocurre también cuando el valor es 0, "" y NaN.
`const num = 0 || 7; --> 7`
`const num = 0 ?? 7; --> 0`
`const string = null || "Hola"; --> "Hola"`
`const string = null && "Hola"; --> "Hola"`

## 2 · Los tres puntos `...`

En `function sumarImportes(...importes)` y en `[...catalogo]` se escriben igual. ¿Qué hace cada uno?

`(...importes)` genera un array de los parámetros introducidos en la función, y `[...catalogo]` te crea una copia en tiempo de ejecución del array, para cualquier cambio realizado, que no se refleje en el mismo.
`const test(...args) => {}`
`const updatedCatalog = [...catalogo].sort();`

## 3 · Closure

En tu `crearListaDeseos()`, ¿por qué nadie puede escribir `deseos.titulos = []` y borrar la
lista? ¿Dónde «vive» el array de títulos?

Porque el array de títulos se encuentra dentro de `crearListaDeseos()`, y es privada y solo modificable mediante las funciones públicas que se ponen en el return, en este caso, `deseos.titulos()` es una función que devuelve una copia de titulos.

## 4 · Mutar

¿Qué tenía de malo `productos.sort(...)` en el bug 3? ¿Por qué con `const` no basta para
proteger un array?

Al realizar `productos.sort(...)` sobre el array, se modifica el valor del mismo, por eso la solución era realizarlo sobre una copia del mismo. Y `const` no basta para protegerlo porque lo protege de los cambios de referencia, por eso no puedes igualarlo a otro cuando es `const`, pero si cambiar sus valores mediante sus diferentes métodos.

## 5 · Depurar

¿Qué te enseña un breakpoint que no te enseña un `console.log`? Di dos cosas que hayas usado
(Ámbito/Scope, Watch, pasar a la siguiente línea, entrar en la función, breakpoint condicional…).

El valor en tiempo real, las modificaciones que van ocurriendo sobre las variables y en los métodos y condiciones que se entra. Y he usado breakpoints condicionales y pasar a la siguiente línea, que son muy interesantes para ver el recorrido que se sigue a veces y para controlar en casos concretos.

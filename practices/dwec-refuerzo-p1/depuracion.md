# 🐞 Bloque D · Mi informe de depuración

Rellena una ficha por bug. Sustituye cada `____` por lo que hayas visto TÚ en las DevTools.
Ejemplo de cómo se escribe una variable vista en el panel «Ámbito» (Scope): `i = 1`, `texto = "3"`.

## 👀 Ejemplo (ya resuelto) · Total del ticket

- **Síntoma:** sale 85 € y debería salir 105 €.
- **Breakpoint en:** `caja.js:17` (la línea `const linea = lineas[i];`)
- **Lo que vi:** en la primera parada `i = 1` y `linea` es el Zelda: el Tetris (posición 0) no se suma nunca.
- **Por qué falla:** el bucle empieza en 1 y los arrays empiezan en 0.
- **Arreglo:** `for (let i = 0; ...)`.

## Bug 1 · Añadir unidades

- **Síntoma:** Cuando añades 3 u hola, se añaden literal a lo que haya, no se hace la suma ni se comprueba si es un número
- **Breakpoint en:** `caja.js:26` (la línea `const nuevas = actuales + textoDelUsuario;`)
- **Lo que vi:** `actuales` es un número y `textoDelUsuario` es un string
- **Por qué falla:** al sumarlos se añade y se convierte a cadena
- **Arreglo:** castearlo a int y comprobar si es un número

## Bug 2 · Stock de cada producto

- **Síntoma:** Sonic tiene 0 así que muestra sin unidades
- **Breakpoint en:** `caja.js:37` (la línea `const stock = producto.stock || 'sin datos';`)
- **Lo que vi:** Sonic 2 aparece `sin datos`
- **Por qué falla:** Se comprueba con `||` así que si es 0, muestra `sin datos`
- **Arreglo:** cambiar `||` por `??`

## Bug 3 · Ordenar por precio

- **Síntoma:** Cuando ordenas por precio y luego muestras el catálogo, éste aparece desordenado
- **Breakpoint en:** `caja.js:26` (la línea `const ordenados = [...productos].sort((a, b) => a.precio - b.precio);`)
- **Lo que vi:** Cuando ordenas por precio y luego muestras el catálogo, éste aparece desordenado
- **Por qué falla:** el sort modifica el array original
- **Arreglo:** en vez de ejecutar el sort al array original, se lo realizamos a una copia

## Bug 4 · Descuento por volumen

- **Síntoma:** Se pone el descuento de 3 unidades
- **Breakpoint en:** `caja.js:26` breakpoint condicional: `unidades === 4` (la línea `let descuento = 0;`)
- **Lo que vi:** al usar el de 4 unidades no se pone el descuento que debería
- **Por qué falla:** la condición no está bien hecha
- **Arreglo:** cambiar en la condición de `unidades > 4` a `unidades >= 4`

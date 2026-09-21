# Despertar del DOM

## Descripción

Despertar del DOM es un pequeño juego de reflejos ambientado en un duelo de pistolas láser futuristas.

El objetivo es disparar a los targets que aparecen aleatoriamente en el tablero lo más rápido posible. La partida consta de 5 rondas y, al finalizar, se calcula la media de los tiempos obtenidos y se registra en un leaderboard.

¿Podrás convertirte en el pistolero más rápido de la galaxia?

## Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio.
2. Abrir la carpeta del proyecto.
3. Abrir `Index.html` en un navegador.
4. Pulsar `START` para comenzar una partida.

No es necesario instalar ninguna dependencia.

## Funcionamiento

- El tablero 5x5 se genera dinámicamente mediante JavaScript.
- En cada ronda aparecen 3 targets en posiciones aleatorias sin repetirse.
- El jugador debe pulsar todos los targets para terminar la ronda.
- Entre rondas existe un tiempo de espera aleatorio.
- El cronómetro comienza cuando aparecen los targets y se detiene al completar la ronda.
- La partida consta de 5 rondas.
- Al finalizar se calcula la media de los tiempos obtenidos.
- Los jugadores y sus tiempos se almacenan para construir un leaderboard.
- El leaderboard se ordena de menor a mayor tiempo.
- Se puede cambiar el nombre del jugador.
- Pulsando la tecla `N` se activa o desactiva el modo oscuro.

## Decisiones tomadas

- El tablero se genera mediante JavaScript en lugar de escribir las 25 casillas manualmente en HTML.
- Los targets se seleccionan aleatoriamente evitando posiciones repetidas.
- Los eventos se gestionan mediante `addEventListener`.
- Las clases de las casillas se modifican mediante `classList`.
- El cronómetro utiliza `setInterval` y las pausas entre rondas utilizan `setTimeout`.
- El leaderboard utiliza dos arrays relacionados para almacenar jugadores y tiempos.
- Los récords se ordenan mediante el algoritmo de burbuja.
- El modo oscuro se activa añadiendo o eliminando la clase `dark` del `body`, dejando que CSS modifique los elementos necesarios.

## Uso de IA

Durante el desarrollo he utilizado ChatGPT como herramienta de apoyo para resolver dudas concretas sobre HTML, CSS y JavaScript. La IA se ha utilizado principalmente para comprender conceptos, detectar errores, estudiar alternativas para implementar algunas partes del proyecto y ayudar en la redacción y organización del README a partir del funcionamiento y las decisiones tomadas durante el desarrollo.

Dos prompts reales relevantes realizados durante el desarrollo fueron:

- "¿Cómo puedo generar números aleatorios sin repetición?"
- "¿Por qué funciona `body.dark #instruciones` y todo el resto de propiedades no sobrescritas las toma del otro CSS?"

Las respuestas de la IA se utilizaron como apoyo y posteriormente adapté las soluciones al funcionamiento y estructura de mi proyecto.

Para verificar el código sugerido, he probado las funcionalidades directamente en el navegador, comprobando el tablero, la generación de targets, el cronómetro, las rondas, el leaderboard y el cambio entre el estilo normal y el modo oscuro.

La estructura general del juego, la integración entre sus diferentes funciones, la temática, el diseño visual y la adaptación final del código se han realizado manualmente. También he revisado los cambios para asegurarme de comprender el funcionamiento del código utilizado.

## Autopsia

### 1. Dos arrays paralelos para el leaderboard

Una decisión discutible ha sido almacenar los nombres de los jugadores y sus tiempos en dos arrays diferentes: `jugadoresRecord` y `tiemposRecord`. Esto obliga a mantener los mismos índices relacionados y, al ordenar los tiempos, también hay que intercambiar manualmente los jugadores correspondientes.

La alternativa que descarté fue utilizar un único array de objetos, donde cada elemento almacenase conjuntamente el nombre y el tiempo de un jugador. Elegí utilizar dos arrays separados para mantener los tipos de datos organizados: uno contiene únicamente los nombres de los jugadores como String y el otro únicamente los tiempos en milisegundos. De esta forma no tengo nombres y tiempos mezclados en una misma estructura, aunque esto implica tener que mantener relacionados los índices de ambos arrays durante la ordenación.

### 2. Clase `dark` en el `body` para el modo oscuro

Para implementar el modo oscuro decidí añadir o eliminar una única clase `dark` en el `body` mediante `classList.toggle()`. Después, CSS utiliza selectores como `body.dark #leaderboard` o `body.dark .casilla` para modificar únicamente las propiedades que cambian en el modo oscuro.

La alternativa que descarté fue añadir y eliminar la clase `dark` individualmente en cada elemento de la página desde JavaScript. Elegí modificar únicamente el `body` porque permite que JavaScript se limite a indicar el estado de la página y que CSS se encargue de su apariencia, evitando modificar muchos elementos por separado.
# \# Despertar del DOM

# 

# \## Descripción

# 

# Despertar del DOM es un pequeño juego de reflejos ambientado en un duelo de pistolas láser futuristas.

# 

# El objetivo es disparar a los targets que aparecen aleatoriamente en el tablero lo más rápido posible. La partida consta de varias rondas y, al finalizar, se calcula la media de los tiempos obtenidos y se registra en un leaderboard.

# 

# ¿Podrás convertirte en el pistolero más rápido de la galaxia?

# 

# \## Cómo ejecutar el proyecto

# 

# 1\. Clonar o descargar el repositorio.

# 2\. Abrir la carpeta del proyecto.

# 3\. Abrir `Index.html` en un navegador.

# 4\. Pulsar `START` para comenzar una partida.

# 

# No es necesario instalar ninguna dependencia.

# 

# \## Funcionamiento

# 

# \- El tablero se genera dinámicamente mediante JavaScript.

# \- En cada ronda aparecen varios targets en posiciones aleatorias.

# \- El jugador debe pulsar todos los targets para terminar la ronda.

# \- Entre rondas existe un tiempo de espera aleatorio.

# \- Al finalizar todas las rondas se calcula el tiempo medio.

# \- Los jugadores se ordenan en el leaderboard de menor a mayor tiempo.

# 

# \## Decisiones tomadas

# 

# \- El tablero se genera mediante JavaScript en lugar de escribir las casillas manualmente en HTML.

# \- Los targets se seleccionan aleatoriamente evitando posiciones repetidas.

# \- Se utiliza un cronómetro para medir el tiempo empleado en cada ronda.

# \- El leaderboard utiliza dos arrays relacionados para almacenar los jugadores y sus tiempos.

# \- Los récords se ordenan mediante el algoritmo de burbuja.

# 

# \## Uso de IA

# 

# Durante el desarrollo he utilizado ChatGPT como herramienta de apoyo para resolver dudas concretas sobre HTML, CSS y JavaScript.

# 

# Algunos ejemplos de consultas realizadas:

# 

# \- "¿Cómo puedo generar números aleatorios sin repetición?"

# \- "¿Cómo puedo ordenar dos arrays simultáneamente manteniendo relacionados sus índices?"

# 

# He utilizado las respuestas como ayuda para entender los conceptos y posteriormente he adaptado e integrado las soluciones en mi propio código.

# 

# Para verificar el código generado o sugerido, he probado las distintas funcionalidades directamente en el navegador y he revisado el comportamiento mediante la consola y diferentes casos de prueba.

# 

# La estructura del juego, su funcionamiento, la integración de las distintas funciones y las decisiones de diseño se han realizado y adaptado manualmente durante el desarrollo.

# 

# \## Autopsia

# 

# \### ¿Qué ha salido bien?

# 

# La generación dinámica del tablero, el sistema de rondas y el cronómetro han permitido crear un juego funcional utilizando manipulación del DOM y JavaScript.

# 

# \### ¿Qué ha sido más difícil?

# 

# Una de las partes más complicadas ha sido gestionar correctamente los tiempos y coordinar el cambio entre rondas utilizando `setInterval` y `setTimeout`.

# 

# También ha sido necesario mantener relacionados los jugadores y sus tiempos al ordenar el leaderboard.

# 

# \### ¿Qué mejoraría?

# 

# Con más tiempo añadiría más feedback visual y sonoro, diferentes dificultades y más elementos relacionados con la temática de pistolas láser futuristas.


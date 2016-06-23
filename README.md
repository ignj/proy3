# Proyecto desarrollado para la materia Ingeniería de aplicaciones web

## Características del desarrollo:

Se realizó utilizando MongoDB, Express, AngularJS y Node.js

Se implemento siguiendo un estilo de servicios tipo REST para el acceso y la actualización de datos.

## Características de la aplicación

La misma facilita la administración de películas. Una característica importante es que permite obtener información relacionada de cada película especificando su titulo y utilizando un servicio web para recuperar el resto de la información.

Entre la funcionalidad que ofrece se destaca:

1. Listar las películas ordenadas por fecha de subida o por su año de estreno
2. Relacionar las películas entre sí.
3. A los usuarios visitantes:
  * Autenticarse utilizando su cuenta de Google.
  * Una vez autenticado, comentar y calificar películas.
4. A los usuarios administradores:
  * ABM de películas, pudiendo pre-cargar la información al momento de ser agregada a partir de una búsqueda en un servicio web.
  * Hacer referencia a otras películas.

Se incorpora la posibilidad de que un usuario sea administrador utilizando un código especial. Esto queda documentado en la ayuda (se considera la aplicación para la muestra de los conceptos, no como producto final, por lo que el código se puede encontrar en la misma ayuda).

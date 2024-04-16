# Tercera pre entrega

## Mejorando arquitectura del servidor

## Objetivos generales

- Profesionalizar el servidor

## Objetivos específicos

- Aplicar una arquitectura profesional para nuestro servidor.
- Aplicar prácticas como patrones de diseño, mailing, variables de entorno, etc.

## Entregables

### Modificación de la capa de persistencia

- Modificar nuestra capa de persistencia para aplicar los conceptos de Factory (opcional), DAO y DTO.

### Implementación de Factory y DAO

- El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente) será devuelto por una Factory para que la capa de negocio opere con él. (Factory puede ser opcional).

### Patrón Repository

- Implementar el patrón Repository para trabajar con el DAO en la lógica de negocio.

### Modificación de la ruta /current

- Para evitar enviar información sensible, enviar un DTO del usuario sólo con la información necesaria.

### Middleware para sistema de autorización

- Realizar un middleware que pueda trabajar en conjunto con la estrategia "current" para hacer un sistema de autorización y delimitar el acceso a dichos endpoints:
  - Sólo el administrador puede crear, actualizar y eliminar productos.
  - Sólo el usuario puede enviar mensajes al chat.
  - Sólo el usuario puede agregar productos a su carrito.

### Modelo Ticket

- Crear un modelo Ticket el cual contará con todas las formalizaciones de la compra. Este contará con los campos:
  - Id (autogenerado por mongo)
  - code: String debe autogenerarse y ser único
  - purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
  - amount: Number, total de la compra.
  - purchaser: String, contendrá el correo del usuario asociado al carrito.

### Ruta de compra en el router de carts

- Implementar, en el router de carts, la ruta `/:cid/purchase`, la cual permitirá finalizar el proceso de compra de dicho carrito.
  - La compra debe corroborar el stock del producto al momento de finalizarse.
  - Si el producto tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces restarlo del stock del producto y continuar.
  - Si el producto no tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces no agregar el producto al proceso de compra.

### Servicio de Tickets

- Al final, utilizar el servicio de Tickets para poder generar un ticket con los datos de la compra.
- En caso de existir una compra no completada, devolver el arreglo con los ids de los productos que no pudieron procesarse.
- Una vez finalizada la compra, el carrito asociado al usuario que compró deberá contener sólo los productos que no pudieron comprarse. Es decir, se filtran los que sí se compraron y se quedan aquellos que no tenían disponibilidad.

### Checklist entrega

- Orden, mejoras, correcciones, prolijidad y testing:
  - Deberán presentar un proyecto organizado en sus respectivos archivos y carpetas.
  - Los nombres de los archivos deben ser coherentes con su contenido.
  - El código debe ser legible y prolijo. Los nombres de las funciones y métodos deben ser coherentes con su lógica y/o funcionalidad.
  - Todo el código debe estar en inglés a excepción de los console.log o respuestas en POSTMAN.
  - Evitar dejar grandes bloques de código comentados si tienen la certeza que no los van a usar en un futuro, ya que le quita prolijidad al trabajo.
  - Cada respuesta del servidor debe tener su status code correspondiente (los errores NO pueden tener status code 200).
  - Deberán garantizar que cada bad request de un usuario tenga su mensaje de error. En esta entrega ya deberían tener atajados la mayor cantidad posible de casos de errores. Si como usuario envío un ID inexistente por POSTMAN automáticamente me tienen que informar que estoy cometiendo un error. Esto ya lo hicieron en las entregas anteriores, lo dejo a modo de aclaración por si alguno aún no realizo las validaciones para esos errores.
  - Se revisará que se hayan agregado las correcciones realizadas en entregas anteriores (esto es fundamental porque hay varios casos donde no corrigen lo marcado en las devoluciones y continúan arrastrando errores entrega a entrega, recuerden que esta entrega lleva una calificación).
  - El alumno deberá testear su proyecto de punta a punta con el fin de evitar errores de sintaxis o irregularidades. En caso de no lograr solucionar los errores, deberán comunicarlo en el mensaje del espacio de entrega o por mensaje privado como prueba fehaciente de que testearon su trabajo.
- Arquitectura: El proyecto se encuentra separado por capas
- Persistencia: El proyecto cuenta con DAO de archivos y DAO de MongoDB
- Seguridad: Los endpoints se encuentran protegidos por roles
- Proceso de compra:
  - El carrito sólo compra los productos en stock
  - El ticket se genera con los datos de compra
- Seguridad:
  - Envía correos.
  - Envía SMS

## Testing

### Recuerda reemplazar :id, :cid, y :pid con los identificadores apropiados cuando utilices estas URLs

### Recuerda que ahora algunas secciones estas restringidas por rol

### URLs de Prueba para API de Productos

- [Listar todos los productos](http://localhost:8080/api/products) - `http://localhost:8080/api/products` - Método: `GET`.
- [Obtener un producto por ID](http://localhost:8080/api/products/:id) - `http://localhost:8080/api/products/:id` - Método: `GET`.
- [Agregar un nuevo producto](http://localhost:8080/api/products) - `http://localhost:8080/api/products` - Método: `POST`.
- [Actualizar un producto por ID](http://localhost:8080/api/products/:id) - `http://localhost:8080/api/products/:id` - Método: `PUT`.
- [Eliminar un producto por ID](http://localhost:8080/api/products/:id) - `http://localhost:8080/api/products/:id` - Método: `DELETE`.
- [Primera Página (default limit 10)](http://localhost:8080/api/products/?page=1) - `http://localhost:8080/api/products/?page=1` - Método: `GET`.
- [Segunda Página (default limit 10)](http://localhost:8080/api/products/?page=2) - `http://localhost:8080/api/products/?page=2` - Método: `GET`.
- [Limitar a 5 Productos](http://localhost:8080/api/products/?limit=5) - `http://localhost:8080/api/products/?limit=5` - Método: `GET`.
- [Limitar a 20 Productos](http://localhost:8080/api/products/?limit=20) - `http://localhost:8080/api/products/?limit=20` - Método: `GET`.
- [Orden Ascendente por Precio](http://localhost:8080/api/products/?sort=asc) - `http://localhost:8080/api/products/?sort=asc` - Método: `GET`.
- [Orden Descendente por Precio](http://localhost:8080/api/products/?sort=desc) - `http://localhost:8080/api/products/?sort=desc` - Método: `GET`.
- [Buscar "impresora" (Ejemplo de query)](http://localhost:8080/api/products/?query=impresora) - `http://localhost:8080/api/products/?query=impresora` - Método: `GET`.
- [5 Productos, Primera Página, Orden Ascendente](http://localhost:8080/api/products/?limit=5&page=1&sort=asc) - `http://localhost:8080/api/products/?limit=5&page=1&sort=asc` - Método: `GET`.
- [5 Productos, Segunda Página, Orden Descendente](http://localhost:8080/api/products/?limit=5&page=2&sort=desc) - `http://localhost:8080/api/products/?limit=5&page=2&sort=desc` - Método: `GET`.
- [Buscar "teclado", Orden Ascendente](http://localhost:8080/api/products/?query=teclado&sort=asc) - `http://localhost:8080/api/products/?query=teclado&sort=asc` - Método: `GET`.
- [Buscar "teclado", Orden Descendente](http://localhost:8080/api/products/?query=teclado&sort=desc) - `http://localhost:8080/api/products/?query=teclado&sort=desc` - Método: `GET`.
- [Buscar por Categoría: Electrónicos](http://localhost:8080/api/products/?query=categoria:Electrónicos) - `http://localhost:8080/api/products/?query=categoria:Electrónicos` - Método: `GET`.
- [Buscar Productos Disponibles](http://localhost:8080/api/products/?query=disponible:true) - `http://localhost:8080/api/products/?query=disponible:true` - Método: `GET`.

### URLs de Prueba para API de Carritos

- [Crear un nuevo carrito](http://localhost:8080/api/carts) - `http://localhost:8080/api/carts` - Método: `POST`.
- [Ver todos los carritos](http://localhost:8080/api/carts) - `http://localhost:8080/api/carts` - Método: `GET`.
- [Listar productos en un carrito por ID de carrito](http://localhost:8080/api/carts/:cid) - `http://localhost:8080/api/carts/:cid` - Método: `GET`.
- [Agregar un producto a un carrito](http://localhost:8080/api/carts/:cid/product/:pid) - `http://localhost:8080/api/carts/:cid/product/:pid` - Método: `POST`.
- [Actualizar el carrito con un arreglo de productos](http://localhost:8080/api/carts/:cid) - `http://localhost:8080/api/carts/:cid` - Método: `PUT`.
- [Actualizar la cantidad de un producto específico en el carrito](http://localhost:8080/api/carts/:cid/product/:pid) - `http://localhost:8080/api/carts/:cid/products/:pid` - Método: `PUT`.
- [Eliminar un producto de un carrito](http://localhost:8080/api/carts/:cid/product/:pid) - `http://localhost:8080/api/carts/:cid/product/:pid` - Método: `DELETE`.
- [Eliminar un carrito por ID](http://localhost:8080/api/carts/:cid) - `http://localhost:8080/api/carts/:cid` - Método: `DELETE`.
- [Finalizar la compra de un carrito](http://localhost:8080/api/carts/:cid/purchase) - `http://localhost:8080/api/carts/:cid/purchase` - Método: `POST`.

### URLs de Prueba para Web de Productos

- [Muestra todos los productos con paginación](http://localhost:8080/products) - `http://localhost:8080/products`
- [Primera Página (default limit 10)](http://localhost:8080/products?page=1) - `http://localhost:8080/products?page=1`
- [Segunda Página (default limit 10)](http://localhost:8080/products?page=2) - `http://localhost:8080/products?page=2`
- [Limitar a 5 Productos](http://localhost:8080/products?limit=5) - `http://localhost:8080/products?limit=5`
- [Limitar a 20 Productos](http://localhost:8080/products?limit=20) - `http://localhost:8080/products?limit=20`
- [Orden Ascendente por Precio](http://localhost:8080/products?sort=asc) - `http://localhost:8080/products?sort=asc`
- [Orden Descendente por Precio](http://localhost:8080/products?sort=desc) - `http://localhost:8080/products?sort=desc`
- [Buscar "impresora" (Ejemplo de query)](http://localhost:8080/products?query=impresora) - `http://localhost:8080/products?query=impresora`
- [5 Productos, Primera Página, Orden Ascendente](http://localhost:8080/products?limit=5&page=1&sort=asc) - `http://localhost:8080/products?limit=5&page=1&sort=asc`
- [5 Productos, Segunda Página, Orden Descendente](http://localhost:8080/products?limit=5&page=2&sort=desc) - `http://localhost:8080/products?limit=5&page=2&sort=desc`
- [Buscar "teclado", Orden Ascendente](http://localhost:8080/products?query=teclado&sort=asc) - `http://localhost:8080/products?query=teclado&sort=asc`
- [Buscar "teclado", Orden Descendente](http://localhost:8080/products?query=teclado&sort=desc) - `http://localhost:8080/products?query=teclado&sort=desc`
- [Buscar por Categoría: Electrónicos](http://localhost:8080/products?query=categoria:Electrónicos&limit=0) - `http://localhost:8080/products?query=categoria:Electrónicos&limit=0`
- [Buscar Productos Disponibles](http://localhost:8080/products?query=disponible:true&limit=25) - `http://localhost:8080/products?query=disponible:true&limit=25`

### URLs de Prueba para Web de Carritos

- [Vista para visualizar todos los carritos](http://localhost:8080/carts) - `http://localhost:8080/carts`
- [Vista para visualizar un carrito específico](http://localhost:8080/carts/:cid) - `http://localhost:8080/carts/:cid`

### URLs de Prueba para Web de Usuario

- [Mostrar Página de Inicio de Sesión](http://localhost:8080/login) - `http://localhost:8080/login`
- [Mostrar Página de Registro](http://localhost:8080/register) - `http://localhost:8080/register`
- [Vista perfil de usuario](http://localhost:8080/profile) - `http://localhost:8080/profile`

### URLs de Prueba para API de Usuario

- [Instrucciones de Registro](http://localhost:8080/api/sessions/register) - `http://localhost:8080/api/sessions/register` - Método: `GET`.
- [Registro de Usuario](http://localhost:8080/api/sessions/register) - `http://localhost:8080/api/sessions/register` - Método: `POST`.
- [Instrucciones de Inicio de Sesión](http://localhost:8080/api/sessions/login) - `http://localhost:8080/api/sessions/login` - Método: `GET`.
- [Inicio de Sesión de Usuario](http://localhost:8080/api/sessions/login) - `http://localhost:8080/api/sessions/login` - Método: `POST`.
- [Cerrar Sesión de Usuario](http://localhost:8080/api/sessions/logout) - `http://localhost:8080/api/sessions/logout` - Método: `GET`.
- [Autenticación con GitHub](http://localhost:8080/api/sessions/auth/github) - `http://localhost:8080/api/sessions/auth/github` - Método: `GET`.
- [Callback de Autenticación con GitHub](http://localhost:8080/api/sessions/auth/github/callback) - `http://localhost:8080/api/sessions/auth/github/callback` - Método: `GET`.
- [Autenticación con Google](http://localhost:8080/api/sessions/auth/google) - `http://localhost:8080/api/sessions/auth/google` - Método: `GET`.
- [Callback de Autenticación con Google](http://localhost:8080/api/sessions/auth/google/callback) - `http://localhost:8080/api/sessions/auth/google/callback` - Método: `GET`.
- [Obtener Sesión Actual](http://localhost:8080/api/sessions/current) - `http://localhost:8080/api/sessions/current` - Método: `GET`.

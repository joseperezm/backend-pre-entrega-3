# Reestructura de nuestro servidor
## Consigna
- Con base en las clases previamente vistas, realizar los cambios necesarios en tu proyecto para que se base en un modelo de capas.
### Aspectos a incluir
- El proyecto debe contar con capas de routing, controlador, dao, con nuestras vistas bien separadas y con las responsabilidades correctamente delegadas.
- Mover del proyecto todas las partes importantes y comprometedoras en un archivo .env para poder leerlo bajo variables de entorno en un archivo config.js
## Proceso de testing
- npm start ejecuta el entorno de producción.
- npm run dev ejecuta el entorno de desarrollo.
- Se revisará que la estructura del proyecto cuente con diferentes capas separadas como: routes, controllers, dao, config, etc.
- Se revisará que el archivo .env proporcionado por el alumno, cuente por lo menos con una variable de entorno de MONGO_URL para la conexión a la base de datos, así también como las variables ADMIN_EMAIL y ADMIN_PASSWORD para poder hacer el login de manera efectiva como admin.
- Se registrará un nuevo usuario, corroborar que se guarde en la base de datos que se encuentre en MONGO_URL
- Se logueará como superadmin, revisando que el superadmin sí coincida con las variables de entorno ADMIN_EMAIL y ADMIN_PASSWORD
- Es obligatorio pasar adjunto el archivo .env fuera del repositorio
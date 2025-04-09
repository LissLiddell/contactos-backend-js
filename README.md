# 📇 Contact API

API para gestionar contactos personales. Incluye autenticación JWT, protección de rutas, y permite a los usuarios registrar, iniciar sesión y administrar sus propios contactos.

Tecnologías 
- Node.js
- Express.js
- MariaDB
- TypeORM
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- CORS

---

## 🔧 Instalación

1. Clona el repositorio:
git clone https://github.com/tuusuario/contactos-backend-js.git
cd contactos-backend-js

2. Instala las dependencias:
npm install

3. Modificar .env con la info para conectar a BD MariaDB
 CREATE DATABASE contactos_db;

4. Ejecuta el servidor:
node index.js

5. Endpoints Autenticación
 POST	/api/auth/register	Crear nuevo usuario
- POST	/api/auth/login	Iniciar sesión (token)

6. Contactos (protegidos con JWT)
- POST	/api/contacts	Crear nuevo contacto
- GET	/api/contacts	Obtener todos los contactos
- PUT	/api/contacts/:id	Actualizar un contacto
- DELETE	/api/contacts/:id	Eliminar un contacto

7. Todos los endpoints de contactos requieren el header:
- Authorization: Bearer TU_TOKEN que lanza login

Headers en las rutas protegidas:
- Content-Type: application/json
- Authorization: Bearer TU_TOKEN

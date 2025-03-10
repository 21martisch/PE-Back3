# AdoptMe

AdoptMe es una API para gestionar la adopción de mascotas. Permite a los usuarios adoptar mascotas, visualizar adopciones existentes y administrar información de usuarios y mascotas.

## 📌 Características
- CRUD de usuarios, mascotas y adopciones.
- Validaciones para asegurar que las mascotas no sean adoptadas más de una vez.
- Uso de MongoDB para persistencia de datos.
- Documentación con Swagger.
- Test funcionales con Mocha y Supertest.
- Dockerización para una fácil implementación.

---

## 🚀 Instalación y Ejecución

### 🔧 Requisitos previos
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) (Opcional para despliegue con contenedor)

### 📥 Clonar el repositorio
```sh
 git clone https://github.com/21martisch/PF-Back3.git
```

### 📦 Instalar dependencias
```sh
 npm install
```

### 🛠️ Configuración
1. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
MONGODB_URI=mongodb://localhost:27017/adoptme
MONGODB_URI_TEST=mongodb://localhost:27017/adoptme_test
PORT=8080
```

2. Iniciar la base de datos local de MongoDB si no está en ejecución.

### ▶️ Ejecutar el servidor
```sh
 npm start
```
El servidor estará disponible en `http://localhost:8080`

---

## 📘 Documentación Swagger
La documentación de la API está disponible en:
```
http://localhost:8080/api-docs
```

Para generar la documentación, se ha utilizado `swagger-jsdoc`.

---

## 🧪 Pruebas
Ejecutar pruebas con Mocha y Supertest:
```sh
 npm test
```

---

## 🐳 Despliegue con Docker
### 📦 Construir la imagen
```sh
 docker build -t martinaschaller/adoptme .
```

### 🚢 Subir la imagen a DockerHub
```sh
 docker push martinaschaller/adoptme:latest
```

### ▶️ Ejecutar el contenedor
```sh
 docker run -p 8080:8080 --name adoptme martinaschaller/adoptme
```

---

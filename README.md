# DVWA - SQL Injection Lab

## Descripción

Laboratorio educativo de seguridad web enfocado en SQL Injection. Implementa versiones vulnerable y segura para aprender sobre esta vulnerabilidad crítica.

## SQL Injection

### ¿Qué es SQL Injection?

SQL Injection es una vulnerabilidad que permite a un atacante ejecutar comandos SQL arbitrarios en la base de datos manipulando la entrada del usuario.

### Versiones

- SQL Injection (vulnerable): Concatena directamente la entrada del usuario en la query SQL sin validación.
- SQL Injection (safe): Usa parámetros preparados y validación de entrada para prevenir la inyección.

## Requisitos

- Node.js >= 12.0
- npm >= 6.0

## Instalación

1. Clona el repositorio:
   git clone https://github.com/adalid07/dvwa.git
   cd dvwa

2. Instala dependencias:
   npm install

## Uso

1. Lanza el servidor:
   node app.js

2. Accede en el navegador:
   http://localhost:3000

3. Selecciona SQL Injection de la lista y pruébalo.

## Estructura del Proyecto
```text
LabClass1/
├── app.js                      # Archivo principal del servidor
├── routes/
│   └── command.js              # Rutas para SQL Injection
├── controllers/
│   └── commandController.js    # Lógica para SQL Injection
├── public/
│   └── style.css               # Estilos CSS
├── package.json                # Dependencias del proyecto
└── README.md                   # Este archivo
```
## Dependencias

- express: Framework web
- sqlite3: Base de datos en memoria

## Lecciones de Seguridad

### SQL Injection - Vulnerable
- Ruta: /sql
- Método: Concatenación directa de entrada en queries SQL.
- Query: SELECT id, username, role FROM users WHERE username = '${username}'
- Riesgo: Un atacante puede manipular la query para acceder a datos no autorizados.

### SQL Injection - Segura
- Ruta: /sql-safe
- Método: Parámetros preparados (?) + validación de entrada.
- Query: SELECT id, username, role FROM users WHERE username = ?
- Protección: Los parámetros preparados separan la estructura SQL de los datos.

## Pruebas Recomendadas

### Prueba 1: Búsqueda Normal
Username: admin
Resultado: Muestra el usuario admin

### Prueba 2: SQL Injection Vulnerable
Username: ' OR '1'='1
Resultado: Muestra TODOS los usuarios (inyección exitosa)
Query ejecutada: SELECT id, username, role FROM users WHERE username = '' OR '1'='1'

### Prueba 3: SQL Injection Segura
Username: ' OR '1'='1
Resultado: "Invalid username" (rechaza caracteres especiales)

### Prueba 4: Entrada Válida en Versión Segura
Username: alice
Resultado: Muestra el usuario alice (funciona normalmente)

## Tabla de Pruebas Detalladas

| Prueba | Ruta | Input | Resultado Esperado | Vulnerabilidad |
|--------|------|-------|-------------------|-----------------|
| Normal - Vulnerable | /sql | admin | Muestra usuario admin | No (entrada válida) |
| Normal - Segura | /sql-safe | admin | Muestra usuario admin | No (entrada válida) |
| Inyección - Vulnerable | /sql | ' OR '1'='1 | Muestra TODOS los usuarios | Sí (SQL Injection exitosa) |
| Inyección - Segura | /sql-safe | ' OR '1'='1 | "Invalid username" | No (validación activa) |
| Inyección alternativa - Vulnerable | /sql | '; DROP TABLE users; -- | Error o tabla eliminada | Sí (SQL Injection) |
| Usuario no existe - Vulnerable | /sql | nonexistent | "No user found" | No (entrada válida) |
| Usuario no existe - Segura | /sql-safe | nonexistent | "No user found" | No (entrada válida) |
| Caracteres especiales - Segura | /sql-safe | admin'-- | "Invalid username" | No (validación rechaza) |

## Pasos para Realizar las Pruebas

1. Inicia el servidor:
   node app.js

2. Abre el navegador en http://localhost:3000

3. Accede a SQL Injection:
   - Haz clic en "SQL Injection" (vulnerable)
   - Haz clic en "SQL Injection (safe)" (segura)

4. Ejecuta las pruebas según la tabla anterior

5. Observa las diferencias entre versión vulnerable y segura

## Resultados Esperados

### Versión Vulnerable (/sql)
- Acepta cualquier entrada
- Muestra la query SQL ejecutada
- Permite inyección SQL exitosa
- Riesgo: Acceso no autorizado a datos

### Versión Segura (/sql-safe)
- Valida entrada (solo alfanuméricos y _)
- No muestra la query SQL
- Rechaza caracteres especiales
- Protección: Previene SQL Injection

## Base de Datos

La base de datos es SQLite en memoria (:memory:), contiene 3 usuarios:
- admin - Administrator
- alice - User
- bob - User

Se inicializa automáticamente al arrancar el servidor.

## Avisos

⚠️ Este es un laboratorio educativo. Solo úsalo en entornos controlados y con autorización. No lo despliegues en producción.

## Autors

Adalid Claure
Rafael Torres
Victor Llivina
Antonio Sanchez

## Licencia

Este proyecto es para fines educativos únicamente.

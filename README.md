# DVWA - SQL Injection Lab

## Descripción

Laboratorio educativo de seguridad web enfocado en **SQL Injection**. Implementa versiones vulnerable y segura para aprender sobre esta vulnerabilidad crítica.

## SQL Injection

### ¿Qué es SQL Injection?

SQL Injection es una vulnerabilidad que permite a un atacante ejecutar comandos SQL arbitrarios en la base de datos manipulando la entrada del usuario.

### Versiones

- **SQL Injection (vulnerable)**: Concatena directamente la entrada del usuario en la query SQL sin validación.
- **SQL Injection (safe)**: Usa parámetros preparados y validación de entrada para prevenir la inyección.

## Requisitos

- Node.js >= 12.0
- npm >= 6.0

## Instalación

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/adalid07/dvwa.git
   cd dvwa



   LabClass1/
├── [app.js](http://_vscodecontentref_/1)                      # Archivo principal del servidor
├── routes/
│   └── command.js              # Rutas para SQL Injection
├── controllers/
│   └── commandController.js    # Lógica para SQL Injection
├── public/
│   └── style.css               # Estilos CSS
├── [package.json](http://_vscodecontentref_/2)                # Dependencias del proyecto
└── [README.md](http://_vscodecontentref_/3)                   # Este archivo
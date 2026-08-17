# Stack Tecnológico

## Tecnologías

| Tecnología | Versión | Notas |
| --- | --- | --- |
| JavaScript (ES6+) | — | Sintaxis moderna: `async/await`, `const`/`let`, `require` (CommonJS). |
| Node.js | v18+ | `fs/promises`, `process.argv`, `path`. |
| Módulo `fs/promises` | — | Lectura/escritura asíncrona del archivo JSON. |
| `process.argv` | — | Captura de argumentos posicionales de línea de comandos. |

> **Restricción dura:** sin dependencias externas. `package.json` debe mantener `dependencies` y `devDependencies` vacías.

## Estructura del proyecto

```
task-tracker-cli/
├── app.js                  # Orquestador principal (único punto de entrada)
├── package.json            # Metadatos y scripts; cero dependencias
├── conts/
│   └── constants.js        # Rutas, estados permitidos y mensajes del sistema
├── lib/
│   ├── cliParser.js        # Parseo y validación de argumentos posicionales
│   ├── fileManager.js      # Lectura/escritura segura del archivo JSON
│   └── taskService.js      # Lógica de negocio de tareas
└── data/
    └── tasks.json          # Base de datos local (se crea automáticamente)
```

## Módulos clave

### `app.js`
- Componente **padre** exclusivo de la aplicación.
- Único archivo autorizado para invocar módulos y capturar excepciones (`try/catch`).
- Lee `process.argv`, delega el parseo a `cliParser` y despacha la operación al `taskService`.
- Traduce cada error capturado a un mensaje claro y legible.

### `conts/constants.js`
- Ruta predeterminada del archivo de datos (`data/tasks.json`).
- Estados permitidos: `todo`, `in-progress`, `done`.
- Mensajes de éxito, error y ayuda del sistema.

### `lib/fileManager.js`
- `ensureFileExists()`: crea el directorio y el archivo `tasks.json` con `[]` si no existen.
- `readTasks()`: lee y deserializa el JSON validando que sea un arreglo.
- `writeTasks(tasks)`: serializa y escribe el arreglo con formato legible (2 espacios).
- Encapsula **todo** el acceso al sistema de archivos.

### `lib/taskService.js`
- Lógica de negocio: `addTask`, `updateTask`, `deleteTask`, `markTaskStatus`, `listTasks`.
- Reglas de dominio: generación de IDs, timestamps ISO, validación de estados.
- Nunca accede directamente a `fs`; siempre delega en `fileManager`.

### `lib/cliParser.js`
- `parseArgs(argv)`: convierte argumentos posicionales en un objeto de operación.
- `validateId(rawId)`: valida IDs numéricos enteros positivos.
- `validateDescription(rawDescription)`: valida descripciones no vacías.
- `validateStatusFilter(rawStatus)`: valida filtros contra el enum permitido.

## Comandos

```bash
node app.js add "Descripción de la tarea"
node app.js update <id> "Nueva descripción"
node app.js delete <id>
node app.js mark-in-progress <id>
node app.js mark-done <id>
node app.js list
node app.js list todo
node app.js list in-progress
node app.js list done
node app.js help
```

## Modelo de Datos

Cada tarea es un objeto con la siguiente forma:

```json
{
  "id": 1,
  "description": "Comprar el pan",
  "status": "todo",
  "createdAt": "2026-08-17T15:51:00.000Z",
  "updatedAt": "2026-08-17T15:51:00.000Z"
}
```

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | `number` | Identificador único numérico auto-incremental. |
| `description` | `string` | Descripción de la tarea. |
| `status` | `string` | Enum: `todo` \| `in-progress` \| `done`. |
| `createdAt` | `string` | Timestamp ISO 8601 de creación. |
| `updatedAt` | `string` | Timestamp ISO 8601 de última actualización. |

## Límites duros (no negociables)

1. **NUNCA** instalar paquetes de `npm` (0 `dependencies` / 0 `devDependencies`).
2. **NUNCA** manejar lógica de dominio dentro de `app.js` (solo orquestación y captura de errores).
3. **NUNCA** capturar errores fuera de `app.js`.
4. **NUNCA** acceder a `fs` desde módulos que no sean `lib/fileManager.js`.

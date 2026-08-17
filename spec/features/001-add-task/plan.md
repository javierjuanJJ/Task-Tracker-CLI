# Plan — Añadir tarea

## Flujo de datos

```
terminal
   │  node app.js add "Comprar el pan"
   ▼
app.js (orquestador)
   │  process.argv.slice(2) → ["add", "Comprar el pan"]
   ▼
lib/cliParser.js
   │  parseArgs → { command: "add", description: "Comprar el pan" }
   │  validateDescription (no vacía)
   ▼
lib/taskService.js
   │  addTask(description)
   │  1. readTasks()                     ← lib/fileManager
   │  2. id = max(id)+1 (o 1 si vacío)
   │  3. crear objeto {id, description, status, createdAt, updatedAt}
   │  4. push al arreglo
   │  5. writeTasks(tasks)               → lib/fileManager
   ▼
app.js
   │  imprime "Tarea añadida exitosamente (ID: 1)"
```

## Pasos

1. `app.js` delega el parseo en `cliParser.parseArgs` y captura errores con `try/catch`.
2. `cliParser` extrae la descripción y la valida con `validateDescription`.
3. `taskService.addTask` pide las tareas al `fileManager`.
4. Se calcula el siguiente ID (`generateNextId`).
5. Se construye el objeto tarea con `status: 'todo'` y ambos timestamps.
6. Se añade al arreglo y se persiste con `writeTasks`.
7. `app.js` devuelve el mensaje de éxito con el ID.

## Riesgos y mitigación

| Riesgo | Mitigación |
| --- | --- |
| Archivo `tasks.json` inexistente | `fileManager.ensureFileExists()` lo crea con `[]`. |
| JSON corrupto | `readTasks` lanza un mensaje descriptivo capturado por `app.js`. |
| Descripción vacía | `validateDescription` rechaza la operación antes de tocar el disco. |

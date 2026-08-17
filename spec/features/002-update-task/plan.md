# Plan — Actualizar tarea

## Flujo de datos

```
terminal
   │  node app.js update 1 "Nueva descripción"
   ▼
app.js
   │  process.argv.slice(2) → ["update", "1", "Nueva descripción"]
   ▼
lib/cliParser.js
   │  parseArgs → { command: "update", id: 1, description: "Nueva descripción" }
   │  validateId / validateDescription
   ▼
lib/taskService.js
   │  updateTask(id, description)
   │  1. readTasks()
   │  2. findTask(tasks, id) → lanza error si no existe
   │  3. task.description = description
   │  4. task.updatedAt = new Date().toISOString()
   │  5. writeTasks(tasks)
   ▼
app.js
   │  imprime "Tarea actualizada exitosamente (ID: 1)"
```

## Pasos

1. `cliParser` valida el ID (`validateId`) y la nueva descripción (`validateDescription`).
2. `taskService.updateTask` lee el estado actual del archivo.
3. Se busca la tarea por ID; si no existe, se lanza `TASK_NOT_FOUND`.
4. Se muta `description` y `updatedAt` en memoria.
5. Se persiste el arreglo completo con `writeTasks`.
6. `app.js` muestra el mensaje de éxito.

## Riesgos y mitigación

| Riesgo | Mitigación |
| --- | --- |
| ID inexistente | `findTask` lanza `TASK_NOT_FOUND(id)` antes de mutar. |
| Descripción vacía | `validateDescription` rechaza la operación. |
| ID no numérico | `validateId` rechaza la operación. |

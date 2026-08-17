# Plan — Eliminar tarea

## Flujo de datos

```
terminal
   │  node app.js delete 1
   ▼
app.js
   │  process.argv.slice(2) → ["delete", "1"]
   ▼
lib/cliParser.js
   │  parseArgs → { command: "delete", id: 1 }
   │  validateId
   ▼
lib/taskService.js
   │  deleteTask(id)
   │  1. readTasks()
   │  2. findTask(tasks, id) → lanza error si no existe
   │  3. filtered = tasks.filter(t => t.id !== id)
   │  4. writeTasks(filtered)
   ▼
app.js
   │  imprime "Tarea eliminada exitosamente (ID: 1)"
```

## Pasos

1. `cliParser` valida el ID con `validateId`.
2. `taskService.deleteTask` lee el arreglo actual.
3. Confirma la existencia de la tarea con `findTask`.
4. Filtra el arreglo excluyendo el `id`.
5. Persiste el arreglo resultante con `writeTasks`.
6. `app.js` muestra el mensaje de éxito.

## Riesgos y mitigación

| Riesgo | Mitigación |
| --- | --- |
| ID inexistente | `findTask` lanza `TASK_NOT_FOUND(id)` antes de filtrar. |
| Archivo vacío o inexistente | `readTasks` devuelve `[]` y `findTask` lanza el error correspondiente. |

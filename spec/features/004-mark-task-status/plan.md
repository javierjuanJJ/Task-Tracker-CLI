# Plan — Cambiar estado de tarea

## Flujo de datos

```
terminal
   │  node app.js mark-done 1
   ▼
app.js
   │  process.argv.slice(2) → ["mark-done", "1"]
   ▼
lib/cliParser.js
   │  parseArgs → { command: "mark-done", id: 1, status: "done" }
   │  validateId
   ▼
lib/taskService.js
   │  markTaskStatus(id, status)
   │  1. assertValidStatus(status)   → valida contra el enum
   │  2. readTasks()
   │  3. findTask(tasks, id)         → lanza error si no existe
   │  4. task.status = status
   │  5. task.updatedAt = new Date().toISOString()
   │  6. writeTasks(tasks)
   ▼
app.js
   │  imprime 'Tarea 1 marcada como "done"'
```

## Pasos

1. `cliParser` mapea el comando a su estado objetivo y valida el ID con `validateId`.
2. `taskService.markTaskStatus` valida el estado contra el enum permitido (`assertValidStatus`).
3. Lee las tareas y localiza el registro por ID con `findTask`.
4. Modifica `status` y `updatedAt` encadenando la transición.
5. Persiste el arreglo completo con `writeTasks`.
6. `app.js` muestra el estado resultante.

## Riesgos y mitigación

| Riesgo | Mitigación |
| --- | --- |
| Estado inválido | `assertValidStatus` lanza `INVALID_STATUS` antes de tocar el disco. |
| ID inexistente | `findTask` lanza `TASK_NOT_FOUND(id)`. |
| Transición idempotente | Permitida: solo refresca `updatedAt`. |

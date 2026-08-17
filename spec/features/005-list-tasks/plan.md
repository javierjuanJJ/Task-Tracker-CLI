# Plan — Listar tareas

## Flujo de datos

```
terminal
   │  node app.js list done
   ▼
app.js
   │  process.argv.slice(2) → ["list", "done"]
   ▼
lib/cliParser.js
   │  parseArgs → { command: "list", statusFilter: "done" }
   │  validateStatusFilter (contra VALID_STATUSES)
   ▼
lib/taskService.js
   │  listTasks(statusFilter)
   │  1. readTasks()
   │  2. si statusFilter → tasks.filter(t.status === statusFilter)
   │  3. devolver arreglo (posiblemente vacío)
   ▼
app.js
   │  si vacío → "No hay tareas para mostrar."
   │  si no    → formatear fila por fila
```

## Pasos

1. `cliParser` valida el filtro opcional con `validateStatusFilter`.
2. `taskService.listTasks` lee el arreglo completo del `fileManager`.
3. Aplica el filtro por estado si corresponde.
4. `app.js` decide si muestra el mensaje de lista vacía o formatea cada tarea.
5. El formato de salida se genera con separadores y sangría legibles.

## Riesgos y mitigación

| Riesgo | Mitigación |
| --- | --- |
| Filtro inválido | `validateStatusFilter` lanza `INVALID_STATUS_FILTER` antes de leer datos. |
| Lista vacía | `app.js` muestra `EMPTY_LIST` en lugar de una tabla vacía. |
| JSON corrupto | `readTasks` lanza un mensaje descriptivo capturado por `app.js`. |

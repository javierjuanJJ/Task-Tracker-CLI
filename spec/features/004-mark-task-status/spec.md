# Feature 004 — Cambiar estado de tarea

## Requisitos funcionales

El usuario debe poder cambiar el estado de una tarea mediante dos comandos:

```bash
node app.js mark-in-progress <id>
node app.js mark-done <id>
```

## Criterios de aceptación

- [ ] **GIVEN** una tarea existente con estado `todo`, **WHEN** se ejecuta `node app.js mark-in-progress 1`, **THEN** el estado pasa a `in-progress`.
- [ ] **GIVEN** una tarea existente, **WHEN** se ejecuta `node app.js mark-done 1`, **THEN** el estado pasa a `done`.
- [ ] `updatedAt` se actualiza tras cada transición.
- [ ] **GIVEN** un `id` inexistente, **THEN** se muestra el error "No existe ninguna tarea con ID: X".
- [ ] **GIVEN** un estado que no pertenece al enum, **THEN** se rechaza la operación con un error claro.

## Transiciones válidas

```
todo ────────────► in-progress ────────────► done
```

> **Regla de negocio:** solo se aceptan estados del enum `todo | in-progress | done`. La transición es idempotente: marcar `done` sobre una tarea ya `done` es válido y únicamente actualiza `updatedAt`.

## Detalles de implementación

- El comando mapea a un estado objetivo: `mark-in-progress → in-progress`, `mark-done → done`.
- `markTaskStatus(id, status)` valida el estado contra `VALID_STATUSES` antes de mutar.
- Actualiza `task.status` y `task.updatedAt`, luego persiste con `writeTasks`.
- El flujo debe respetar la cadena `app.js` → `cliParser` → `taskService` → `fileManager`.

## Dependencias

- `conts/constants.STATUS` / `VALID_STATUSES`
- `lib/taskService.findTask`
- `lib/fileManager.readTasks` / `writeTasks`

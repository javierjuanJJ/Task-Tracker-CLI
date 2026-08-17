# Feature 002 — Actualizar tarea

## Requisito funcional

El usuario debe poder actualizar la descripción de una tarea existente:

```bash
node app.js update <id> "Nueva descripción"
```

## Criterios de aceptación

- [ ] **GIVEN** una tarea existente, **WHEN** se ejecuta `node app.js update 1 "Nueva desc"`, **THEN** la `description` cambia y `updatedAt` se actualiza al timestamp actual.
- [ ] `createdAt` no se modifica.
- [ ] **GIVEN** un `id` inexistente, **THEN** se muestra el error "No existe ninguna tarea con ID: X".
- [ ] **GIVEN** una descripción vacía, **THEN** se muestra un error claro.
- [ ] El cambio se persiste en `data/tasks.json`.

## Detalles de implementación

- Validación previa: el `id` debe existir en el arreglo (`findTask`).
- Modificación in-memory del objeto encontrado y posterior `writeTasks`.
- `updatedAt` se regenera con `new Date().toISOString()`.
- El flujo debe respetar la cadena `app.js` → `cliParser` → `taskService` → `fileManager`.

## Dependencias

- `lib/taskService.findTask`
- `lib/fileManager.readTasks` / `writeTasks`
- `conts/constants.MESSAGES.TASK_UPDATED` / `TASK_NOT_FOUND`

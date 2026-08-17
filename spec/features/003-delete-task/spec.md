# Feature 003 — Eliminar tarea

## Requisito funcional

El usuario debe poder eliminar una tarea de forma persistente:

```bash
node app.js delete <id>
```

## Criterios de aceptación

- [ ] **GIVEN** una tarea existente, **WHEN** se ejecuta `node app.js delete 1`, **THEN** la tarea desaparece del archivo JSON.
- [ ] **GIVEN** un `id` inexistente, **THEN** se muestra el error "No existe ninguna tarea con ID: X".
- [ ] El resto de tareas conservan sus `id` sin reasignar.
- [ ] Se muestra un mensaje de éxito tras eliminar.
- [ ] El cambio se persiste en `data/tasks.json`.

## Detalles de implementación

- Verificar existencia antes de filtrar para dar un mensaje claro (`findTask`).
- Filtrar el arreglo: `tasks.filter(t => t.id !== id)`.
- Reescritura completa del archivo JSON con `writeTasks`.
- El flujo debe respetar la cadena `app.js` → `cliParser` → `taskService` → `fileManager`.

## Dependencias

- `lib/taskService.findTask`
- `lib/fileManager.readTasks` / `writeTasks`
- `conts/constants.MESSAGES.TASK_DELETED` / `TASK_NOT_FOUND`

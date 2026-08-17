# Checklist — Actualizar tarea

## Tareas de implementación

- [ ] Crear mensajes `TASK_UPDATED(id)` y `TASK_NOT_FOUND(id)` en `conts/constants.js`.
- [ ] Implementar `validateId(rawId)` en `lib/cliParser.js`.
- [ ] Implementar el caso `update` en `parseArgs` de `lib/cliParser.js`.
- [ ] Implementar `findTask(tasks, id)` en `lib/taskService.js`.
- [ ] Implementar `updateTask(id, description)` en `lib/taskService.js`.
- [ ] Conectar el caso `update` en el `switch` de `app.js`.
- [ ] Probar: `node app.js add "a" && node app.js update 1 "b"`.
- [ ] Verificar que `updatedAt` cambia y `createdAt` no.
- [ ] Probar error: `node app.js update 999 "x"`.

## Criterios de terminado (Definition of Done)

- [ ] La descripción se refleja en `data/tasks.json`.
- [ ] `updatedAt` es posterior a `createdAt`.
- [ ] El error `TASK_NOT_FOUND` se muestra desde `app.js` sin crashear el proceso.

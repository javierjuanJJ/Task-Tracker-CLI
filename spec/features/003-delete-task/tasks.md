# Checklist — Eliminar tarea

## Tareas de implementación

- [ ] Crear mensaje `TASK_DELETED(id)` en `conts/constants.js` (reutilizar `TASK_NOT_FOUND`).
- [ ] Implementar el caso `delete` en `parseArgs` de `lib/cliParser.js`.
- [ ] Implementar `deleteTask(id)` en `lib/taskService.js`.
- [ ] Conectar el caso `delete` en el `switch` de `app.js`.
- [ ] Probar: `node app.js add "a" && node app.js delete 1`.
- [ ] Verificar que el JSON ya no contiene la tarea.
- [ ] Probar error: `node app.js delete 999`.
- [ ] Verificar que los IDs restantes no se reasignan.

## Criterios de terminado (Definition of Done)

- [ ] La tarea eliminada ya no existe en `data/tasks.json`.
- [ ] El resto de registros conservan su `id` original.
- [ ] El error `TASK_NOT_FOUND` se muestra desde `app.js` sin crashear el proceso.

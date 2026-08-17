# Checklist — Cambiar estado de tarea

## Tareas de implementación

- [ ] Crear objeto `STATUS` y arreglo `VALID_STATUSES` en `conts/constants.js`.
- [ ] Crear mensajes `TASK_MARKED(id, status)` e `INVALID_STATUS` en `conts/constants.js`.
- [ ] Implementar los casos `mark-in-progress` y `mark-done` en `parseArgs` de `lib/cliParser.js`.
- [ ] Implementar `assertValidStatus(status)` en `lib/taskService.js`.
- [ ] Implementar `markTaskStatus(id, status)` en `lib/taskService.js`.
- [ ] Conectar ambos casos en el `switch` de `app.js`.
- [ ] Probar: `node app.js mark-in-progress 1 && node app.js mark-done 1`.
- [ ] Probar error: `node app.js mark-in-progress 999`.
- [ ] Verificar que `updatedAt` se actualiza en cada transición.

## Criterios de terminado (Definition of Done)

- [ ] `data/tasks.json` refleja el nuevo estado.
- [ ] Un estado fuera del enum es rechazado.
- [ ] `updatedAt` es posterior al estado anterior.

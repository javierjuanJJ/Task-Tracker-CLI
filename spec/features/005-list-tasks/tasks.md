# Checklist — Listar tareas

## Tareas de implementación

- [ ] Crear mensajes `EMPTY_LIST` e `INVALID_STATUS_FILTER(status)` en `conts/constants.js`.
- [ ] Implementar `validateStatusFilter(rawStatus)` en `lib/cliParser.js`.
- [ ] Implementar el caso `list` en `parseArgs` de `lib/cliParser.js` (filtro opcional).
- [ ] Implementar `listTasks(statusFilter)` en `lib/taskService.js`.
- [ ] Conectar el caso `list` en el `switch` de `app.js`.
- [ ] Implementar el formateo de salida en `app.js` (o módulo de presentación).
- [ ] Probar: `node app.js list`.
- [ ] Probar: `node app.js list done`, `node app.js list todo`, `node app.js list in-progress`.
- [ ] Probar error: `node app.js list invalido`.
- [ ] Probar lista vacía.

## Criterios de terminado (Definition of Done)

- [ ] `list` sin argumentos muestra todas las tareas por `id`.
- [ ] Los filtros devuelven únicamente tareas con el estado solicitado.
- [ ] Un filtro fuera del enum muestra un error claro.
- [ ] Sin resultados se muestra "No hay tareas para mostrar."

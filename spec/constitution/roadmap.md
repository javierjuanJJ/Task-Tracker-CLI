# Roadmap

Orden secuencial de desarrollo. Cada hito debe completarse con su ciclo completo de Spec-Driven Development (spec → plan → tasks) antes de iniciar el siguiente.

## Fase 0 — Arquitectura base
- [ ] Crear estructura de carpetas (`conts/`, `lib/`, `data/`).
- [ ] Implementar `conts/constants.js`.
- [ ] Implementar `lib/fileManager.js` (creación automática de `tasks.json`).
- [ ] Implementar `lib/cliParser.js` (esqueleto).
- [ ] Implementar `app.js` con captura centralizada de errores.

## Fase 1 — `001-add-task`
- [ ] Comando `node app.js add "Descripción"`.
- [ ] Generación de ID, estado por defecto `todo`, timestamps `createdAt`/`updatedAt`.

## Fase 2 — `002-update-task`
- [ ] Comando `node app.js update <id> "Nueva descripción"`.
- [ ] Actualización de `description` y `updatedAt`; validación de existencia del ID.

## Fase 3 — `003-delete-task`
- [ ] Comando `node app.js delete <id>`.
- [ ] Eliminación persistente; validación de existencia del ID.

## Fase 4 — `004-mark-task-status`
- [ ] Comandos `mark-in-progress` y `mark-done`.
- [ ] Transiciones de estado válidas y actualización de `updatedAt`.

## Fase 5 — `005-list-tasks`
- [ ] Comando `list` con filtros opcionales (`todo`, `in-progress`, `done`).
- [ ] Formateo legible por consola.

## Fase 6 — Validación final
- [ ] Prueba manual de todos los flujos (`add`, `update`, `delete`, `mark-*`, `list`).
- [ ] Revisión de los límites duros del stack (0 dependencias, `try/catch` solo en `app.js`).
- [ ] Generar el paquete de distribución en ZIP con `build-package.js`.

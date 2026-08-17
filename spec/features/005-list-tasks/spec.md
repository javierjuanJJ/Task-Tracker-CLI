# Feature 005 — Listar tareas

## Requisitos funcionales

El usuario debe poder listar todas las tareas o filtrarlas por estado:

```bash
node app.js list
node app.js list todo
node app.js list in-progress
node app.js list done
```

## Criterios de aceptación

- [ ] **GIVEN** tareas existentes, **WHEN** se ejecuta `node app.js list`, **THEN** se muestran todas ordenadas por `id`.
- [ ] **GIVEN** el filtro `done`, **THEN** solo se muestran las tareas con estado `done`.
- [ ] **GIVEN** el filtro `todo`, **THEN** solo se muestran las tareas con estado `todo`.
- [ ] **GIVEN** el filtro `in-progress`, **THEN** solo se muestran las tareas con estado `in-progress`.
- [ ] **GIVEN** un filtro inválido, **THEN** se muestra un error claro.
- [ ] **GIVEN** una lista vacía (o sin resultados), **THEN** se muestra "No hay tareas para mostrar."

## Formato de salida

```
ID: 1 | Estado: todo | Creada: 2026-08-17T15:51:00.000Z | Actualizada: 2026-08-17T15:51:00.000Z
    Comprar el pan
```

## Detalles de implementación

- Filtro opcional aplicado en memoria tras leer el JSON.
- Validación del filtro contra `VALID_STATUSES`.
- Salida legible con separadores `|` y sangría en la descripción.
- El flujo debe respetar la cadena `app.js` → `cliParser` → `taskService` → `fileManager`.

## Dependencias

- `lib/fileManager.readTasks`
- `conts/constants.VALID_STATUSES`
- `conts/constants.MESSAGES.EMPTY_LIST`

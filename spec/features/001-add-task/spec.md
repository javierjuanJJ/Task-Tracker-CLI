# Feature 001 — Añadir tarea

## Requisito funcional

El usuario debe poder añadir una nueva tarea a la lista mediante el comando:

```bash
node app.js add "Descripción de la tarea"
```

## Criterios de aceptación

- [ ] **GIVEN** una CLI ejecutándose, **WHEN** se ejecuta `node app.js add "Comprar el pan"`, **THEN** se crea una tarea con descripción `Comprar el pan` y se muestra un mensaje de éxito con su `id`.
- [ ] El ID generado es único y numérico.
- [ ] El estado por defecto de la nueva tarea es `todo`.
- [ ] `createdAt` y `updatedAt` se registran con el mismo timestamp ISO.
- [ ] La tarea se persiste en `data/tasks.json`.
- [ ] **GIVEN** una descripción vacía o ausente, **THEN** se muestra un error claro y la operación se cancela.

## Detalles de implementación

- Generación de ID: `max(id) + 1` sobre las tareas existentes (o `1` si la lista está vacía).
- Estado por defecto: constante `DEFAULT_STATUS = 'todo'`.
- Timestamps: `new Date().toISOString()`.
- El flujo debe respetar la cadena `app.js` → `cliParser` → `taskService` → `fileManager`.

## Dependencias

- `lib/fileManager.readTasks`
- `lib/fileManager.writeTasks`
- `conts/constants.DEFAULT_STATUS`
- `conts/constants.MESSAGES.TASK_ADDED`

# Checklist — Añadir tarea

## Tareas de implementación

- [ ] Crear constante `DEFAULT_STATUS = 'todo'` en `conts/constants.js`.
- [ ] Crear mensajes `TASK_ADDED(id)` e `INVALID_DESCRIPTION` en `conts/constants.js`.
- [ ] Implementar `validateDescription(rawDescription)` en `lib/cliParser.js`.
- [ ] Implementar el caso `add` en `parseArgs` de `lib/cliParser.js`.
- [ ] Implementar `generateNextId(tasks)` en `lib/taskService.js`.
- [ ] Implementar `addTask(description)` en `lib/taskService.js`.
- [ ] Conectar el caso `add` en el `switch` de `app.js`.
- [ ] Probar: `node app.js add "Comprar el pan"`.
- [ ] Verificar que `data/tasks.json` se crea automáticamente si no existe.
- [ ] Probar caso de error: `node app.js add ""`.

## Criterios de terminado (Definition of Done)

- [ ] La tarea aparece en `data/tasks.json` con `status: "todo"`.
- [ ] `createdAt === updatedAt` en la primera creación.
- [ ] Los IDs consecutivos no se repiten.
- [ ] Los errores se muestran en formato `Error: <mensaje>` desde `app.js`.

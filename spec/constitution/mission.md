# Misión

Construir una **CLI ligera, robusta y 100% nativa en Node.js** para gestionar una lista de tareas pendientes (Task Tracker).

La aplicación se opera mediante **comandos posicionales** desde la terminal y persiste los datos en un **archivo JSON local** de forma confiable, sin depender de ninguna librería o framework externo.

## Principios rectores

1. **Cero dependencias**: solo el runtime de Node.js (v18+) y sus módulos nativos.
2. **Simplicidad**: un único punto de entrada (`app.js`) y módulos con responsabilidad única.
3. **Robustez**: captura centralizada de errores con mensajes claros y explicativos para el usuario.
4. **Persistencia confiable**: el archivo `tasks.json` se crea automáticamente si no existe y se reescribe tras cada operación.
5. **Extensibilidad**: la arquitectura modular permite añadir nuevos comandos sin reescribir la base.

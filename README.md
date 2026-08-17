# Task Tracker CLI

> CLI ligera, robusta y **100% nativa en Node.js** para gestionar una lista de tareas pendientes mediante comandos posicionales. Sin dependencias externas, con persistencia en un archivo JSON local.

---

## Índice

1. [Descripción del proyecto](#-descripción-del-proyecto)
2. [Características](#-características)
3. [Requisitos previos](#-requisitos-previos)
4. [Instalación](#-instalación)
5. [Cómo ejecutar](#-cómo-ejecutar)
6. [Estructura del proyecto](#-estructura-del-proyecto)
7. [Modelo de datos](#-modelo-de-datos)
8. [Comandos y combinaciones](#-comandos-y-combinaciones)
   - [Tabla resumen de comandos](#tabla-resumen-de-comandos)
   - [Combinaciones con acierto (éxito)](#combinaciones-con-acierto-éxito)
   - [Combinaciones con error](#combinaciones-con-error)
9. [Manejo de errores](#-manejo-de-errores)
10. [Especificación (Spec-Driven Development)](#-especificación-spec-driven-development)
11. [Empaquetado en ZIP](#-empaquetado-en-zip)
12. [Licencia](#-licencia)

---

## 📌 Descripción del proyecto

**Task Tracker CLI** es una aplicación de línea de comandos construida con JavaScript puro (ES6+) sobre Node.js v18+. Permite añadir, actualizar, eliminar, cambiar el estado y listar tareas desde la terminal.

- **Cero dependencias**: solo utiliza el runtime de Node.js y sus módulos nativos (`fs`, `path`, `process`).
- **Persistencia local**: los datos se almacenan en `data/tasks.json`, que se crea automáticamente si no existe.
- **Arquitectura modular**: punto de entrada único (`app.js`) que delega en módulos con responsabilidad única.
- **Captura centralizada de errores**: `app.js` es el único módulo que usa `try/catch` y traduce los errores a mensajes claros para el usuario.

---

## ✨ Características

- Comando `add` para crear tareas con estado por defecto `todo`.
- Comando `update` para modificar la descripción de una tarea.
- Comando `delete` para eliminar tareas de forma persistente.
- Comandos `mark-in-progress` y `mark-done` para cambiar el estado.
- Comando `list` con filtros opcionales por estado (`todo`, `in-progress`, `done`).
- IDs numéricos auto-incrementales.
- Timestamps ISO 8601 (`createdAt` y `updatedAt`).
- Mensajes de error claros, explicativos y con código de salida distinto de `0` en caso de fallo.

---

## 🔧 Requisitos previos

| Requisito | Versión |
| --- | --- |
| [Node.js](https://nodejs.org/) | v18 o superior |

Verifica tu versión:

```bash
node --version
```

---

## 📦 Instalación

No requiere instalar dependencias. Solo clona el proyecto (o descomprime el ZIP) y colócate en su raíz:

```bash
cd Task-Tracker-CLI
```

Opcionalmente, verifica que `package.json` no tenga dependencias:

```bash
npm install   # no instala nada; no hay dependencies
```

---

## 🚀 Cómo ejecutar

El comando general tiene esta forma:

```bash
node app.js <comando> [argumentos]
```

| Parámetro | Descripción |
| --- | --- |
| `<comando>` | Operación a realizar (`add`, `update`, `delete`, `mark-in-progress`, `mark-done`, `list`, `help`). |
| `[argumentos]` | Valores posicionales según el comando (descripción entre comillas, ID, filtro de estado). |

También existen scripts de npm como atajos:

```bash
npm run list
npm run add -- "Comprar pan"
```

---

## 🗂️ Estructura del proyecto

```
Task-Tracker-CLI/
├── app.js                  # Orquestador principal (único punto de entrada y captura de errores)
├── package.json            # Metadatos del proyecto; cero dependencias
├── conts/
│   └── constants.js        # Rutas, estados permitidos y mensajes del sistema
├── lib/
│   ├── cliParser.js        # Parseo y validación de argumentos posicionales
│   ├── fileManager.js      # Lectura/escritura segura del archivo JSON (fs síncrono)
│   └── taskService.js      # Lógica de negocio de tareas
├── data/
│   └── tasks.json          # Base de datos local (se crea automáticamente)
├── scripts/
│   └── build-package.js    # Genera el paquete ZIP del proyecto
└── spec/                   # Documentación Spec-Driven Development
```

---

## 🗄️ Modelo de datos

Cada tarea es un objeto JSON con los siguientes campos:

```json
{
  "id": 1,
  "description": "Comprar el pan",
  "status": "todo",
  "createdAt": "2026-08-17T15:51:00.000Z",
  "updatedAt": "2026-08-17T15:51:00.000Z"
}
```

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | `number` | Identificador único numérico auto-incremental. |
| `description` | `string` | Descripción de la tarea. |
| `status` | `string` | Enum: `todo` \| `in-progress` \| `done`. |
| `createdAt` | `string` | Timestamp ISO 8601 de creación. |
| `updatedAt` | `string` | Timestamp ISO 8601 de última actualización. |

**Transiciones de estado válidas:**

```
todo ────────────► in-progress ────────────► done
```

> Las transiciones son idempotentes: marcar `done` sobre una tarea ya `done` es válido y solo actualiza `updatedAt`.

---

## 🧪 Comandos y combinaciones

### Tabla resumen de comandos

| Comando | Sintaxis | Descripción |
| --- | --- | --- |
| `add` | `node app.js add "<descripción>"` | Añade una nueva tarea (estado `todo`). |
| `update` | `node app.js update <id> "<nueva descripción>"` | Actualiza la descripción de una tarea. |
| `delete` | `node app.js delete <id>` | Elimina una tarea de forma persistente. |
| `mark-in-progress` | `node app.js mark-in-progress <id>` | Cambia el estado a `in-progress`. |
| `mark-done` | `node app.js mark-done <id>` | Cambia el estado a `done`. |
| `list` | `node app.js list [todo\|in-progress\|done]` | Lista tareas, con filtro opcional por estado. |
| `help` | `node app.js help` | Muestra la ayuda del sistema. |

> **Nota de validación:** la descripción solo se valida como "cadena no vacía"; los números también se aceptan (se guardan como string, ej. `add 123` → `"123"`). Los argumentos sobrantes en `add` y `list` se ignoran.

### ✅ Combinaciones con acierto (éxito)

> Asumiendo un estado inicial con las tareas existentes necesarias para cada caso.

| # | Comando | Resultado | ¿Por qué es un acierto? |
| --- | --- | --- | --- |
| 1 | `node app.js add "Comprar pan"` | `Tarea añadida exitosamente (ID: 1)` | Descripción no vacía válida; se genera ID, estado `todo` y timestamps. |
| 2 | `node app.js add "t1" "t2"` | `Tarea añadida exitosamente (ID: ...)` | `add` solo usa el primer argumento; los extras se ignoran. |
| 3 | `node app.js add 123` | `Tarea añadida exitosamente (ID: ...)` | `"123"` es una cadena no vacía; se guarda como descripción string. |
| 4 | `node app.js update 1 "Nueva"` | `Tarea actualizada exitosamente (ID: 1)` | ID válido y tarea existente; descripción no vacía. |
| 5 | `node app.js delete 1` | `Tarea eliminada exitosamente (ID: 1)` | ID válido y tarea existente; se filtra y persiste. |
| 6 | `node app.js mark-in-progress 1` | `Tarea 1 marcada como "in-progress"` | ID válido, tarea existente y estado del enum permitido. |
| 7 | `node app.js mark-done 1` | `Tarea 1 marcada como "done"` | ID válido, tarea existente y estado del enum permitido. |
| 8 | `node app.js list` | Lista todas las tareas | Sin filtro; devuelve el arreglo completo ordenado por `id`. |
| 9 | `node app.js list todo` | Solo tareas con estado `todo` | El filtro pertenece al enum permitido. |
| 10 | `node app.js list in-progress` | Solo tareas `in-progress` | El filtro pertenece al enum permitido. |
| 11 | `node app.js list done` | Solo tareas `done` | El filtro pertenece al enum permitido. |
| 12 | `node app.js list done extra` | Filtra por `done`, ignora extra | Solo se evalúa el primer argumento del filtro. |
| 13 | `node app.js list todo` (sin tareas `todo`) | `No hay tareas para mostrar.` | Filtro válido pero sin resultados; mensaje controlado. |
| 14 | `node app.js help` | Muestra la ayuda | Comando reconocido. |
| 15 | `node app.js --help` | Muestra la ayuda | Alias de `help` soportado. |

### ❌ Combinaciones con error

| # | Comando | Error mostrado | ¿Por qué es un error? |
| --- | --- | --- | --- |
| 1 | `node app.js` | `Uso: node app.js <comando> [argumentos] ...` | Falta el comando: el primer argumento posicional es obligatorio. |
| 2 | `node app.js badcmd` | `Comando desconocido: "badcmd"` | El comando no pertenece al conjunto soportado. |
| 3 | `node app.js add` | `La descripción de la tarea es obligatoria y debe ser una cadena no vacía.` | Falta la descripción (sin argumentos). |
| 4 | `node app.js add ""` | `La descripción de la tarea es obligatoria y debe ser una cadena no vacía.` | La descripción está vacía después de recortar espacios. |
| 5 | `node app.js update` | `El ID debe ser un número entero positivo.` | Falta el ID. |
| 6 | `node app.js update abc "x"` | `El ID debe ser un número entero positivo.` | `"abc"` no es un número entero válido. |
| 7 | `node app.js update -1 "x"` | `El ID debe ser un número entero positivo.` | El ID debe ser `> 0`. |
| 8 | `node app.js update 1` | `La descripción de la tarea es obligatoria y debe ser una cadena no vacía.` | Falta la nueva descripción. |
| 9 | `node app.js update 1 ""` | `La descripción de la tarea es obligatoria y debe ser una cadena no vacía.` | La descripción está vacía. |
| 10 | `node app.js update 999 "x"` | `No existe ninguna tarea con ID: 999` | El ID es válido pero la tarea no existe. |
| 11 | `node app.js delete` | `El ID debe ser un número entero positivo.` | Falta el ID. |
| 12 | `node app.js delete abc` | `El ID debe ser un número entero positivo.` | `"abc"` no es un número entero válido. |
| 13 | `node app.js delete 999` | `No existe ninguna tarea con ID: 999` | El ID es válido pero la tarea no existe. |
| 14 | `node app.js mark-in-progress` | `El ID debe ser un número entero positivo.` | Falta el ID. |
| 15 | `node app.js mark-in-progress abc` | `El ID debe ser un número entero positivo.` | `"abc"` no es un número entero válido. |
| 16 | `node app.js mark-in-progress 999` | `No existe ninguna tarea con ID: 999` | La tarea no existe. |
| 17 | `node app.js mark-done` | `El ID debe ser un número entero positivo.` | Falta el ID. |
| 18 | `node app.js mark-done 999` | `No existe ninguna tarea con ID: 999` | La tarea no existe. |
| 19 | `node app.js list invalido` | `Filtro de estado inválido: "invalido". Estados permitidos: todo, in-progress, done.` | El filtro no pertenece al enum permitido. |
| 20 | `node app.js add ""` sobre un `tasks.json` corrupto | `El archivo de datos contiene JSON inválido: ...` | El parseo falla con un JSON malformado. |

> **Importante:** en los casos 10, 13, 16 y 18 el ID es numéricamente válido, pero la operación falla porque **la tarea no existe** en el momento de la ejecución. Esto es una **regla de negocio**, no un error de parseo.

---

## ⚠️ Manejo de errores

- **Único `try/catch` en `app.js`**: todas las excepciones de los módulos se propagan y se capturan en el punto de entrada.
- Formato de salida en error: `Error: <mensaje explicativo>`.
- Cuando falla, el proceso termina con código de salida `1` (`process.exitCode = 1`), útil para scripting.
- Los errores son siempre **descriptivos**, indicando exactamente qué dato está mal (ID, descripción, estado o comando).

---

## 📐 Especificación (Spec-Driven Development)

El proyecto sigue la metodología **Loop Engineering / Spec-Driven Development (SDD)**. Toda la documentación técnica y los planes de implementación están en la carpeta [`spec/`](spec/):

- `spec/constitution/` — misión, stack tecnológico y roadmap.
- `spec/features/001-add-task/` … `spec/features/005-list-tasks/` — cada feature con `spec.md`, `plan.md` y `tasks.md`.

---


---

## 📄 Licencia

MIT

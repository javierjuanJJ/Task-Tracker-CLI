'use strict';

const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const TASKS_FILE = path.join(DATA_DIR, 'tasks.json');

const STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
};

const VALID_STATUSES = Object.values(STATUS);

const DEFAULT_STATUS = STATUS.TODO;

const MESSAGES = {
  FILE_CREATED: (file) => `Archivo de datos creado automáticamente: ${file}`,
  TASK_ADDED: (id) => `Tarea añadida exitosamente (ID: ${id})`,
  TASK_UPDATED: (id) => `Tarea actualizada exitosamente (ID: ${id})`,
  TASK_DELETED: (id) => `Tarea eliminada exitosamente (ID: ${id})`,
  TASK_MARKED: (id, status) => `Tarea ${id} marcada como "${status}"`,
  TASK_NOT_FOUND: (id) => `No existe ninguna tarea con ID: ${id}`,
  INVALID_DESCRIPTION: 'La descripción de la tarea es obligatoria y debe ser una cadena no vacía.',
  INVALID_ID: 'El ID debe ser un número entero positivo.',
  INVALID_STATUS: `Estado inválido. Estados permitidos: ${VALID_STATUSES.join(', ')}.`,
  INVALID_STATUS_FILTER: (status) => `Filtro de estado inválido: "${status}". Estados permitidos: ${VALID_STATUSES.join(', ')}.`,
  UNKNOWN_COMMAND: (command) => `Comando desconocido: "${command}". Usa --help para ver la ayuda.`,
  EMPTY_LIST: 'No hay tareas para mostrar.',
  USAGE: [
    'Uso: node app.js <comando> [argumentos]',
    '',
    'Comandos:',
    '  add "Descripción"                Añadir una nueva tarea',
    '  update <id> "Nueva descripción"  Actualizar la descripción de una tarea',
    '  delete <id>                      Eliminar una tarea',
    '  mark-in-progress <id>            Marcar una tarea como "in-progress"',
    '  mark-done <id>                   Marcar una tarea como "done"',
    '  list [estado]                    Listar tareas (filtro: todo|in-progress|done)',
    '  help                             Mostrar esta ayuda',
  ].join('\n'),
};

module.exports = {
  DATA_DIR,
  TASKS_FILE,
  STATUS,
  VALID_STATUSES,
  DEFAULT_STATUS,
  MESSAGES,
};

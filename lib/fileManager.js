'use strict';

const fs = require('fs');
const { dirname } = require('path');
const { TASKS_FILE, MESSAGES } = require('../conts/constants');

function ensureFileExists() {
  try {
    fs.accessSync(TASKS_FILE);
    return false;
  } catch (err) {
    fs.mkdirSync(dirname(TASKS_FILE), { recursive: true });
    fs.writeFileSync(TASKS_FILE, '[]', 'utf8');
    return true;
  }
}

function parseJson(raw) {
  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error(`El archivo de datos contiene JSON inválido: ${err.message}`);
    }
    throw err;
  }
  if (!Array.isArray(data)) {
    throw new Error('El archivo de datos debe contener un arreglo JSON de tareas.');
  }
  return data;
}

function readTasks() {
  const created = ensureFileExists();
  if (created) {
    console.log(MESSAGES.FILE_CREATED(TASKS_FILE));
  }
  const raw = fs.readFileSync(TASKS_FILE, 'utf8');
  return parseJson(raw);
}

function writeTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}

module.exports = {
  ensureFileExists,
  readTasks,
  writeTasks,
};
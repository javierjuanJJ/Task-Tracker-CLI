'use strict';

const { DEFAULT_STATUS, MESSAGES, VALID_STATUSES } = require('../conts/constants');
const fileManager = require('./fileManager');

function now() {
  return new Date().toISOString();
}

function generateNextId(tasks) {
  if (tasks.length === 0) {
    return 1;
  }
  return Math.max(...tasks.map((t) => t.id)) + 1;
}

function findTask(tasks, id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    throw new Error(MESSAGES.TASK_NOT_FOUND(id));
  }
  return task;
}

function assertValidStatus(status) {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error(MESSAGES.INVALID_STATUS);
  }
  return status;
}

function buildTask(id, description) {
  const timestamp = now();
  return {
    id,
    description,
    status: DEFAULT_STATUS,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

function addTask(description) {
  const tasks = fileManager.readTasks();
  const task = buildTask(generateNextId(tasks), description);
  tasks.push(task);
  fileManager.writeTasks(tasks);
  return task;
}

function updateTask(id, description) {
  const tasks = fileManager.readTasks();
  const task = findTask(tasks, id);
  task.description = description;
  task.updatedAt = now();
  fileManager.writeTasks(tasks);
  return task;
}

function deleteTask(id) {
  const tasks = fileManager.readTasks();
  findTask(tasks, id);
  const filtered = tasks.filter((t) => t.id !== id);
  fileManager.writeTasks(filtered);
}

function markTaskStatus(id, status) {
  assertValidStatus(status);
  const tasks = fileManager.readTasks();
  const task = findTask(tasks, id);
  task.status = status;
  task.updatedAt = now();
  fileManager.writeTasks(tasks);
  return task;
}

function listTasks(statusFilter) {
  const tasks = fileManager.readTasks();
  if (statusFilter === null || statusFilter === undefined) {
    return tasks;
  }
  return tasks.filter((t) => t.status === statusFilter);
}

function formatTask(task) {
  return (
    `ID: ${task.id} | Estado: ${task.status} | ` +
    `Creada: ${task.createdAt} | Actualizada: ${task.updatedAt}\n` +
    `    ${task.description}`
  );
}

module.exports = {
  addTask,
  updateTask,
  deleteTask,
  markTaskStatus,
  listTasks,
  formatTask,
  generateNextId,
  findTask,
  assertValidStatus,
};
'use strict';

const { MESSAGES } = require('./conts/constants');
const { parseArgs } = require('./lib/cliParser');
const taskService = require('./lib/taskService');

function execute(argv) {
  const { command, ...args } = parseArgs(argv);

  switch (command) {
    case 'add': {
      const task = taskService.addTask(args.description);
      return MESSAGES.TASK_ADDED(task.id);
    }

    case 'update': {
      const task = taskService.updateTask(args.id, args.description);
      return MESSAGES.TASK_UPDATED(task.id);
    }

    case 'delete': {
      taskService.deleteTask(args.id);
      return MESSAGES.TASK_DELETED(args.id);
    }

    case 'mark-in-progress':
    case 'mark-done': {
      const task = taskService.markTaskStatus(args.id, args.status);
      return MESSAGES.TASK_MARKED(task.id, task.status);
    }

    case 'list': {
      const tasks = taskService.listTasks(args.statusFilter);
      if (tasks.length === 0) {
        return MESSAGES.EMPTY_LIST;
      }
      return tasks.map(taskService.formatTask).join('\n');
    }

    case 'help':
      return MESSAGES.USAGE;

    default:
      return MESSAGES.UNKNOWN_COMMAND(command);
  }
}

try {
  const output = execute(process.argv.slice(2));
  if (output) {
    console.log(output);
  }
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exitCode = 1;
}
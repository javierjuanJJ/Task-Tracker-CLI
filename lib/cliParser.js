'use strict';

const { MESSAGES, VALID_STATUSES } = require('../conts/constants');

function validateId(rawId) {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error(MESSAGES.INVALID_ID);
  }
  return id;
}

function validateDescription(rawDescription) {
  if (typeof rawDescription !== 'string' || rawDescription.trim() === '') {
    throw new Error(MESSAGES.INVALID_DESCRIPTION);
  }
  return rawDescription.trim();
}

function validateStatusFilter(rawStatus) {
  if (rawStatus === undefined || rawStatus === null) {
    return null;
  }
  if (!VALID_STATUSES.includes(rawStatus)) {
    throw new Error(MESSAGES.INVALID_STATUS_FILTER(rawStatus));
  }
  return rawStatus;
}

function parseArgs(argv) {
  const [command, ...rest] = argv;
  if (!command) {
    throw new Error(MESSAGES.USAGE);
  }

  switch (command) {
    case 'add':
      return { command, description: validateDescription(rest[0]) };

    case 'update':
      return {
        command,
        id: validateId(rest[0]),
        description: validateDescription(rest[1]),
      };

    case 'delete':
      return { command, id: validateId(rest[0]) };

    case 'mark-in-progress':
      return { command, status: 'in-progress', id: validateId(rest[0]) };

    case 'mark-done':
      return { command, status: 'done', id: validateId(rest[0]) };

    case 'list':
      return { command, statusFilter: validateStatusFilter(rest[0]) };

    case 'help':
    case '--help':
      return { command: 'help' };

    default:
      throw new Error(MESSAGES.UNKNOWN_COMMAND(command));
  }
}

module.exports = {
  parseArgs,
  validateId,
  validateDescription,
  validateStatusFilter,
};
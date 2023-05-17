// @ts-check

export function init(config) {
  return true;
}

/**
 * exits the program
 * @param {number} code
 * @returns {number}
 */
export function exit(code) {
  return code + 1;
}

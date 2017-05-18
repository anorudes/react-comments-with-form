module.exports = function (str) {
  if (!str) str = '';

  return str.replace(/(?=[\/\\^$*+?.()|{}[\]])/g, '\\');
};

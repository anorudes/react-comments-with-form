const path = require('path');

module.exports = {
  resolve: {
    alias: {
      components: path.join(__dirname, '../src/components/'),
      utils: path.join(__dirname, '../src/utils/')
    },
  },
};

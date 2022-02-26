const del = require('del');

// Конфигурация
const path = require('../config/path');

// Удаление public
const clear = () => {
    return del(path.root);
}

module.exports = clear;
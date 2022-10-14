const path = require('path');
const fs = require('fs');

const express = require('express');
const {PORT} = require('./config');

const counter_router = require('./api/counter');

const app = express();
app.use(express.urlencoded({extended: false}));     // для POST и PUT запросов

// ----------------------------------------
// Обработчики запросов
app.use('/counter/', counter_router);

// Создаём директорию для данных
//const p = path.join(__dirname, '..', '/data');
//console.log('p = ' + path.join(__dirname, '..', '/data'));

// fs.mkdirSync(path.join(__dirname, '..',  '..', 'data'));

// ----------------------------------------
// Запускаем сервер
app.listen(PORT); 
// ----------------------------------------

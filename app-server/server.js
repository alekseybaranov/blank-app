// ----------------------------------------------------------------------------
// Системные модули
//

const path = require('path');


// ----------------------------------------------------------------------------
// Сторонние модули
//

// модули сервера express и шаблонизатора handlebars
//
const express = require(`express`),
      hbs     = require(`express-handlebars`);

// промежуточное ПО
const body = require('body-parser');
const cookie = require('cookie-parser');

// модуль логгирования
//
const morgan = require('morgan');

// модуль создания уникальных идентификаторов
//
const uuid = require('uuid/v4');

// модуль загрузки параметров
//var nconf = require(`nconf`)


// ----------------------------------------------------------------------------
// Собственные модули
//





// ----------------------------------------------------------------------------
// Загружаем параметры последовательно из трёх источников:
// 1. из аргументов командной строки;
// 2. из переменных среды;
// 3. из файла конфигурации "./config.json"
// Если параметр не задан, то устанавливаем значение по умолчанию
//
//nconf.argv().env().file({ file: `config.json` })


// ----------------------------------------------------------------------------
// Используемые каталоги
//

// каталог сервера
//
let serverDir = __dirname.replace(/\\/g, '/').toLowerCase();
console.log('serverDir ==> ', serverDir);

// каталог проекта
//
let baseDir = path.dirname(serverDir)
console.log('baseDir ==> ', baseDir);

// каталог внешних статических  файлов
//
let frontDir = baseDir + `/app-front/public`
console.log('frontDir ==> ', frontDir);

// каталог представлений
//
let viewsDir = serverDir + `/views`
console.log('viewsDir ==> ', viewsDir);

// каталог шаблонов
//
//let layoutsDir = nconf.get(`layoutsDir`) || `/views/layouts/`
//layoutsDir = __dirname + layoutsDir
let layoutsDir = serverDir + `/views/layouts`
console.log('layoutsDir ==> ', layoutsDir);

// каталог частичных шаблонов
//
//let partialsDir = nconf.get(`partialsDir`) || `/views/partials/`
//partialsDir = __dirname + partialsDir
let partialsDir = serverDir + `/views/partials`
console.log('partialsDir ==> ', partialsDir);


// порт http-сервера
//
//let port = nconf.get(`port`) // || 3000
let port = process.env.PORT || 3000             // порт по умолчанию - 3000
console.log('port ==>', port);



// ...
//
const users = {};     // массив? пользователей
const ids = {};       // массив? cookies


// ----------------------------------------------------------------------------
// Настраиваем и запускаем express
//
const app = express();

// Устанавливаем порт http-сервера
//
app.set(`port`, port)                           // порт HTTP-сервера

// ...
//
app.use(morgan('dev'));                         // логгирование
app.use(body.json());
app.use(cookie());


// Подключаем шаблонизатор Handlebars
//
app.set('views', viewsDir)                      // каталог представлений
app.engine(`hbs`, hbs( {
  extname: `hbs`,                               // расширение файлов-шаблонов
  defaultLayout: `main`,                        // основной шаблон
  layoutsDir: layoutsDir,                       // каталог шаблонов
  partialsDir: partialsDir,                     // каталог частичных шаблонов
  helpers: {                                    // механизм "секций"
    section: function(name, options){
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    }
  }
}))
app.set('view engine', 'hbs')

// Подключаем промежуточное ПО обработки статических файлов
//
app.use(express.static(frontDir));             // каталог статических файлов

// ----------------------------------------------------------------------------
//                                  МАРШРУТИЗАЦИЯ 
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Пользовательская страница /auth 
//
app.post('/auth', function (req, res) {

  // Извлекаем данные из запроса
  const username = req.body.username;
  const email = req.body.email;

  // Проверка данных на корректность
  if (!username || !email) {
    return res.status(400).end(); // Некорректные данные
  }

  // Проверяем, новый пользователь, или нет
  if (!users[email]) {
    // Пользователь новый, сохраняем его данные в массиве
    users[email] = {
      username,
      email,
      count: 0,
    };
  }

  const id = uuid();    // создаём уникальный идентификатор (cookie)
  ids[id] = email;      // сохраняем идентификатор

  // Добавляем к ответу cookie
  res.cookie('podvorot',              // название
             id,                      // идентификатор
             { //domain: 'localhost',
               expires: new Date(Date.now() + 1000 * 60 * 10) // 10 минут
             });
  res.json({id});
});

// ----------------------------------------------------------------------------
// Пользовательская страница /me
//
app.get('/me', function (req, res) {
  // Проверяет cookies 'podvorot', если она есть,
  // то возвращает информацию о пользователе
  const id = req.cookies['podvorot'];
  const email = ids[id];
  if (!email || !users[email]) {
    return res.status(401).end();
  }

  users[email].count += 1;

  res.json(users[email]);
})

// ----------------------------------------------------------------------------
// Пользовательская страница /home
//
app.get('/home', function(req, res) {
  res.render('home');
});

// ----------------------------------------------------------------------------
// Пользовательская страница /users
//
app.get('/users', function (req, res) {
  const scorelist = Object.entries(users)
    .sort((l, r) => l.score - r.score)
    .map(user => {
      return {
        email: user.email,
        age: user.age,
        score:user.score,
      }
    });

  res.json(scorelist);
});



// ----------------------------------------------------------------------------
// Пользовательская страница /about
//
app.get('/about', function(req, res) {
  res.render('about');
});

// ----------------------------------------------------------------------------
// Пользовательская страница 404
// (промежуточное ПО)
//
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

// ----------------------------------------------------------------------------
// Пользовательская страница 500
// (промежуточное ПО)
//
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

// ----------------------------------------------------------------------------
// Запускаем Express
//
app.listen(app.get('port'), function () {
  console.log('Express прослушивает порт:' + 
              app.get('port') + 
              '   для завершения нажмите Ctrl+C');
});

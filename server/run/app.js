// ----------------------------------------------------------------------------
// Системные модули
//


// ----------------------------------------------------------------------------
// Сторонние модули
//

// модули сервера express и шаблонизатора handlebars
//
const express = require(`express`),
      hbs     = require(`express-handlebars`)

// промежуточное ПО
//
const body = require('body-parser')         // ?
const cookie = require('cookie-parser')     // ?
const morgan = require('morgan')            // журналирование

// модуль создания уникальных идентификаторов
//
const uuid = require('uuid/v4')

// ----------------------------------------------------------------------------
// Собственные модули
//
const dir = require('./dir')        // каталоги используемые приложением


// ----------------------------------------------------------------------------


const app = express()

// Подключаем шаблонизатор Handlebars (книга Бэнкс React и Rudux...)
//
app.set('views', dir.views)                     // каталог представлений
app.engine(`hbs`, hbs( {
  extname: `hbs`,                               // расширение файлов-шаблонов
  defaultLayout: `main`,                        // основной шаблон
  layoutsDir: dir.layouts,                      // каталог шаблонов
  partialsDir: dir.partials,                    // каталог частичных шаблонов
  helpers: {                                    // механизм "секций"
    section: function(name, options){
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    }
  }
}))
app.set('view engine', 'hbs')

// Отключаем выдачу информации о типе сервера и об операционной системе
//
app.disable('x-powered-by')

// Подключаем промежуточное ПО журналирования
//
switch(app.get('env')){
  case 'development':
    // Режим разработки
    // подключаем модуль 'morgan', который
    // поддерживает сжатое многоцветное журналирование для разработки
    app.use(require('morgan')('dev'))
    break
  case 'production':
    // Режим эксплуатации
    // подключаем модуль 'express-logger', который
    // поддерживает ежедневное чередование файлов журналов
    app.use(require('express-logger')({
      path: dir.log + '/requests.log'
    }))
    break
}


// ----------------------------------------------------------------------------
// Обработчики страниц
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Подключаем обработку статических файлов для нужд клиента
// (промежуточное ПО)
//
app.use(express.static(dir.frontend))  // каталог статических файлов клиента

// ----------------------------------------------------------------------------
// Подключаем обработку статических файлов для нужд сервера
// (промежуточное ПО)
//
app.use(express.static(dir.public))    // каталог статических файлов сервера

// ----------------------------------------------------------------------------
// Пользовательская страница '/'
//
app.get('/', function(req, res) {
  res.render('home')
})

// ----------------------------------------------------------------------------
// Пользовательская страница '/users'
//
const users = {}      // массив? пользователей

app.get('/users', function (req, res) {
  const scorelist = Object.entries(users)
    .sort((l, r) => l.score - r.score)
    .map(user => {
      return {
        email: user.email,
        age: user.age,
        score:user.score,
      }
    })

  res.json(scorelist)
})

// ----------------------------------------------------------------------------
// Пользовательская страница /about
//
app.get('/about', function(req, res) {
  res.render('about')
})

// ----------------------------------------------------------------------------
// Пользовательская страница /headers
// Отображает заголовки запроса браузера
//
app.get('/headers', function(req,res){
  res.set('Content-Type','text/plain')
  var s = ''
  for(var name in req.headers)
    s += name + ': ' + req.headers[name] + '\n'
  res.send(s)
})



// ----------------------------------------------------------------------------
// Пользовательская страница 404
// (промежуточное ПО)
//
app.use(function(req, res, next){
  res.status(404)
  res.render('404')
})

// ----------------------------------------------------------------------------
// Пользовательская страница 500
// (промежуточное ПО)
//
app.use(function(err, req, res, next){
  console.error(err.stack)
  res.status(500)
  res.render('500')
})

module.exports = app

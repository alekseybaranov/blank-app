// ----------------------------------------------------------------------------
// Системные модули
//
const path = require('path')


// ----------------------------------------------------------------------------
// Объект dir содержит ссылки на все, используемые программой, каталоги
//
const dir = {}

// каталог сервера
//
dir.run = __dirname.replace(/\\/g, '/').toLowerCase()
console.log('\ndir.run      ==> ', dir.run)

// каталог проекта
//
dir.project = path.dirname(dir.run)
console.log('dir.project  ==> ', dir.project)

// каталог статических файлов для нужд клиента
//
dir.frontend = dir.project + `/front`
console.log('dir.frontend ==> ', dir.frontend)

// каталог статических файлов для нужд сервера
//
dir.public = dir.project + `/public`
console.log('dir.public   ==> ', dir.public)

// каталог представлений
//
dir.views = dir.project + `/views`
console.log('dir.views    ==> ', dir.views)

// каталог шаблонов
//
dir.layouts = dir.project + `/views/layouts`
console.log('dir.layouts  ==> ', dir.layouts)

// каталог частичных шаблонов
//
dir.partials = dir.project + `/views/partials`
console.log('dir.partials ==> ', dir.partials)

// каталог журналов
//
dir.log = dir.project + `/log`
console.log('dir.log      ==> ', dir.log)


module.exports = dir

import { createStore,
         applyMiddleware } from 'redux'

import { mainReducer } from './reducers'    // Преобразователь (reducer)


// ключ, под которым будут сохраняться данные в localStorage браузера
const localStorageKey = 'perevod-data'


// ----------------------------------------------------------------------------
// Промежуточное ПО для хранилища

// logger -----------------------------------
//        регистратор изменений
//
const logger = store => next => action => {
  // код, который выполняется до выполнения действия
  let result
  console.groupCollapsed("dispatching", action.type)
  console.log('prev state', store.getState())
  console.log('action', action)

  // выполняем действие
  result = next(action)

  // код, который вызывается после выполнения действия
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

// saver  -----------------------------------
//        сохранение данных в localStore
//
const saver = store => next => action => {
  // код, который выполняется до выполнения действия

  // выполняем действие
  let result = next(action)

  // код, который вызывается после выполнения действия
  localStorage[localStorageKey] = JSON.stringify(store.getState())
  return result
}


// ----------------------------------------------------------------------------
// Store (Хранилище)
//
// Store - это объект, в котором хранятся текущие данные состояния приложения
//         и обрабатываются все обновления состояния.
//
// Хранилище обрабатывает обновление состояния, пропуская текущее состояние
// и действие через единый преобазователь данных (reducer), который передаётся
// функции создания хранилища 'createStore' в качестве параметра.
//
// Метод хранилища 'getState' возвращает текущее состояние приложения.
//


// storeFactory  ------------------------------------
//        фабрика создания хранилища с регистрацией промежуточного ПО
//
const storeFactory = (initialState) =>
  applyMiddleware(logger, saver)(createStore)(      // подключаем промеж-ное ПО
    mainReducer,                                    // редюсер
    (localStorage[localStorageKey]) ?               // загружаем состояние из 
      JSON.parse(localStorage[localStorageKey]) :   // локального хранилища
      initialState                                  // или начальное состояние
  )

  export default storeFactory
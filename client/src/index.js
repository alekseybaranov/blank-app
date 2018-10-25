import 'react-app-polyfill/ie9'   // поддержка IE9
//import 'react-app-polyfill/ie11'    // поддержка IE11
// Подключение react-app-polyfill для поддержки IE11 или IE9
// !!! ОБЯЗАТЕЛЬНО !!!   Строка импорта должна быть первой в файле


import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import storeFactory from './store'

import App from './components/App'                // Компонент приложения

// Начальное состояние  -----------------------------
//
const initialState = {
  firstName: '',
  secondName: '',
  users: []
}

// Создаём хранилище  -------------------------------
//
const store = storeFactory(initialState)


// ----------------------------------------------------------------------------
// Объект 'Provider' добавляет хранилище к контексту и обновляет компонент App
// после диспетчеризации действий. Хранилище передаётся провайдеру в виде
// свойства. Провайдеру нужен один дочерний компонент (в нашем случае - App).
//
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'))

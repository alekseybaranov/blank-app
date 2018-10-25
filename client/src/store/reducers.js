import {
  ACTION_CHANGE_FIRST_NAME,
  ACTION_CHANGE_SECOND_NAME
} from './actions'


// ----------------------------------------------------------------------------
// Reducer
//
// Reducer - это функция, которая запускается каждый раз, когда происходит 
//           действие.
//
// Reducer генерирует новое состояние исходя из текущего состояния и действия.
//
// Входящие параметры:
//   state  - текущее состояние
//   action - действие
// Возвращаемое значение: подготовленное новое состояние
//
export const mainReducer = (state, action) => {

  // Обработка изменения имени
  //
  if (action.type === ACTION_CHANGE_FIRST_NAME) {
    return { ...state, firstName: action.payload }
  }

  // Обработка изменения фамилии
  //
  if (action.type === ACTION_CHANGE_SECOND_NAME) {
    return { ...state, secondName: action.payload }
  }

  // Reducer всегда должен возвращать состояние, поэтому, если действие
  // не опознано, то возвращаем текущее состояние
  //
  return state
}

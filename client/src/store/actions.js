// ----------------------------------------------------------------------------
// Константы с типами действий
//
export const ACTION_CHANGE_FIRST_NAME   = 'ACTION_CHANGE_FIRST_NAME'
export const ACTION_CHANGE_SECOND_NAME  = 'ACTION_CHANGE_SECOND_NAME'



// ----------------------------------------------------------------------------
// Action Creators (Создатели действий)
//
// Action Creators - функции, которые возвращают объект действия
//
// Объект действия - это простой объект, который содержит поля:
// type               - идентификатор действия
// payload или другие - необходимая информация для обработки действия,
//                      которая передаётся во входящих параметрах
//

// Изменение имени
export const changeFirstName = (newFirstName) => {
  return {
    type: ACTION_CHANGE_FIRST_NAME,
    payload: newFirstName
  }
}

// Изменение фамилии
export const changeSecondName = (newSecondName) => {
  return {
    type: ACTION_CHANGE_SECOND_NAME,
    payload: newSecondName
  }
}


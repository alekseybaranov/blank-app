import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { changeFirstName,
         changeSecondName } from '../store/actions'

class App extends React.Component{
  render() {
    const { firstName, secondName, 
            changeFirstName, changeSecondName } = this.props
    return (
      <div>
        <div>
          <input 
            type="text" 
            value={firstName}
            onChange={(event) => { changeFirstName(event.target.value) }}
            placeholder="First Name" 
          />
        </div>

        <div>
          <input 
            type="text" 
            value={secondName}
            onChange={(event) => { changeSecondName(event.target.value) }}
            placeholder="Second Name" 
          />
        </div>

        <div>
          {`${firstName} ${secondName}`}
        </div>
      </div>
    )
  }
}

// функция выдёргивает из state-а поля, и добавляет их в props
const putStateToProps = (state) => {
  return {
    firstName: state.firstName,
    secondName: state.secondName
  }
}


// функция должна выдавать объект, с перечислением, какие функции мы хотим
// привязать к компоненту, к props-у
const putActionToProps = (dispatch) => {
  return {
    changeFirstName: bindActionCreators(changeFirstName, dispatch),
    changeSecondName: bindActionCreators(changeSecondName, dispatch)
  }
}


export default connect(putStateToProps, putActionToProps)(App)

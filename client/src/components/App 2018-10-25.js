import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { changeFirstName,
         changeSecondName } from '../store/actions'

class App extends React.Component{








  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }



  render() {
    const { firstName, secondName, users,
            changeFirstName, changeSecondName } = this.props

    console.log(`this.props.users: ${this.props.users}`)
    console.log(`this.props.firstName: ${this.props.firstName}`)
    
    console.log(`firstName: ${firstName}`)
    console.log(`users: ${users}`)

    









    

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

        <div className="App">
          <h1>Users</h1>
          {users.map(user =>
            <div key={user.id}>{user.username}</div>
          )}
        </div>

      </div>
    )
  }
}

// функция добавляет их в props все поля из state
const putStateToProps = (state) => {
  /*
  return {
    firstName: state.firstName,
    secondName: state.secondName,
    users: state.users
  }
  */

  return {...state}
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

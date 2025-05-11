import React, { Component } from 'react'
import ComponentF from './ComponentF'
import UserContext from './userContext'

class ComponentE extends Component {

  // static contextType = UserContext (two limitations 1-It only works with class components & 2-subscribe to a single context using context type)

  render() {
    return(
      <div>
        Component E context {this.context}
        <ComponentF />
      </div>
    ) 
  }
}

ComponentE.contextType = UserContext

export default ComponentE

// example of a multiple contextype
// function Context() {
//   return (
//     <ThemeContext.Consumer>
//       {theme => (
//         <UserContext.Consumer>
//           {user => {
//             <ProfilePage user={user} theme={theme} />
//           }}
//         </UserContext.Consumer>
//       )}
//     </ThemeContext.Consumer>
//   )
// }
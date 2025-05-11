import React, { Component } from 'react'
import { UserComsumer } from './userContext'

class ComponentF extends Component {
  render() {
    return (
      <UserComsumer>
        {username => {
          return <div>Hello {username}</div>
        }}
      </UserComsumer>
    )
  }
}

export default ComponentF
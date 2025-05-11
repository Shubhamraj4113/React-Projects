import React from "react"

const UserContext = React.createContext('Codevolution')

const UserProvider = UserContext.Provider
const UserComsumer = UserContext.Consumer

export { UserProvider, UserComsumer }
export default UserContext
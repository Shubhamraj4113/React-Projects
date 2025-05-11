import React from 'react';

// function Greet() {
//   return <h1>Hello Vishwas</h1>
// }

// const Greet = ({name, heroName, children}) => {
//   return (
//     <div>
//       <h1>
//         Hello {name} a.k.a {heroName}
//       </h1>
//       {children}
//     </div>
//   ) 
// }

const Greet = (props) => {
  const {name, heroName, children} = props
  return (
    <div>
      <h1>
        Hello {name} a.k.a {heroName}
      </h1>
      {children}
    </div>
  ) 
}
export default Greet;
// anotherway is a name export instead of default export
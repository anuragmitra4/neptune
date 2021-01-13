import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'

// export class Navbar extends Component {
//   render() {
//     return (
//       <div>
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//           <a className="navbar-brand" href="./">
//             H2Ok Innovations
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <a className="nav-link" href="./profile">
//                   Profile
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   className="nav-link"
//                   href="/login"
//                   onClick={() => {
//                     this.props.firebase.logout();
//                   }}
//                 >
//                   Sign Out
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </nav>
//       </div>
//     )
//   }
// }

export class NavigationBar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={require('../img/logo.png')}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          H2Ok Innovations
        </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default NavigationBar


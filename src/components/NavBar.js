import React from 'react'
import { NavLink } from 'react-router-dom'

import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" activeClassName="active">
            Leaderboard
          </NavLink>
        </li>
        <li style={{ float: 'right' }}>
          <NavLink to="/add" activeClassName="active">
            Add Question
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar

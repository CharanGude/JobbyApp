import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Navbar = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav>
      <ul className="main-navbar">
        <li>
          <Link className="nav-link" to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="login-website-logo-mobile-image"
              alt="website logo"
            />
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/jobs">
            Jobs
          </Link>
        </li>
        <li>
          <button type="button" onClick={onLogout} className="login-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Navbar)

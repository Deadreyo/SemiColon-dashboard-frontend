import { Link } from 'react-router-dom'
import classes from './DesktopNav.module.css'
import { getUserName, onLogout } from '../../../helpers/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretDown,
  faRightFromBracket,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const DesktopNav = () => {
  const [dropBarShow, setDropBarShow] = useState<boolean>(false)

  const onBarToggle = () => {
    setDropBarShow(!dropBarShow)
  }
  const isAdmin = JSON.parse(localStorage.getItem('user') || "").role === "admin";

  return (
    <nav className={classes['main-nav']}>
      <div className={classes['user-d']} onClick={onBarToggle}>
        <FontAwesomeIcon icon={faUserCircle} className={classes['usrCircle']} />
        {getUserName()}
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`${classes['r-arrow']} ${
            dropBarShow ? classes['r-arrow-clicked'] : ''
          }`}
        />
      </div>
      <Link
        to="/login"
        onClick={onLogout}
        className={`${classes['logout']} ${
          dropBarShow ? classes['logout-clicked'] : ''
        }`}
      >
        Logout
        <FontAwesomeIcon icon={faRightFromBracket} color="red" />
      </Link>
      <ul>
        {isAdmin && <li>
          <Link to="/admin">Admin dashboard</Link>
        </li>}
        <li>
          <Link to="/stats">Stats</Link>
        </li>
        <li>
          <Link to="/participants">Participants</Link>
        </li>
      </ul>
    </nav>
  )
}

export default DesktopNav

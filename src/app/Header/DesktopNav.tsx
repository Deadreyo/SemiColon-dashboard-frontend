import { Link } from 'react-router-dom'
import classes from './DesktopNav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretDown,
  faRightFromBracket,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../typings'
import { logoutUser } from '../../features/auth/authSlice'

const DesktopNav = () => {
  const { username, role } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const isAdmin = role === 'admin'

  const [dropBarShow, setDropBarShow] = useState<boolean>(false)

  const onBarToggle = () => {
    setDropBarShow(!dropBarShow)
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <nav className={classes['main-nav']}>
      <div className={classes['user-d']} onClick={onBarToggle}>
        <FontAwesomeIcon icon={faUserCircle} className={classes['usrCircle']} />
        {username}
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`${classes['r-arrow']} ${
            dropBarShow ? classes['r-arrow-clicked'] : ''
          }`}
        />
      </div>
      <Link
        to="/login"
        onClick={handleLogout}
        className={`${classes['logout']} ${
          dropBarShow ? classes['logout-clicked'] : ''
        }`}
      >
        Logout
        <FontAwesomeIcon icon={faRightFromBracket} color="red" />
      </Link>
      <ul>
        {isAdmin && (
          <li>
            <Link to="/admin">Admin dashboard</Link>
          </li>
        )}
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

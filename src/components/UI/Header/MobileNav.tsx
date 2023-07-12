import classes from './MobileNav.module.css'
import StackedBtn from '../StackedBtn/StackedBtn'
import { Link } from 'react-router-dom'
import { MouseEventHandler, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { getUserName } from '../../../helpers/auth'

const MobileNav = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const onModalShow = () => {
    dialogRef.current?.showModal()
  }

  const onModalClose = () => {
    dialogRef.current?.close()
  }

  const onBackDropClick: MouseEventHandler<HTMLDialogElement> = (
    event: React.MouseEvent<HTMLDialogElement>
  ) => {
    const rect = dialogRef.current?.getBoundingClientRect()
    if (rect) {
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      if (!isInDialog) {
        dialogRef.current?.close()
      }
    }
  }

  return (
    <nav className={classes['mobile-nav']}>
      <div className={classes['user-d']}>
        <FontAwesomeIcon icon={faUserCircle} className={classes['usrCircle']} />
        {getUserName()}
      </div>
      <StackedBtn onClick={onModalShow} />
      <dialog
        ref={dialogRef}
        className={classes['dia']}
        onClick={onBackDropClick}
      >
        <ul className={classes['dia-elements']}>
          <li>
            <Link to="/admin">Admin dashboard</Link>
          </li>
          <li>
            <Link to="/stats" onClick={onModalClose}>
              Stats
            </Link>
          </li>
          <li>
            <Link to="/participants" onClick={onModalClose}>
              Participants
            </Link>
          </li>
        </ul>
        <div>
          <Link to="/login" onClick={onModalClose}>
            Logout <FontAwesomeIcon icon={faRightFromBracket} color="red" />
          </Link>
        </div>
      </dialog>
    </nav>
  )
}

export default MobileNav

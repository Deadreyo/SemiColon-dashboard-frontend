import { Participant, StatusEnum } from '../../types/Participant'
import Button from '../UI/Button/Button'
import classes from './ParDetails.module.css'

const ParDetails = ({
  par,
  statusChangeHandler,
}: {
  par: Participant
  statusChangeHandler: (phone: string, status: StatusEnum) => void
}) => {
  return (
    <div className={classes.parContainer}>
      <div className={classes.details}>
        <h2>{par.name}</h2>
        <div className={classes.parData}>
          <p>
            <span className={classes.bold}>Email: </span>
            {par.email}
          </p>
          <p>
            <span className={classes.bold}>College ID: </span>
            {par.collegeId}
          </p>
          <p>
            <span className={classes.bold}>Phone: </span>
            {par.phone}
          </p>
          <p>
            <span className={classes.bold}>Year: </span>
            {par.year}
          </p>
          <p>
            <span className={classes.bold}>Track: </span>
            {par.firstPreference}
          </p>
          <p>
            <span className={classes.bold}>Reason: </span>
            {par.firstPrefReason}
          </p>
          <p>
            <span className={classes.bold}>Knowlege: </span>
            {par.firstPrefKnowledge}
          </p>
          <p>
            <span className={classes.bold}>Past Experiences: </span>
            {par.pastExperience}
          </p>
        </div>
        <div className={classes.status}>
          {par.acceptanceStatus && (
            <p
              className={`${classes.pending} ${classes[par.acceptanceStatus]}`}
            >
              {par.acceptanceStatus}
            </p>
          )}
        </div>
      </div>
      <hr className={classes.line}></hr>
      <div className={classes.buttons}>
        <Button
          onClick={() => statusChangeHandler(par.phone, StatusEnum.FILTERED)}
          className={classes.rejectBtn}
        >
          Filter
        </Button>
        <Button
          onClick={() => statusChangeHandler(par.phone, StatusEnum.EMAILED)}
          className={classes.passiveBtn}
        >
          Emailed
        </Button>
        <Button
          onClick={() => statusChangeHandler(par.phone, StatusEnum.SCHEDULED)}
          className={classes.passiveBtn}
        >
          Scheduled
        </Button>
        <Button
          onClick={() => statusChangeHandler(par.phone, StatusEnum.ACCEPTED)}
          className={classes.acceptBtn}
        >
          Accept
        </Button>
        <Button
          onClick={() => statusChangeHandler(par.phone, StatusEnum.REJECTED)}
          className={classes.rejectBtn}
        >
          Reject
        </Button>
      </div>
    </div>
  )
}

export default ParDetails

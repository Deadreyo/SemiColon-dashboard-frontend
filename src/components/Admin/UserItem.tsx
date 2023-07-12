import classes from './UserItem.module.css'

const UserItem = ({ name, onChoose } : { name: string, onChoose: () => void }) => {

    return (
        <div className={classes.item} onClick={onChoose}>
          <h3>{name}</h3>
        </div>
      )

}
 
export default UserItem;
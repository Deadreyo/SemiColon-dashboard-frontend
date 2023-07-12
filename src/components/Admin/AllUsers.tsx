import { User } from '../../types/User';
import classes from './AllUsers.module.css'
import UserItem from './UserItem';

const AllUsers = ({ data, onChoose } : {data: User[], onChoose: (id: string) => void}) => {

    let output;
    if (data[0]) {
        output = (
          <div>
            {data.map((item) => (
              <UserItem
                key={item.phone}
                name={item.username}
                onChoose={onChoose.bind(null, item._id)}
              />
            ))}
          </div>
        )
      }
    return <div className={classes['all-users']}>{output}</div>;
}
 
export default AllUsers;
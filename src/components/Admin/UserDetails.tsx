import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import Button from '../UI/Button/Button';
import classes from './UserDetails.module.css'

const UserDetails = ({user, updated, addUser, updateUser, mode, setMode, loading}: {user: User, updated: boolean, addUser: (newUser: {username: string, phone: string, active: boolean, role: string, password: string}) => void, updateUser: (user: User)=> void, mode: string, setMode: (mode: string)=>void, loading: boolean}) => {
  const [phone, setPhone] = useState(user.phone);
  const [username, setUsername] = useState(user.username);
  const [role, setRole] = useState(user.role);
  const [active, setActive] = useState(user.active);
  const [password, setPassword] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newUsername, setNewUsername] = useState("");
    useEffect(() => {
      setPhone(user.phone);
      setUsername(user.username);
      setRole(user.role);
      setActive(user.active)
    }, [user])

    return (
        <div className={classes.userContainer}>
          <div className={classes.details}>
            <div className={classes.userData}>
              <span className={classes.bold}>
                Name:{" "}
                {mode==="view" && username}
                {mode==="edit" && <input value={username} onChange={(e) => {setUsername(e.target.value)}}></input>}
                {mode==="add" && <input value={newUsername} onChange={(e) => {setNewUsername(e.target.value)}}></input>}
              </span>
              <p>
                <span className={classes.bold}>
                    Phone:{" "}
                    {mode==="view" && phone}
                    {mode==="edit" && <input value={phone} onChange={(e) => {setPhone(e.target.value)}}></input>}
                    {mode==="add" && <input value={newPhone} onChange={(e) => {setNewPhone(e.target.value)}}></input>}
                </span>
              </p>
              <p>
                <span className={classes.bold}>Status: </span>
                {mode==="view" && (user.active ? "Active" : "Inactive")}
                {mode!=="view" && 
                <select value={active ? "active" : "inactive"} onChange={(e)=>{setActive(e.target.value==="active")}}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                }
              </p>
              <p>
                <span className={classes.bold}>Role: </span>
                {(mode ==="view" || role === "admin") && role}
                {mode!=="view" && role !== "admin" && <select value={role} onChange={(e)=>{setRole(e.target.value)}}>
                  <option value="hr">hr</option>
                  <option value="member">member</option>
                </select>}
              </p>
              {mode==="add" && <p>
                <span className={classes.bold}>Password: </span>
                <input value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
                
              </p>}
            </div>
          </div>

          <hr className={classes.line}></hr>

          <div className={classes.buttons}>
            {mode==="edit" &&
            <>
              <Button
              onClick={() => updateUser({...user, phone: phone, role: role, username: username, active: active})}
              className={classes.acceptBtn}
              >
              Update
            </Button>
            <Button
              onClick={() => {setMode("view")}}
              className={classes.rejectBtn}
              >
              Cancel
            </Button> 
            </>
            }
            {mode==="view" &&
            <Button onClick={() => {setMode("add")}} className={classes.acceptBtn}>
                Add user
            </Button>}
            {mode==="view" && role !== "admin" &&
            <Button onClick={() => {setMode("edit")}} className={classes.passiveBtn} disabled={user._id===""}>
                Edit
            </Button>
            }
            {mode==="add" && 
            <>
            <Button onClick={() => {addUser({username: newUsername, phone: newPhone, active: active, role: role, password: password})}} className={classes.acceptBtn}>
                Add
            </Button>
            <Button onClick={() => {setMode("view")}} className={classes.rejectBtn}>
                Cancel
            </Button>
            </>
            }
          </div>
          {updated && <div>Updated!</div>}
          {loading && <div>Loading...</div>}
        </div>
      )
}
 
export default UserDetails;
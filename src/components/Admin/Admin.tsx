import { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import { authHeader } from "../../helpers/auth";
import { useNavigate } from "react-router-dom";
import AllUsers from "./AllUsers";
import classes from './Admin.module.css'
import UserDetails from "./UserDetails";
import { User } from "../../types/User";
import axios from "axios";

const Admin = () => {
    const nav = useNavigate()

    const isAdmin = JSON.parse(localStorage.getItem('user') || "").role === "admin";
    if (!isAdmin) {
      nav("/stats");
    }

    const [chosenUser, setChosenUser] = useState<User>({
        _id: '',
        active: false,
        password: '',
        phone: '',
        role: 'hr',
        username: ''
    });
    const [userData, setUserData] = useState<User[]>([]);
    const [updated, setUpdated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [mode, setMode] = useState("view");

    useEffect(() => {
        const hdrs = authHeader()
        if (hdrs) {
            fetch("https://semicolon-registration-backend.onrender.com/user/getAll", {headers: hdrs})
            .then(data => data.json())
            .then(data => setUserData(data.data));
        } else {
            nav("/login")
        }
    }, []);

    const onChoose = (id: string) => {
        for (const user of userData) {
          if (user._id === id) {
            setChosenUser(user)
            return
          }
        }
      }

      const addUser = async (newUser: {username: string, phone: string, active: boolean, role: string, password: string}) => {
        setLoading(true);
        try {
          const headers = authHeader()
          if (headers) {
            const res = await axios.post(
              'https://semicolon-registration-backend.onrender.com/user/',
              {
                ...newUser
              },
              {
                headers,
              }
            )
            if (res.data.status === "success") {
              const result = res.data.data;
              delete result.__v; delete result.createdAt; delete result.updatedAt;
              setLoading(false);
              setChosenUser(result);
              setMode("view");
              setUserData((data) => {
                return data.map((user) => {
                  if (user._id === result._id) {return result}
                  return user;
                })
              })
            }
          } else {
            nav('/login')
          }
        } catch (err) {
          alert(`Error occured: ${err}`)
        }
      }
      const updateUser = async (newUser: User) => {
        setLoading(true);
        try {
          const headers = authHeader()
          if (headers) {
            const res = await axios.patch(
              'https://semicolon-registration-backend.onrender.com/user/update/'+newUser._id,
              {
                ...newUser
              },
              {
                headers,
              }
            )
            if (res.data.status === "success") {
              setLoading(false);
              setUpdated(true);
              setMode("view");
              setTimeout(() => {
                setUpdated(false);
              }, 1500);
              setUserData(data => {
                return data.map(user => {
                  if (user._id === newUser._id) {return newUser}
                  return user;
                })
              });
              setChosenUser(newUser);
            }
          } else {
            nav('/login')
          }
        } catch (err) {
          alert(`Error occured: ${err}`)
        }
      }

    return (
        <Card className={classes['admin-container']}>
            <AllUsers data={userData} onChoose={onChoose}/>
            <UserDetails user={chosenUser} updated={updated} addUser={addUser} updateUser={updateUser} mode={mode} setMode={setMode} loading={loading}/>
        </Card>
    );
}
 
export default Admin;
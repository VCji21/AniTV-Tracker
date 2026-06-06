import {useState, useEffect, use } from 'react'
import { getAllUserInfo } from './data/userInfo'
import GetAUser from './GetAUser';

/* --- Get all user except current --- */
const GetAllUsers = () => {
    const [users, setUsers] = useState([]);

    /* --- Get all user info --- */
    useEffect(() => {
        const allUsersInfo = async() => {
            const u = await getAllUserInfo();
            setUsers(u)
        }
        allUsersInfo();
    }, [])

  return (
    <div className='p-2 flex flex-col gap-4 w-full'>
        {users.length !== 0 && users.map((user, index) => {
            return (
                <GetAUser key={user._id} user={user} />
            )
        })}
        {use.length === 0 && <div>No user listed yet</div>}
    </div>
  )
}

export default GetAllUsers
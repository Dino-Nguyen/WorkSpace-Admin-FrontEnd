import { useEffect, useState } from 'react';
import classes from './UserList.module.scss';
import { Avatar } from '@mui/material';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import api from '../../store/actions/api';

export default function UserList({ usersListVisibility }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.fetchUsers().then((data) => {
      const { message, users } = data;
      console.log(message);
      setUsers(users);
    });
  }, []);

  const activateUserHandler = (userId) => {
    const cloneUsers = [...users];
    setUsers((prev) => {
      const index = prev.findIndex((user) => user._id === userId);
      cloneUsers[index].isActive = true;
      return cloneUsers;
    });
    const payload = { isActive: true };
    api.updateUser(userId, payload).then((data) => {
      console.log(data.message);
    });
  };

  const deactivateUserHandler = (userId) => {
    const cloneUsers = [...users];
    setUsers((prev) => {
      const index = prev.findIndex((user) => user._id === userId);
      cloneUsers[index].isActive = false;
      return cloneUsers;
    });
    const payload = { isActive: false };
    api.updateUser(userId, payload).then((data) => {
      console.log(data.message);
    });
  };

  return (
    <div
      className={classes['user-list']}
      style={usersListVisibility ? { display: 'block' } : { display: 'none' }}>
      <table className={classes['table']}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Created at</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div>
                    {!user.avatar ? (
                      <Avatar
                        sx={{
                          width: '50px',
                          height: '50px',
                          marginRight: '8px',
                          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
                        }}>
                        {user.username[0].toUpperCase()}
                      </Avatar>
                    ) : (
                      <Avatar
                        sx={{
                          width: '50px',
                          height: '50px',
                          marginRight: '8px',
                          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
                        }}
                        alt="owner-avatar"
                        src={user.avatar}
                      />
                    )}
                    <p>{user.username}</p>
                  </div>
                </td>
                <td>
                  <div>
                    <span>{user.fullName}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.isActive ? 'Active' : 'Inactive'}</td>
                <td>{new Date(user.createdAt).toDateString()}</td>
                <td>
                  {user.isActive ? (
                    <button
                      type="button"
                      onClick={() => {
                        deactivateUserHandler(user._id);
                      }}>
                      <PersonOffIcon />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        activateUserHandler(user._id);
                      }}>
                      <PersonAddIcon />
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

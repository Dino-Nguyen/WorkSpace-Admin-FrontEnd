import { useEffect, useState } from 'react';
import classes from './UserList.module.scss';
import { Avatar } from '@mui/material';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import api from '../../store/actions/api';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function UserList({ usersListVisibility, username }) {
  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [totalPages, setTotalPages] = useState([]);

  const [sortField, setSortField] = useState('username');
  const [ascendingOrder, setAscendingOrder] = useState(true);

  useEffect(() => {
    api.fetchUsers(page, sortField, ascendingOrder).then((data) => {
      const { users, totalPages } = data;
      setUsers(users);
      setLastPage(totalPages);
      setTotalPages(() => {
        const pagesArray = [...Array(totalPages).keys()].map((p) => p + 1);
        return pagesArray.filter((p) => p < page + 2 && p >= page - 1);
      });
    });
  }, [page, sortField, ascendingOrder]);

  useEffect(() => {
    let timer = setTimeout(async () => {
      if (username.length > 0) {
        const payload = { username };
        await api.searchUser(payload).then((data) => {
          setUsers(data.searchedUsers);
        });
      } else {
        api.fetchUsers(1, 'username', true).then((data) => {
          const { users, totalPages } = data;
          setUsers(users);
          setLastPage(totalPages);
          setTotalPages(() => {
            const pagesArray = [...Array(totalPages).keys()].map((p) => p + 1);
            return pagesArray.filter((p) => p < 3 && p >= 1);
          });
        });
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [username]);

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
            <th
              onClick={() => {
                setSortField('username');
                setAscendingOrder(!ascendingOrder);
              }}>
              Username
              {ascendingOrder && sortField === 'username' && (
                <span>
                  <ArrowDropUpIcon />
                </span>
              )}
              {!ascendingOrder && sortField === 'username' && (
                <span>
                  <ArrowDropDownIcon />
                </span>
              )}
            </th>
            <th
              onClick={() => {
                setSortField('fullName');
                setAscendingOrder(!ascendingOrder);
              }}>
              Full Name
              {ascendingOrder && sortField === 'fullName' && (
                <span>
                  <ArrowDropUpIcon />
                </span>
              )}
              {!ascendingOrder && sortField === 'fullName' && (
                <span>
                  <ArrowDropDownIcon />
                </span>
              )}
            </th>
            <th
              onClick={() => {
                setSortField('email');
                setAscendingOrder(!ascendingOrder);
              }}>
              Email
              {ascendingOrder && sortField === 'email' && (
                <span>
                  <ArrowDropUpIcon />
                </span>
              )}
              {!ascendingOrder && sortField === 'email' && (
                <span>
                  <ArrowDropDownIcon />
                </span>
              )}
            </th>
            <th
              onClick={() => {
                setSortField('isActive');
                setAscendingOrder(!ascendingOrder);
              }}>
              Status
              {ascendingOrder && sortField === 'isActive' && (
                <span>
                  <ArrowDropUpIcon />
                </span>
              )}
              {!ascendingOrder && sortField === 'isActive' && (
                <span>
                  <ArrowDropDownIcon />
                </span>
              )}
            </th>
            <th
              onClick={() => {
                setSortField('createdAt');
                setAscendingOrder(!ascendingOrder);
              }}>
              Created at
              {ascendingOrder && sortField === 'createdAt' && (
                <span>
                  <ArrowDropUpIcon />
                </span>
              )}
              {!ascendingOrder && sortField === 'createdAt' && (
                <span>
                  <ArrowDropDownIcon />
                </span>
              )}
            </th>
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
      {users && users.length === 0 && (
        <h2 className={classes['no-record']}>No document found.</h2>
      )}
      <div className={classes['user-list--pagination']}>
        <button type="button" onClick={() => setPage(1)}>
          <KeyboardDoubleArrowLeftIcon />
        </button>
        {totalPages.map((p, index) => (
          <button
            key={index}
            onClick={() => {
              setPage(p);
            }}
            className={p === page ? classes['active-page'] : ''}>
            {p}
          </button>
        ))}
        <button type="button" onClick={() => setPage(lastPage)}>
          <KeyboardDoubleArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

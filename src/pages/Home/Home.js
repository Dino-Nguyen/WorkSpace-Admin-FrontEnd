import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Statistics from '../../components/Statistics/Statistics';
import WorkspaceList from '../../components/WorkspaceList/WorkspaceList';
import UserList from '../../components/UserList/UserList';
import classes from './Home.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import Sidebar from '../../components/SideBar/SideBar';
import clsx from 'clsx';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SearchIcon from '@mui/icons-material/Search';

export default function Home({ sideBarVisibility, toggleSideBar }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [workspacesListVisibility, setWorkspacesListVisibility] =
    useState(true);
  const [usersListVisibility, setUsersListVisibility] = useState(false);
  const [searchBarVisibility, setSearchBarVisibility] = useState(false);
  const [workspaceTitle, setWorkspaceTitle] = useState('');
  const [username, setUsername] = useState('');
  const searchBarRef = useRef(null);

  const toggleWorkspacesList = () => {
    setWorkspacesListVisibility(true);
    setUsersListVisibility(false);
  };

  const toggleUsersList = () => {
    setWorkspacesListVisibility(false);
    setUsersListVisibility(true);
  };

  const workspaceTitleChangeHandler = (e) => {
    setWorkspaceTitle(e.target.value);
  };

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    if (searchBarVisibility) {
      searchBarRef.current.focus();
    }
  }, [searchBarVisibility]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  const homeClassName = clsx(classes['home'], {
    [classes['show-side-bar']]: sideBarVisibility,
  });

  return (
    <React.Fragment>
      <NavBar
        sideBarVisibility={sideBarVisibility}
        toggleSideBar={toggleSideBar}
      />
      <Sidebar
        sideBarVisibility={sideBarVisibility}
        toggleSideBar={toggleSideBar}
      />
      <section className={homeClassName}>
        <div className={classes['statistics']}>
          <Statistics />
        </div>
        <div className={classes['list--container']}>
          <div className={classes['list']}>
            <div className={classes['list--header']}>
              {workspacesListVisibility && <h2>Workspace List</h2>}
              {usersListVisibility && <h2>User List</h2>}
              <div className={classes['btn-group']}>
                {!searchBarVisibility && (
                  <button onMouseOver={() => setSearchBarVisibility(true)}>
                    <SearchIcon />
                  </button>
                )}
                {searchBarVisibility && workspacesListVisibility && (
                  <span className={classes['input-group']}>
                    <label htmlFor=""></label>
                    <input
                      type="text"
                      placeholder="Enter workspace ..."
                      ref={searchBarRef}
                      onBlur={() => {
                        setSearchBarVisibility(false);
                      }}
                      value={workspaceTitle}
                      onChange={workspaceTitleChangeHandler}
                    />
                  </span>
                )}
                {searchBarVisibility && usersListVisibility && (
                  <span className={classes['input-group']}>
                    <label htmlFor=""></label>
                    <input
                      type="text"
                      placeholder="Enter username ..."
                      ref={searchBarRef}
                      onBlur={() => {
                        setSearchBarVisibility(false);
                      }}
                      value={username}
                      onChange={usernameChangeHandler}
                    />
                  </span>
                )}
                <button
                  type="button"
                  onClick={toggleWorkspacesList}
                  className={workspacesListVisibility ? classes['active'] : ''}>
                  <AssignmentIcon />
                </button>
                <button
                  type="button"
                  onClick={toggleUsersList}
                  className={usersListVisibility ? classes['active'] : ''}>
                  <AssignmentIndIcon />
                </button>
              </div>
            </div>
            <WorkspaceList
              workspacesListVisibility={workspacesListVisibility}
              workspaceTitle={workspaceTitle}
            />
            <UserList
              usersListVisibility={usersListVisibility}
              username={username}
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

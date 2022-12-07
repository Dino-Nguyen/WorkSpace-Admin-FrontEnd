import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import classes from './BoardDetail.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import compareArray from '../../utils/compare-array';
import api from '../../store/actions/api';

export default function BoardDetail({
  boardDetail,
  closeBoardDetail,
  setWorkspaces,
}) {
  const [title, setTitle] = useState(boardDetail.title);
  const [members, setMembers] = useState(boardDetail.members);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const removeMemberHandler = (memberId) => {
    setMembers((prev) => {
      const prevMembers = [...prev].filter((member) => member._id !== memberId);
      return prevMembers;
    });
  };

  const updateBoardHandler = (e) => {
    e.preventDefault();
    if (
      title === boardDetail.title &&
      compareArray(members, boardDetail.members)
    ) {
      return;
    }
    setWorkspaces((prev) => {
      const cloneWorkspaces = [...prev];
      const index = cloneWorkspaces.findIndex(
        (workspace) => workspace._id === boardDetail._id,
      );
      cloneWorkspaces[index].title = title;
      cloneWorkspaces[index].members = members;
      return cloneWorkspaces;
    });
    closeBoardDetail();
    const payload = { title, members: members.map((member) => member._id) };
    api.updateBoard(boardDetail._id, payload).then((data) => {
      console.log(data.message);
    });
  };

  return (
    <React.Fragment>
      <div className={classes['backdrop']} onClick={closeBoardDetail}></div>
      <form className={classes['form']} onSubmit={updateBoardHandler}>
        <div className={classes['form--header']}>
          <h3>Edit Workspace</h3>
          <button type="button" onClick={closeBoardDetail}>
            <CloseIcon />
          </button>
        </div>
        <div className={classes['form--body']}>
          <div className={classes['input-group']}>
            <label htmlFor="workspace-title">Title: </label>
            <input
              type="text"
              id="workspace-title"
              value={title}
              onChange={titleChangeHandler}
              autoFocus
            />
          </div>
          <div className={classes['owner']}>
            <p>Owner: </p>
            {!boardDetail.owner[0].avatar ? (
              <Avatar
                sx={{
                  width: '40px',
                  height: '40px',
                  margin: '0 8px',
                  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
                }}>
                {boardDetail.owner[0].username[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                sx={{
                  width: '40px',
                  height: '40px',
                  margin: '0 8px',
                  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
                }}
                alt="owner-avatar"
                src={boardDetail.owner[0].avatar}
              />
            )}
            <span>{boardDetail.owner[0].username}</span>
          </div>
          {members && members.length !== 0 && (
            <div className={classes['members']}>
              <p>Members: </p>
              <div className={classes['members--container']}>
                {members.map((member) => {
                  return (
                    <div key={member._id} className={classes['member']}>
                      {!member.avatar ? (
                        <Avatar>{member.username[0].toUpperCase()}</Avatar>
                      ) : (
                        <Avatar alt="user-avatar" src={member.avatar} />
                      )}
                      <span>{member.username}</span>
                      <button
                        className={classes['clear-btn']}
                        type="button"
                        onClick={() => {
                          removeMemberHandler(member._id);
                        }}>
                        <CancelRoundedIcon />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className={classes['form--footer']}>
          <button type="button" onClick={closeBoardDetail}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </React.Fragment>
  );
}

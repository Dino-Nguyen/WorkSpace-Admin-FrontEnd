import React, { useEffect, useState } from 'react';
import classes from './WorkspaceList.module.scss';
import api from '../../store/actions/api';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar } from '@mui/material';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import BoardDetail from '../BoardDetail/BoardDetail';
import HTMLReactParser from 'html-react-parser';

export default function WorkspaceList({ workspacesListVisibility }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [deleteBoardId, setDeleteBoardId] = useState(null);
  const [deleteBoardTitle, setDeleteBoardTitle] = useState(null);
  const [boardDetailVisibility, setBoardDetailVisibility] = useState(false);
  const [boardDetail, setBoardDetail] = useState({});

  useEffect(() => {
    api.fetchWorkspaces().then((data) => {
      const { message, workspaces } = data;
      console.log(message);
      setWorkspaces(workspaces);
    });
  }, []);

  const showModalHandler = (id, workspaceTitle) => {
    setModalVisibility(true);
    setDeleteBoardId(id);
    setDeleteBoardTitle(workspaceTitle);
  };

  const closeModalHandler = () => {
    setModalVisibility(false);
    setDeleteBoardId(null);
    setDeleteBoardTitle(null);
  };

  const deleteBoardHandler = () => {
    setWorkspaces((prev) => {
      const cloneWorkspaces = [...prev];
      const index = cloneWorkspaces.findIndex(
        (workspace) => workspace._id === deleteBoardId,
      );
      cloneWorkspaces[index]._destroy = true;
      return cloneWorkspaces;
    });
    closeModalHandler();
    api.deleteBoard(deleteBoardId).then((data) => {
      console.log(data.message);
    });
  };

  const showBoardDetail = (id) => {
    setBoardDetailVisibility(true);
    setBoardDetail(workspaces.find((workspace) => workspace._id === id));
  };

  const closeBoardDetail = () => {
    setBoardDetailVisibility(false);
    setBoardDetail({});
  };

  return (
    <React.Fragment>
      <div
        className={classes['workspace-list']}
        style={
          workspacesListVisibility ? { display: 'block' } : { display: 'none' }
        }>
        <table className={classes['table']}>
          <thead>
            <tr>
              <th>Workspace</th>
              <th>Owner</th>
              <th>Members</th>
              <th>Status</th>
              <th>Created at</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {workspaces &&
              workspaces.map((workspace) => (
                <tr key={workspace._id}>
                  <td>
                    <div
                      className={classes['background']}
                      style={
                        workspace.background
                          ? {
                              background: `url(${workspace.background}) center/cover no-repeat`,
                            }
                          : '#ffffff'
                      }></div>
                    <span>{workspace.title}</span>
                  </td>
                  <td>
                    <div>
                      <span>
                        {!workspace.owner[0].avatar ? (
                          <Avatar
                            sx={{
                              width: '50px',
                              height: '50px',
                              marginRight: '8px',
                              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
                            }}>
                            {workspace.owner[0].username[0].toUpperCase()}
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
                            src={workspace.owner[0].avatar}
                          />
                        )}
                      </span>
                      <span>{workspace.owner[0].username}</span>
                    </div>
                  </td>
                  <td>{workspace.members.length + 1}</td>
                  <td>{workspace._destroy ? 'Deleted' : 'Active'}</td>
                  <td>{new Date(workspace.createdAt).toDateString()}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        showModalHandler(workspace._id, workspace.title);
                      }}>
                      <DeleteIcon />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        showBoardDetail(workspace._id);
                      }}>
                      <VisibilityIcon />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {modalVisibility && (
        <ConfirmModal
          closeModalHandler={closeModalHandler}
          title="Delete Workspace"
          content={HTMLReactParser(
            `Are you sure want to delete <strong>${deleteBoardTitle}</strong> ? </br> (All related lists & cards will also be deleted)`,
          )}
          onAction={deleteBoardHandler}
        />
      )}
      {boardDetailVisibility && (
        <BoardDetail
          boardDetail={boardDetail}
          closeBoardDetail={closeBoardDetail}
          setWorkspaces={setWorkspaces}
        />
      )}
    </React.Fragment>
  );
}

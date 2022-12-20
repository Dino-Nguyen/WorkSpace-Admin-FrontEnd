import React, { useEffect, useState } from 'react';
import classes from './WorkspaceList.module.scss';
import api from '../../store/actions/api';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar } from '@mui/material';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import BoardDetail from '../BoardDetail/BoardDetail';
import HTMLReactParser from 'html-react-parser';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function WorkspaceList({
  workspacesListVisibility,
  workspaceTitle,
}) {
  const [workspaces, setWorkspaces] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [deleteBoardId, setDeleteBoardId] = useState(null);
  const [deleteBoardTitle, setDeleteBoardTitle] = useState(null);
  const [boardDetailVisibility, setBoardDetailVisibility] = useState(false);
  const [boardDetail, setBoardDetail] = useState({});
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [totalPages, setTotalPages] = useState([]);
  const [sortField, setSortField] = useState('title');
  const [ascendingOrder, setAscendingOrder] = useState(true);

  useEffect(() => {
    api.fetchWorkspaces(page, sortField, ascendingOrder).then((data) => {
      const { workspaces, totalPages } = data;
      setWorkspaces(workspaces);
      setLastPage(totalPages);
      setTotalPages(() => {
        const pagesArray = [...Array(totalPages).keys()].map((p) => p + 1);
        return pagesArray.filter((p) => p < page + 2 && p >= page - 1);
      });
    });
  }, [page, sortField, ascendingOrder]);

  useEffect(() => {
    let timer = setTimeout(async () => {
      if (workspaceTitle.length > 0) {
        const payload = { workspaceTitle };
        await api.searchBoard(payload).then((data) => {
          setWorkspaces(data.searchedBoards);
        });
      } else {
        api.fetchWorkspaces(1, 'title', true).then((data) => {
          const { workspaces, totalPages } = data;
          setWorkspaces(workspaces);
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
  }, [workspaceTitle]);

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
              <th
                onClick={() => {
                  setSortField('title');
                  setAscendingOrder(!ascendingOrder);
                }}>
                Workspace
                {ascendingOrder && sortField === 'title' && (
                  <span>
                    <ArrowDropUpIcon />
                  </span>
                )}
                {!ascendingOrder && sortField === 'title' && (
                  <span>
                    <ArrowDropDownIcon />
                  </span>
                )}
              </th>
              <th
                onClick={() => {
                  setSortField('ownerUsername');
                  setAscendingOrder(!ascendingOrder);
                }}>
                Owner
                {ascendingOrder && sortField === 'ownerUsername' && (
                  <span>
                    <ArrowDropUpIcon />
                  </span>
                )}
                {!ascendingOrder && sortField === 'ownerUsername' && (
                  <span>
                    <ArrowDropDownIcon />
                  </span>
                )}
              </th>
              <th
                onClick={() => {
                  setSortField('members');
                  setAscendingOrder(!ascendingOrder);
                }}>
                Members
                {ascendingOrder && sortField === 'members' && (
                  <span>
                    <ArrowDropUpIcon />
                  </span>
                )}
                {!ascendingOrder && sortField === 'members' && (
                  <span>
                    <ArrowDropDownIcon />
                  </span>
                )}
              </th>
              <th
                onClick={() => {
                  setSortField('_destroy');
                  setAscendingOrder(!ascendingOrder);
                }}>
                Status
                {ascendingOrder && sortField === '_destroy' && (
                  <span>
                    <ArrowDropUpIcon />
                  </span>
                )}
                {!ascendingOrder && sortField === '_destroy' && (
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
        {workspaces && workspaces.length === 0 && (
          <h2 className={classes['no-record']}>No document found.</h2>
        )}
        <div className={classes['workspace-list--pagination']}>
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

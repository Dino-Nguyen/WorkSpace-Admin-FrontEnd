import React from 'react';
import classes from './ConfirmModal.module.scss';
import CloseIcon from '@mui/icons-material/Close';

export default function ConfirmModal({
  closeModalHandler,
  title,
  content,
  onAction,
}) {
  return (
    <React.Fragment>
      <div className={classes['backdrop']} onClick={closeModalHandler}></div>
      <div className={classes['modal']}>
        <div className={classes['modal--header']}>
          <h3>{title}</h3>
          <button type="button" onClick={closeModalHandler}>
            <CloseIcon />
          </button>
        </div>
        <div className={classes['modal--body']}>
          <p>{content}</p>
        </div>
        <div className={classes['modal--footer']}>
          <button type="button" onClick={closeModalHandler}>
            Cancel
          </button>
          <button type="button" onClick={onAction}>
            OK
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

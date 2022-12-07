import { useState } from 'react';
import classes from './SignUp.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faGithub,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { signUp } from '../../store/actions/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignUp() {
  const initialInputState = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    fullName: '',
  };

  const [input, setInput] = useState(initialInputState);
  const [checkbox, setCheckbox] = useState(false);
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const checkboxChangeHandler = (e) => {
    setCheckbox(e.target.checked);
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    const payload = { ...input };
    signUp(payload, navigate, toast);
  };

  return (
    <div className={classes.container}>
      <div className={classes['background-container']}>
        <div className={classes['background']}></div>
      </div>
      <div className={classes['form-container']}>
        <form onSubmit={signUpHandler} className={classes.form}>
          <h1 className={classes['form--title']}>Sign Up</h1>
          <div className={classes['form--brands']}>
            <button type="button">
              <FontAwesomeIcon icon={faFacebook} size="xl" />
            </button>
            <button type="button">
              <FontAwesomeIcon icon={faGithub} size="xl" />
            </button>
            <button type="button">
              <FontAwesomeIcon icon={faGoogle} size="xl" />
            </button>
          </div>
          <div className={classes['form--group']}>
            <label htmlFor="username"></label>
            <input
              type="text"
              id="username"
              value={input.username}
              name="username"
              autoFocus
              placeholder="Enter your username"
              onChange={inputChangeHandler}
            />
          </div>
          <div className={classes['form--group']}>
            <label htmlFor="email"></label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={inputChangeHandler}
            />
          </div>
          <div className={classes['form--group']}>
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={input.password}
              onChange={inputChangeHandler}
            />
          </div>
          <div className={classes['form--group']}>
            <label htmlFor="repeatPassword"></label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Re-enter your password"
              value={input.repeatPassword}
              onChange={inputChangeHandler}
            />
          </div>
          <div className={classes['form--group']}>
            <label htmlFor="password"></label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={input.fullName}
              onChange={inputChangeHandler}
            />
          </div>
          <div className={classes['form--group']}>
            <input
              type="checkbox"
              id="term-of-use"
              className={classes['form--checkbox']}
              value={checkbox}
              onChange={checkboxChangeHandler}
            />
            <label htmlFor="term-of-use">
              I have read and agree to the terms of service.
            </label>
          </div>
          <button
            type="submit"
            className={classes['form--btn']}
            disabled={!checkbox}>
            Sign Up
          </button>
          <p>
            Already have account?
            <button
              type="button"
              className={classes['form--link']}
              onClick={() => {
                navigate('/sign-in');
              }}>
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

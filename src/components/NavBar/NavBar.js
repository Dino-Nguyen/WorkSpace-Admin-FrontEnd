import classes from './NavBar.module.scss';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import clsx from 'clsx';
import { signOut } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ sideBarVisibility, toggleSideBar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOutHandler = () => {
    dispatch(signOut(navigate));
  };

  const navClassName = clsx(classes['nav'], {
    [classes['show-side-bar']]: sideBarVisibility,
  });

  return (
    <div className={navClassName}>
      <div className={classes['nav--menu']}>
        {sideBarVisibility ? (
          <button type="button" onClick={toggleSideBar}>
            <MenuOpenIcon />
          </button>
        ) : (
          <button type="button" onClick={toggleSideBar}>
            <MenuIcon />
          </button>
        )}
      </div>
      <div className={classes['nav--feature']}>
        <div className={classes['nav--search']}>
          <label htmlFor="search"></label>
          <input type="text" placeholder="Search here" id="search" />
        </div>
        <NotificationsIcon />
        <SettingsIcon />
        <PowerSettingsNewIcon onClick={signOutHandler} />
      </div>
    </div>
  );
}

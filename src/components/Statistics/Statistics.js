import classes from './Statistics.module.scss';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TodayIcon from '@mui/icons-material/Today';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CustomBarChart from '../BarChart/BarChart';
import CustomLineChart from '../LineChart/LineChart';
import { useEffect, useState } from 'react';
import api from '../../store/actions/api';

export default function Statistics() {
  const date = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
  });
  const [statistic, setStatistic] = useState({
    totalFinishTasks: 0,
    totalTasks: 0,
    totalTodayTasks: 0,
    totalUsers: 0,
  });
  const [analytic, setAnalytic] = useState({
    weeklyCreatedTasks: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
    weeklyFinishedTasks: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
    weeklyNewUsers: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
  });

  useEffect(() => {
    api.fetchStatistic().then((data) => {
      setStatistic(data.statistic);
    });
    api.fetchAnalytic().then((data) => {
      setAnalytic(data.analytic);
    });
  }, []);

  return (
    <>
      <div className={classes['stats']}>
        <div className={classes['stats--item']}>
          <div
            className={classes['stats--emblem']}
            style={{
              background: 'linear-gradient(180deg, #3E3D45 0%, #202020 100%)',
            }}>
            <AssignmentIcon />
          </div>
          <div className={classes['stats--body']}>
            <h3>Total tasks</h3>
            <h1>{statistic.totalTasks}</h1>
          </div>
          <div className={classes['stats--footer']}>
            <p>
              <span>+55%</span> than last week
            </p>
          </div>
        </div>
        <div className={classes['stats--item']}>
          <div
            className={classes['stats--emblem']}
            style={{
              background: 'linear-gradient(180deg, #E93B77 0%, #DA1F63 100%)',
            }}>
            <AccountCircleIcon />
          </div>
          <div className={classes['stats--body']}>
            <h3>Total users</h3>
            <h1>{statistic.totalUsers}</h1>
          </div>
          <div className={classes['stats--footer']}>
            <p>
              <span>+3%</span> than last week
            </p>
          </div>
        </div>
        <div className={classes['stats--item']}>
          <div
            className={classes['stats--emblem']}
            style={{
              background: 'linear-gradient(180deg, #63B967 0%, #4BA64F 100%)',
            }}>
            <AssignmentTurnedInIcon />
          </div>
          <div className={classes['stats--body']}>
            <h3>Finish tasks</h3>
            <h1>{statistic.totalFinishTasks}</h1>
          </div>
          <div className={classes['stats--footer']}>
            <p>
              <span>+3%</span> than last week
            </p>
          </div>
        </div>
        <div className={classes['stats--item']}>
          <div
            className={classes['stats--emblem']}
            style={{
              background: 'linear-gradient(180deg, #439DEE 0%, #1E78E9 100%)',
            }}>
            <TodayIcon />
          </div>
          <div className={classes['stats--body']}>
            <h3>Today tasks</h3>
            <h1>{statistic.totalTodayTasks}</h1>
          </div>
          <div className={classes['stats--footer']}>
            <p>
              <span>+3%</span> than last week
            </p>
          </div>
        </div>
      </div>
      <div className={classes['analytics']}>
        <div className={classes['analytics--item']}>
          <div
            className={classes['analytics--chart']}
            style={{
              background: 'linear-gradient(180deg, #E93B77 0%, #DA1F63 100%)',
            }}>
            <CustomBarChart data={analytic.weeklyNewUsers} />
          </div>
          <div className={classes['analytics--content']}>
            <h4>Incoming users in week</h4>
          </div>
          <div className={classes['analytics--update']}>
            <AccessTimeIcon />
            <p>last update from {date}</p>
          </div>
        </div>
        <div className={classes['analytics--item']}>
          <div
            className={classes['analytics--chart']}
            style={{
              background: 'linear-gradient(180deg, #63B967 0%, #4BA64F 100%)',
            }}>
            <CustomLineChart data={analytic.weeklyFinishedTasks} />
          </div>
          <div className={classes['analytics--content']}>
            <h4>Finish tasks in week</h4>
          </div>
          <div className={classes['analytics--update']}>
            <AccessTimeIcon />
            <p>last update from {date}</p>
          </div>
        </div>
        <div className={classes['analytics--item']}>
          <div
            className={classes['analytics--chart']}
            style={{
              background: 'linear-gradient(180deg, #3E3D45 0%, #202020 100%)',
            }}>
            <CustomLineChart data={analytic.weeklyCreatedTasks} />
          </div>
          <div className={classes['analytics--content']}>
            <h4>Created tasks in week</h4>
          </div>
          <div className={classes['analytics--update']}>
            <AccessTimeIcon />
            <p>last update from {date}</p>
          </div>
        </div>
      </div>
    </>
  );
}

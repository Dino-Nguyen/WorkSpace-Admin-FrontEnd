import classes from './App.module.scss';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import RequireAuth from './utils/RequireAuth';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

export default function App() {
  const [sideBarVisibility, setSideBarVisibility] = useState(true);
  const toggleSideBar = () => {
    setSideBarVisibility(!sideBarVisibility);
  };

  return (
    <main className={classes['app']}>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" />} />
        {/* public routes */}
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route
            path="/home"
            element={
              <Home
                sideBarVisibility={sideBarVisibility}
                toggleSideBar={toggleSideBar}
              />
            }
          />
        </Route>
        {/* catch other routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

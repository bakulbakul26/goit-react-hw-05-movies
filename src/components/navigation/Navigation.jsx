import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={css.container}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <NavLink
            exact
            to="/"
            className={css.navLink}
            activeclassname={css['active-link']}
          >
            Home
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink
            to="/movies"
            className={css.navLink}
            activeclassname={css['active-link']}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

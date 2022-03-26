/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useState } from 'react';
import Link from './Link';

const Menu = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const reloadPage = (link) => {
    if (link === '/') {
      window.location = '/';
    }
  };

  const renderedMenuItems = items.map((item, index) => {
    const active = activeIndex === index ? 'm-menu__item--active' : '';
    return (
      <li
        key={index}
        className={`m-menu__item ${active}`}
        aria-haspopup="false"
        onClick={() => {
          setActiveIndex(index);
          reloadPage(item.link);
        }}
      >
        <Link href={item.link} label={item.name} icon={item.icon} />
      </li>
    );
  });

  return (
    <div
      id="m_aside_left"
      className="m-grid__item	m-aside-left  m-aside-left--skin-dark "
    >
      <div
        id="m_ver_menu"
        className="m-aside-menu  m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark "
        data-menu-vertical="true"
        data-menu-scrollable="false"
        data-menu-dropdown-timeout="500"
      >
        <div
          id="m_header_menu"
          className="m-header-menu m-aside-header-menu-mobile m-aside-header-menu-mobile--offcanvas  m-header-menu--skin-dark m-header-menu--submenu-skin-light m-aside-header-menu-mobile--skin-light m-aside-header-menu-mobile--submenu-skin-light"
        >
          <ul className="m-menu__nav  m-menu__nav--dropdown-submenu-arrow ">
            {renderedMenuItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;

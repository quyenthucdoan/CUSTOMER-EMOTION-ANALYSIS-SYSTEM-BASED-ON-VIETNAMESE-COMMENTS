import React from 'react';

const Link = ({ href, label, icon }) => {
  const onMenuClick = (e) => {
    e.preventDefault();
    // change the location.pathname to 'href'
    window.history.pushState({}, '', href);
    // notify the navigation event of that changing to every Routes.
    const navEvent = new PopStateEvent('popState');
    window.dispatchEvent(navEvent);
  };
  return (
    <a href={href} className="m-menu__link" onClick={onMenuClick}>
      <span className="m-menu__item-here" />
      <i className={icon} />
      <span className="m-menu__link-text">{label}</span>
    </a>
  );
};

export default Link;

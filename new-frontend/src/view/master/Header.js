import React from 'react';
import Brand from './Brand';

const Header = () => (
  <header
    className="m-grid__item    m-header "
    data-minimize-offset="200"
    data-minimize-mobile-offset="200"
  >
    <div className="m-container m-container--fluid m-container--full-height">
      <div className="m-stack m-stack--ver m-stack--desktop">
        <div className="m-stack__item m-brand  m-brand--skin-dark ">
          <Brand />
        </div>
      </div>
    </div>
  </header>
);

export default Header;

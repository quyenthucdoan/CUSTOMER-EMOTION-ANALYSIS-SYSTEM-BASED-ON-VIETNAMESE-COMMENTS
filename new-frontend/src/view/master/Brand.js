import React from 'react';

const Brand = () => (
  <div className="m-stack m-stack--ver m-stack--general">
    <div className="m-stack__item m-stack__item--middle m-brand__logo">
      <a href="#0" className="m-brand__logo-wrapper">
        <h2 style={{ fontWeight: 'bolder', color: 'white', width: '600px' }}>
          Customer Comment Analysis
        </h2>
      </a>
    </div>
    <div className="m-stack__item m-stack__item--middle m-brand__tools">
      <a
        href="#0"
        id="m_aside_left_minimize_toggle"
        className="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-desktop-inline-block"
      />
      <a
        href="#0"
        id="m_aside_left_offcanvas_toggle"
        className="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-tablet-and-mobile-inline-block"
      />
      <a
        href="#0"
        id="m_aside_header_menu_mobile_toggle"
        className="m-brand__icon m-brand__toggler m--visible-tablet-and-mobile-inline-block"
      />
    </div>
  </div>
);

export default Brand;

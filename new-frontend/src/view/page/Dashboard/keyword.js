/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

const Topic = () => {
  const fetchData = () => {};
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-portlet  m-portlet--full-height ">
      <div className="m-portlet__head">
        <div className="m-portlet__head-caption">
          <div className="m-portlet__head-title">
            <h3 className="m-portlet__head-text">Topic</h3>
          </div>
        </div>
      </div>
      <div className="m-portlet__body" style={{ height: '300px' }}>
        Topic modeling
      </div>
    </div>
  );
};

export default Topic;

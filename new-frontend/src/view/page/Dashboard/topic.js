/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import loadScript from 'load-script';
import React, { useEffect, useState } from 'react';

const TopicModeling = () => {
  const fetchData = () => {};
  useEffect(() => {
    fetchData();
    // Export the data first
    window.topicData = '/d3js/Topic/data.json';
    // then run the default visualisation
    const script = document.createElement('script');
    script.src = '/d3js/Topic/topic.js';
    script.type = 'module';
    document.body.appendChild(script);
  }, []);

  return (
    <div className="m-portlet  m-portlet--full-height ">
      <div className="m-portlet__head">
        <div className="m-portlet__head-caption">
          <div className="m-portlet__head-title">
            <h3 className="m-portlet__head-text">Topic Modeling</h3>
          </div>
        </div>
      </div>
      <div className="m-portlet__body" style={{ height: '920px' }}>
        <div id="topicModelingDiv" />
      </div>
    </div>
  );
};

export default TopicModeling;

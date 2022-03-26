/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import EmotionPie from './emotion_pie';
import EmotionList from './emotion_list';

const EmotionStatistic = () => {
  const fetchData = () => {};
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-portlet  m-portlet--full-height ">
      <div className="m-portlet__head">
        <div className="m-portlet__head-caption">
          <div className="m-portlet__head-title">
            <h3 className="m-portlet__head-text">Emotion by Categories</h3>
          </div>
        </div>
      </div>
      <div className="m-portlet__body">
        <div className="m-widget16">
          <div className="row">
            <div className="col-md-7">
              <EmotionPie />
            </div>
            <div className="col-md-5">
              <EmotionList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionStatistic;

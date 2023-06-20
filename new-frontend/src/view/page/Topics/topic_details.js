/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import WordCloudControl from './wordcloud_control';
import TopicServices from './../../../services/TopicServices/index';

const TopicDetails = () => {
  const [selected, setSelected] = useState(1);
  const [sentiment, setSentiment] = useState(2);
  // const [firstLoading, setFirstLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const fetchData = () => {
    // const data = localStorage.getItem('currentData') ? localStorage.getItem('currentData') : 'pos_tweets';
    // window.topicData = `/d3js/Topic/${data}.json`;
    window.location.reload();
  };

  const onRadioClick = (e) => {
    // localStorage.setItem('sentiment', sentimentCurr);
    localStorage.setItem('currentData', e.target.value);
    localStorage.setItem('currentRadioId', e.target.name);
    setSelected(parseInt(e.target.name, 10));
    // console.log(selected);
  };

  useEffect(() => {
    const data = localStorage.getItem('currentData')
      ? localStorage.getItem('currentData')
      : 'data';
    if (localStorage.getItem('currentRadioId')) {
      setSelected(parseInt(localStorage.getItem('currentRadioId'), 10));
      // console.log(selected);
    }
    window.topicData = `/d3js/Topic/${data}.json`;
    // console.log(window.topicData);
    const script = document.createElement('script');
    script.src = '/d3js/Topic/topicDetails.js';
    script.type = 'module';
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    TopicServices.getTerms(10).then((res) => {
      res = res.results;
      const topic = [];

      for (let j = 0; j < res.length; j++) {
        const wordList = [];
        for (let i = 0; i < res[j].length; i += 1) {
          const word = {
            text: res[j][i].keyword,
            value: res[j][i].pseudo_freq,
            sentiment: res[j][i].sentiment,
          };

          wordList.push(word);
        }
        topic.push(wordList);
      }
      console.log(topic)
      setTopics(topic);
     
    });
  }, []);
  useEffect(() => {
   
    topics.forEach(item => console.log(item))

  }, [])
  return (
    <div className="m-portlet  m-portlet--full-height ">
      <div className="m-portlet__head">
        <div className="m-portlet__head-caption">
          <div className="m-portlet__head-title">
            <h3 className="m-portlet__head-text">Topic Modeling</h3>
          </div>
        </div>
      </div>
      <div className="m-portlet__body" style={{ height: '850px' }}>
        <div className="row m-row--no-padding">
          <div className="col-sm-12">
            <div className="m-form__group form-group row">
              <label className="col-2 col-form-label">
                <h4>Choose data:</h4>
              </label>
              <div className="col-8">
                <div className="m-radio-inline">
                  <label className="m-radio">
                    <input
                      type="radio"
                      name="1"
                      value="pos"
                      onChange={onRadioClick}
                      checked={selected === 1}
                    />
                    Positive
                    <span />
                  </label>
                  <label className="m-radio">
                    <input
                      type="radio"
                      name="2"
                      value="neu"
                      onChange={onRadioClick}
                      checked={selected === 2}
                    />
                    Neutral
                    <span />
                  </label>
                  <label className="m-radio">
                    <input
                      type="radio"
                      name="3"
                      value="neg"
                      onChange={onRadioClick}
                      checked={selected === 3}
                    />
                    Negative
                    <span />
                  </label>
                  <label className="m-radio">
                    <input
                      type="radio"
                      name="7"
                      value="data"
                      onChange={onRadioClick}
                      checked={selected === 7}
                    />
                    All
                    <span />
                  </label>
                </div>
              </div>
              <div className="col-1">
                <button
                  onClick={fetchData}
                  id="upRelatedGraph"
                  className="btn btn-primary"
                >
                  <span>
                    <i className="fa flaticon-search" />
                    <span>&nbsp; Load Topics</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-row--no-padding" style={{ paddingTop: '10px' }}>
          <div id="topicDetailsDiv" />
        </div>
      </div>
      <div className="m-portlet__head">
        <div className="m-portlet__head-caption">
          <div className="m-portlet__head-title">
            <h3 className="m-portlet__head-text">Topic Wordcloud</h3>
          </div>
        </div>
      </div>
      <div className="m-portlet__body">
        <div className="row">
          {topics.map((word, index) => ( 
            <div style={{ width: '400px', heigh: '400px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid ' + (word[0]["sentiment"] == -1 ? "#fc2d08" : word[0]["sentiment"] == 1 ? "#7CFC00" : "#000") ,
                  padding: '10px',
                  margin: '5px',
                }}
              >
                <h5>Topic {index + 1} </h5>
                <WordCloudControl word={word} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicDetails;

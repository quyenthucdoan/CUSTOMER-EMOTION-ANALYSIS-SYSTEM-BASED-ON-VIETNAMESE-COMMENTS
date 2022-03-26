import React from 'react';
import WordCloudControl from './wordcloud_control';

const WordCloud = (props) => (
  <div className="m-portlet  m-portlet--full-height ">
    <div className="m-portlet__head">
      <div className="m-portlet__head-caption">
        <div className="m-portlet__head-title">
          <h3 className="m-portlet__head-text">Topic 1</h3>
        </div>
      </div>
    </div>
    <div className="m-portlet__body">
      <WordCloudControl word={props.word} />
    </div>
  </div>
);

export default WordCloud;

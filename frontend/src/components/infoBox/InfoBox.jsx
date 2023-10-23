import React from 'react';
import './InfoBox.scss';

function InfoBox({ bgColor, title, count, icon }) {
  return (
    <div className={`info-box ${bgColor}`}>
      <span className='info-icon --color-white'>{icon}</span>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width:"70%"
        }}
      >
        <h4>{title}</h4>
        <h3>{count}</h3>
      </div>
    </div>
  );
}

export default InfoBox;

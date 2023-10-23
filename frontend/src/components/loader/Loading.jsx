import React from 'react';
import './Loading.css';

function Loading() {
  return (
    <div
      className='lds-spinner'
      style={{
        margin: '0 auto',
      }}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loading;

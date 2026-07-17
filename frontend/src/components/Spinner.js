import React from 'react';

const Spinner = ({size = 24}) => (
  <div style={{display:'inline-block', width:size, height:size}} className="spinner" aria-hidden>
    <style>{`.spinner{border:3px solid rgba(0,0,0,0.1);border-top-color:#3498db;border-radius:50%;animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

export default Spinner;

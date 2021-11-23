import React from 'react';

import '../styles/spinner.scss';

const Spinner = () => (
  <div className="loader">
    <div className="inner one" />
    <div className="inner two" />
    <div className="inner three" />
  </div>
);

export default Spinner;
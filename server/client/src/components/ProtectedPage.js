import React from 'react';

import '../styles/protectedPage.scss';

const ProtectedPage = () => (
    <div className='protected-page-container'>
        <h1>Wohoo! You are at ProtectedPage.</h1>
        <h2>Only authorized users have access to this page.</h2>
    </div>
  );

export default ProtectedPage;
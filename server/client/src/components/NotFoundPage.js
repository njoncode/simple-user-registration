import React from 'react';
import { Link } from 'react-router-dom';

import PageNotFound from '../images/404.jpg';
import CustomButton from './CustomButton';

import '../styles/notFoundPage.scss'

const NotFoundPage = () => {
        return (
        <div className='not-found'>
            <img className='page-not-found' src={PageNotFound} alt='No page found' />
            <Link className='btn-page-not-found' to="/"><CustomButton className='link-go-home'>Go to Home</CustomButton></Link>
          </div>
        )
    }

export default NotFoundPage;
import React from 'react';
import Gravatar  from 'react-gravatar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import logo from '../images/website-logo.png'
import history from '../utils/history';
import { signOutStartAction } from '../redux/user/userActions';
import { selectCurrentUser } from '../redux/user/userSelectors';

import '../styles/header.scss';


const Header = ({ currentUser, signOutStartDispatch }) => {

  return (
    <div className='header-container'>
      <Link to='/'><img className='logo' src={logo} alt='logo'/></Link>
      {/* <div className='pages-routes'> */}
      <div className='header-right-content'>
        <Link to='/protected-route' className='lnk-headers'>Protected</Link>
        {/* <button className='lnk-btn' onClick={() => history.push('/protected-route')}>Protected</button> */}
        { !currentUser 
      ? 
        <Link to='/sign-in' className='lnk-headers'>Sign In</Link>
      : (
        // <div className='header-right-content'>
        <>
          <button className='lnk-headers btn-sign-out' onClick={signOutStartDispatch}>Sign Out</button>
          <Gravatar email={currentUser} size={40}/>
        </>
      )
      }
      </div>
      {/* </div> */}
    </div>
  );
};

const mapStatetoProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  signOutStartDispatch: () => dispatch(signOutStartAction()),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Header);




// return (
  //   <div className='header-container'>
  //     <Link to='/'><img className='logo' src={logo} alt='logo'/></Link>
  //     <div className='pages-routes'>
  //       <Link className='lnk-headers'>Protected</Link>
  //       {/* <button className='lnk-btn' onClick={() => history.push('/protected-route')}>Protected</button> */}
  //       { !currentUser 
  //     ? 
  //       <Link to='/sign-in' className='lnk-headers'>Sign In</Link>
  //     // <Link to='/sign-in'><button className='lnk-btn btn-sign-in'>Sign In</button></Link>
  //     : (
  //       <div className='header-right-content'>
  //         <Gravatar email={currentUser} size={40}/>
  //         <button className='lnk-headers btn-sign-out' onClick={signOutStartDispatch}>Sign Out</button>
  //         {/* <button className='lnk-btn btn-sign-out' onClick={signOutStartDispatch}>Sign Out</button> */}
  //       </div>
  //     )
  //     }
  //     </div>
  //   </div>
  // );
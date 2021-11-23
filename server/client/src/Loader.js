/**
 *
 * Loader
 *
 */

 import React from 'react';
 import PropTypes from 'prop-types';
 
 const styles = {
   content: {
     fontSize: '35px',
     position: 'absolute',
     left: '0',
     right: '0',
     marginTop: '20px',
     textAlign: 'center',
   },
 };
 
 const Loader = ({ text = 'Loading', speed = 300 }) => {
   const [loaderContent, setLoaderContent] = React.useState(text);
 
   React.useEffect(() => {
     const interval = window.setInterval(() => {
       setLoaderContent(content =>
         content === `${text}...` ? text : `${content}.`,
       );
     }, speed);
     return () => window.clearInterval(interval);
   }, [text, speed]);
 
   return <p style={styles}>{loaderContent}</p>;
 };
 
 Loader.propTypes = {
   text: PropTypes.string,
   speed: PropTypes.number,
 };
 
 export default Loader;
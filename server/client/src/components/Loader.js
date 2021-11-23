/**
 *
 * Loader
 *
 */

 import React from 'react';
 import PropTypes from 'prop-types';
 
 
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
 
   return <p>{loaderContent}</p>;
 };
 
 Loader.propTypes = {
   text: PropTypes.string,
   speed: PropTypes.number,
 };
 
 export default Loader;
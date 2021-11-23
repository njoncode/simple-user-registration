import React from 'react';
import PropTypes from 'prop-types';

import '../styles/formInput.scss';

const FormInput = ({ handleChange, label, ...otherProps}) => (
    <div className='group'>
       <input className='form-input' onChange={handleChange} {...otherProps}/>  
       {label ? (
            <label 
                className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
            {label}
            </label>
        ) : null}
    </div>
);


FormInput.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    signInFormState: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default FormInput;

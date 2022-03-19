import LinearProgress from '@materialr/linear-progress';
import PropTypes from 'prop-types';
import React from 'react';
import './loader.css';

const Loader = ({ progress=0 }) => {
    let colorLoad = ""
    if(progress > 0.90) colorLoad="green"
    else if(progress <= 0.90 && progress > 0.80) colorLoad="blue"
    else if(progress <= 0.80 && progress > 0.60) colorLoad="purple"
    else if(progress <= 0.60 && progress > 0.40 ) colorLoad="orange"
    else if(progress <= 0.40 ) colorLoad="red"
    else colorLoad="none"
    return (
    <div className={`load-${colorLoad}`}>
    <LinearProgress className="loader" progress={progress} />
    </div>
)};

Loader.propTypes = {
    progress: PropTypes.number,
};

export default Loader;
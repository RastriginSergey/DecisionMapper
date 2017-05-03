import React, {Component} from 'react';
import {connect} from 'react-redux';

const Spinner = (props) => {
    let isFetching = props.fetching;
    console.log(isFetching);

    return (
        <div className={`spinner ${isFetching ? '' : 'hidden'}`} />
    )
};

const mapStateToProps = (state, props) => {
    return {
        fetching: state.fetching
    }
};

export default connect(mapStateToProps)(Spinner);
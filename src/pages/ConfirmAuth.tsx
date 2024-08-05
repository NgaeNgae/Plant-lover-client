import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { authActionCreator } from '../stores/actionCreator';

const ConfirmAuth = () => {
    const dispath = useDispatch();
    let {Confirm} = bindActionCreators(authActionCreator, dispath)
    const {token} = useParams();
    useEffect(() => {
        if(token) Confirm(token);
    },[token]);
  return (
    <div>ConfirmAuth</div>
  )
}

export default ConfirmAuth
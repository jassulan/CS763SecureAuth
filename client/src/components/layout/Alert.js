
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initState } from '../../actions/alert';

const Alert = ({ alerts,initState }) =>{
  useEffect(()=>initState(),[])
  

  return(<div >{alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ))}</div>)
  }
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  initState:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps,{initState})(Alert);
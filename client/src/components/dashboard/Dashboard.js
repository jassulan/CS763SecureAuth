import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const Dashboard = ({
  auth: { user }
}) => {


  return (
    <Fragment>

      <h1 className="large text-primary">Welcome {user.username}</h1>

    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});
// { getCurrentProfile, deleteAccount } these are mapDispatchtoProps from actions
export default connect(mapStateToProps, { setAlert })(
  Dashboard
);

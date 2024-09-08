import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';

const RoleHoc = (Component, role) => {
  class Hoc extends React.Component {
    componentDidMount() {
      if (!this.props.data?.role || this.props.data?.role !== role) {
        this.props.history.replace('/');
      }
    }

    render() {
      return (
        <>
          {this.props.isFetching ? (
            <Spinner />
          ) : (
            <Component
              history={this.props.history}
              match={this.props.match}
            />
          )}
        </>
      );
    }
  }

  const mapStateToProps = (state) => state.userStore;

  return connect(mapStateToProps)(Hoc);
};

export default RoleHoc;

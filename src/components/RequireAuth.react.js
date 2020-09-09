import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

//HOC To block/restrict access to User component
export default (ComposedComponent) => {
   class RequireAuth extends React.Component {

     componentWillMount() {
         if (!this.props.token)
          this.props.history.push("/login");
      }

     render() {
         return (
            <ComposedComponent { ...this.props } />
         )
      }
  }

  const mapStateToProps = state => ({
    token: state.login.token
  })

  return connect(mapStateToProps, actions)(RequireAuth);

}
